package services

import "github.com/plutov/gitprint/api/pkg/git"

type Services struct {
	GithubAuth          *git.Auth
	GenerateRateLimiter *git.TTLMap
}

func InitServices() (Services, error) {
	svc := Services{
		GithubAuth:          git.NewAuth(),
		GenerateRateLimiter: git.NewTTLMap(1000, 3600),
	}

	return svc, nil
}
