package services

import "github.com/plutov/gitprint/api/pkg/git"

type Services struct {
	GithubAuth *git.Auth
}

func InitServices() (Services, error) {
	svc := Services{
		GithubAuth: git.NewAuth(),
	}

	return svc, nil
}
