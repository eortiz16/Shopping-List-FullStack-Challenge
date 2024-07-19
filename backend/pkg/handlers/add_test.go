package handlers_test

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"shoppinglist-backend/pkg/handlers"
	"shoppinglist-backend/pkg/models"
	"strings"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestAddItemHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Test case for successfully adding a new item
	t.Run("Add new item successfully", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		mock.ExpectQuery("INSERT INTO items \\(name, description, quantity, purchased, created_at\\) VALUES \\(\\$1, \\$2, \\$3, \\$4, NOW\\(\\)\\) RETURNING id, created_at").
			WithArgs("NewItem", "NewDescription", 1, false).
			WillReturnRows(sqlmock.NewRows([]string{"id", "created_at"}).AddRow(1, time.Now()))

		h := handlers.NewHandler(db)
		r.POST("/shopping-list-api/v1/items", h.AddItemHandler)

		item := models.Item{Name: "NewItem", Description: "NewDescription", Quantity: 1, Purchased: false}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPost, "/shopping-list-api/v1/items", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var newItem models.Item
		err = json.Unmarshal(w.Body.Bytes(), &newItem)
		assert.NoError(t, err)
		assert.Equal(t, "NewItem", newItem.Name)
	})

	// Test case for invalid request payload
	t.Run("Invalid request payload", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.POST("/shopping-list-api/v1/items", h.AddItemHandler)

		req, _ := http.NewRequest(http.MethodPost, "/shopping-list-api/v1/items", strings.NewReader("{invalid json}"))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Invalid request payload", errorResponse.Error)
	})

	// Test case for missing item name
	t.Run("Missing item name", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.POST("/shopping-list-api/v1/items", h.AddItemHandler)

		item := models.Item{Description: "NewDescription", Quantity: 1, Purchased: false}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPost, "/shopping-list-api/v1/items", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Name is required", errorResponse.Error)
	})

	// Test case for invalid quantity
	t.Run("Invalid quantity", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.POST("/shopping-list-api/v1/items", h.AddItemHandler)

		item := models.Item{Name: "NewItem", Description: "NewDescription", Quantity: 0, Purchased: false}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPost, "/shopping-list-api/v1/items", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Quantity must be greater than zero", errorResponse.Error)
	})

	// Test case for database error during insertion
	t.Run("Database error during insertion", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		mock.ExpectQuery("INSERT INTO items \\(name, description, quantity, purchased, created_at\\) VALUES \\(\\$1, \\$2, \\$3, \\$4, NOW\\(\\)\\) RETURNING id, created_at").
			WithArgs("NewItem", "NewDescription", 1, false).
			WillReturnError(sql.ErrConnDone)

		h := handlers.NewHandler(db)
		r.POST("/shopping-list-api/v1/items", h.AddItemHandler)

		item := models.Item{Name: "NewItem", Description: "NewDescription", Quantity: 1, Purchased: false}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPost, "/shopping-list-api/v1/items", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Failed to add item", errorResponse.Error)
	})
}
