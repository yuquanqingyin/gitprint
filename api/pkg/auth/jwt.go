package auth

import (
	"errors"
	"fmt"
	"os"
	"time"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/plutov/gitprint/api/pkg/git"
)

type SessionClaims struct {
	User *git.User `json:"user"`
	jwt.StandardClaims
}

func FillJWT(user *git.User) (string, error) {
	claims := &SessionClaims{
		User: user,
	}
	claims.ExpiresAt = time.Now().Add(time.Hour * 24 * 30).Unix()

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return t, nil
}

func ReadJWTClaims(jwtToken string) (*SessionClaims, error) {
	token, err := jwt.ParseWithClaims(jwtToken, &SessionClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*SessionClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid claims")
}
