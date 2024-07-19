package handlers_test

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"shoppinglist-backend/pkg/handlers"
	"shoppinglist-backend/pkg/models"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestItemsHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Test case for successfully retrieving all items
	t.Run("Get all items successfully", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query and rows
		rows := sqlmock.NewRows([]string{"id", "name", "description", "quantity", "purchased", "created_at"}).
			AddRow(1, "Item 1", "Description 1", 1, false, time.Now()).
			AddRow(2, "Item 2", "Description 2", 2, true, time.Now())

		mock.ExpectQuery("SELECT id, name, description, quantity, purchased, created_at FROM items").WillReturnRows(rows)

		h := handlers.NewHandler(db)
		r.GET("/shopping-list-api/v1/items", h.ItemsHandler)

		req, _ := http.NewRequest(http.MethodGet, "/shopping-list-api/v1/items", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var items []models.Item
		err = json.Unmarshal(w.Body.Bytes(), &items)
		assert.NoError(t, err)
		assert.Len(t, items, 2)
	})

	// Test case for empty result set
	t.Run("Get all items with empty result", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query with empty result
		rows := sqlmock.NewRows([]string{"id", "name", "description", "quantity", "purchased", "created_at"})

		mock.ExpectQuery("SELECT id, name, description, quantity, purchased, created_at FROM items").WillReturnRows(rows)

		h := handlers.NewHandler(db)
		r.GET("/shopping-list-api/v1/items", h.ItemsHandler)

		req, _ := http.NewRequest(http.MethodGet, "/shopping-list-api/v1/items", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var items []models.Item
		err = json.Unmarshal(w.Body.Bytes(), &items)
		assert.NoError(t, err)
		assert.Len(t, items, 0)
	})

	// Test case for database query error
	t.Run("Database query error", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to return an error
		mock.ExpectQuery("SELECT id, name, description, quantity, purchased, created_at FROM items").
			WillReturnError(sql.ErrConnDone)

		h := handlers.NewHandler(db)
		r.GET("/shopping-list-api/v1/items", h.ItemsHandler)

		req, _ := http.NewRequest(http.MethodGet, "/shopping-list-api/v1/items", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)

		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Failed to query items", errorResponse.Error)
	})

	// Test case for error during row iteration
	t.Run("Error during row iteration", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to return rows with an error during iteration
		rows := sqlmock.NewRows([]string{"id", "name", "description", "quantity", "purchased", "created_at"}).
			AddRow(1, "Item 1", "Description 1", 1, false, time.Now()).
			AddRow(2, "Item 2", "Description 2", 2, true, time.Now()).
			RowError(1, sql.ErrConnDone)

		mock.ExpectQuery("SELECT id, name, description, quantity, purchased, created_at FROM items").WillReturnRows(rows)

		h := handlers.NewHandler(db)
		r.GET("/shopping-list-api/v1/items", h.ItemsHandler)

		req, _ := http.NewRequest(http.MethodGet, "/shopping-list-api/v1/items", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)

		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Error encountered during iteration", errorResponse.Error)
	})
}
