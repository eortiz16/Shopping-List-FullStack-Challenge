package main

import (
	"log"

	"shoppinglist-backend/pkg/config"
	"shoppinglist-backend/pkg/setup"

	docs "shoppinglist-backend/docs"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Shopping List API
// @version 1.0
// @description This is the API server for the Shopping List FullStack Challenge. This API provides endpoints for managing a shopping list, including adding, editing, retrieving, and deleting items. It integrates with a PostgreSQL database to store and manage the shopping list items. The server is built using Go and the Gin framework, and it includes middleware for logging and recovery. This documentation provides all the necessary details for interacting with the API.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /shopping-list-api/v1

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	cfg := config.GetConfig()
	db := setup.SetupDatabase(cfg)
	defer db.Close()

	r := setup.SetupRouter(db)

	// Swagger setup
	docs.SwaggerInfo.BasePath = "/shopping-list-api/v1"
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	r.Run()
}
