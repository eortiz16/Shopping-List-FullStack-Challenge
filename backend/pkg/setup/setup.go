package setup

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"shoppinglist-backend/pkg/config"
	"shoppinglist-backend/pkg/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery()) // use built-in  middleware
	h := handlers.NewHandler(db)

	shoppingList := r.Group("/shopping-list-api/v1")
	{
		shoppingList.GET("/items", h.ItemsHandler)
		shoppingList.POST("/items", h.AddItemHandler)
		shoppingList.PUT("/items/:id", h.EditItemHandler)
		shoppingList.DELETE("/items/:id", h.DeleteItemHandler)
	}

	return r
}

func SetupDatabase(cfg config.Config) *sql.DB {
	dbInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)

	db, err := sql.Open("postgres", dbInfo)
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
		os.Exit(1)
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("Error connecting to the database: %q", err)
		os.Exit(1)
	}

	return db
}
