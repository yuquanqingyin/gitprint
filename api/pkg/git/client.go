package git

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/google/go-github/v65/github"
	"github.com/plutov/gitprint/api/pkg/log"
)

type Client struct {
	client   *github.Client
	reposDir string
}

type GetContentsResult struct {
	Files int64
	Dirs  int64
}

func NewClient(accessToken string) *Client {
	return &Client{
		client:   github.NewClient(nil).WithAuthToken(accessToken),
		reposDir: os.Getenv("GITHUB_REPOS_DIR"),
	}
}

func (c *Client) GetUserOrgs() ([]*github.Organization, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Info("getting user orgs")

	orgs, _, err := c.client.Organizations.List(ctx, "", nil)
	if err != nil {
		log.WithError(err).Error("failed to get user orgs")
		return nil, err
	}

	return orgs, nil
}

func (c *Client) GetUserRepos() ([]*github.Repository, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Info("getting user repos")

	repos, _, err := c.client.Repositories.ListByAuthenticatedUser(ctx, nil)
	if err != nil {
		log.WithError(err).Error("failed to get user orgs")
		return nil, err
	}

	return repos, nil
}

func (c *Client) GetOrgRepos(org string) ([]*github.Repository, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Info("getting user repos")

	repos, _, err := c.client.Repositories.ListByOrg(ctx, org, nil)
	if err != nil {
		log.WithError(err).Error("failed to get user orgs")
		return nil, err
	}

	return repos, nil
}

func (c *Client) DownloadRepo(owner string, repo string, ref string) (*GetContentsResult, error) {
	logCtx := log.With("owner", owner, "repo", repo)

	// Get latest commit if ref is empty
	if ref == "" {
		var shaErr error
		ref, shaErr = c.GetLatestCommitSHA(owner, repo)
		if shaErr != nil {
			logCtx.WithError(shaErr).Error("failed to get latest commit")
			return nil, shaErr
		}
	}

	logCtx = logCtx.With("ref", ref)
	logCtx.Info("downloading repo")

	res, err := c.getContents(owner, repo, ref, "")
	if err != nil {
		logCtx.WithError(err).Error("failed to download repo")
		return nil, err
	}

	logCtx.Info("repo downloaded")
	return res, nil
}

func (c *Client) GetLatestCommitSHA(owner string, repo string) (string, error) {
	logCtx := log.With("owner", owner, "repo", repo)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	logCtx.Info("getting latest commit")

	opts := &github.CommitsListOptions{}
	opts.PerPage = 1
	commits, _, err := c.client.Repositories.ListCommits(ctx, owner, repo, opts)
	if err != nil {
		logCtx.WithError(err).Error("failed to get latest commit")
		return "", err
	}
	if len(commits) == 0 {
		logCtx.Error("no commits found")
		return "", fmt.Errorf("no commits found")
	}

	return *commits[0].SHA, nil
}
