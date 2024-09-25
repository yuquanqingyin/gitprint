package git

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/google/go-github/v65/github"
)

const (
	// One megabyte
	MaxFileSize = 1024 * 1024
)

func (c *Client) getContents(owner string, repo string, ref string, path string) (*GetContentsResult, error) {
	res := &GetContentsResult{}

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()

	opts := &github.RepositoryContentGetOptions{}
	opts.Ref = ref
	_, directoryContent, _, err := c.client.Repositories.GetContents(ctx, owner, repo, path, opts)
	if err != nil {
		return nil, err
	}

	for _, item := range directoryContent {
		switch *item.Type {
		case "file":
			if !IsAllowedFile(*item.Name) {
				continue
			}

			localPath := filepath.Join(c.reposDir, owner, repo, ref, *item.Path)
			downloaded, err := c.downloadContents(owner, repo, ref, item, localPath)
			if err != nil {
				return nil, fmt.Errorf("failed to download file %s: %w", *item.Path, err)
			}
			if downloaded {
				res.Files++
			}
		case "dir":
			if !IsAllowedDir(*item.Name) {
				continue
			}

			dirRes, err := c.getContents(owner, repo, ref, *item.Path)
			if err != nil {
				return nil, fmt.Errorf("failed to download dir %s: %w", *item.Path, err)
			}

			res.Dirs++
			res.Files += dirRes.Files
			res.Dirs += dirRes.Dirs
		}
	}

	return res, nil
}

func (c *Client) downloadContents(owner string, repo string, ref string, metadata *github.RepositoryContent, localPath string) (bool, error) {
	// skip non-file items, empty files, big files
	if *metadata.Type != "file" || *metadata.Size > MaxFileSize || *metadata.Size == 0 {
		return false, nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()

	opts := &github.RepositoryContentGetOptions{}
	opts.Ref = ref
	item, _, _, err := c.client.Repositories.GetContents(ctx, owner, repo, *metadata.Path, opts)
	if err != nil {
		return false, fmt.Errorf("failed to download a file: %w", err)
	}

	mkdirErr := os.MkdirAll(filepath.Dir(localPath), 0755)
	if mkdirErr != nil {
		return false, fmt.Errorf("failed to create a local dir %s: %w", filepath.Dir(localPath), mkdirErr)
	}

	f, err := os.Create(localPath)
	if err != nil {
		return false, fmt.Errorf("failed to create a file: %w", err)
	}
	defer f.Close()

	content, _ := item.GetContent()
	if _, err := f.WriteString(content); err != nil {
		return false, fmt.Errorf("failed to write a file: %w", err)
	}

	return true, nil
}
