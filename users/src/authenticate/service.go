package authenticate

import (
	"log"
	"os"
	"time"
	u "users/src/user"

	jwtgo "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

// Service provides user authentication operations
type Service interface {
	Authenticate(cred u.Credentials) (string, error)
}

// Repository provides access to the user storage
type Repository interface {
	FindOne(string) *u.User
}

type service struct {
	r Repository
}

// Authenticate authenticates a user and issues a JWT
func (s *service) Authenticate(cred u.Credentials) (string, error) {
	existUser := s.r.FindOne(cred.Email)
	if existUser == nil {
		return "", u.ErrNotFound
	}

	err2 := bcrypt.CompareHashAndPassword([]byte(existUser.Hash), []byte(cred.Password))
	if err2 != nil {
		log.Println(err2)

		return "", u.ErrInvalidPassword
	}

	jwt, err3 := generateJWT(existUser.ID)
	if err3 != nil {
		log.Println(err3)

		return "", err3
	}

	return jwt, nil
}

func generateJWT(id u.ID) (string, error) {
	jwt := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, jwtgo.MapClaims{
		"exp": time.Now().Add(time.Hour * 24).Unix(),
		"uid": id,
		"iss": "users",
	})
	secret := os.Getenv("USERS_JWT_SECRET")
	jwtString, err := jwt.SignedString([]byte(secret))
	if err != nil {
		log.Println(err)

		return "", err
	}

	return jwtString, nil
}

// NewService creates an authentication service with the necessary dependencies
func NewService(r Repository) Service {
	return &service{r}
}
