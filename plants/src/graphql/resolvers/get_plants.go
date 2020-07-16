package resolvers

import (
	"plants-go/src/repository"

	"github.com/graphql-go/graphql"
)

// GetPlants resolver
func GetPlants(p graphql.ResolveParams) (interface{}, error) {
	return repository.FindAll(), nil
}