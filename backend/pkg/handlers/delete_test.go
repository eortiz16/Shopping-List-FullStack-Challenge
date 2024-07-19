package handlers_test

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"shoppinglist-backend/pkg/handlers"
	"shoppinglist-backend/pkg/models"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestDeleteItemHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Test case for successfully deleting an item
	t.Run("Delete item successfully", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

		// Mock the delete operation
		mock.ExpectExec("DELETE FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnResult(sqlmock.NewResult(1, 1))

		h := handlers.NewHandler(db)
		r.DELETE("/shopping-list-api/v1/items/:id", h.DeleteItemHandler)

		req, _ := http.NewRequest(http.MethodDelete, "/shopping-list-api/v1/items/1", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		var successResponse models.SuccessResponse
		err = json.Unmarshal(w.Body.Bytes(), &successResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Item deleted successfully", successResponse.Message)
	})

	// Test case for invalid item ID
	t.Run("Invalid item ID", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.DELETE("/shopping-list-api/v1/items/:id", h.DeleteItemHandler)

		req, _ := http.NewRequest(http.MethodDelete, "/shopping-list-api/v1/items/abc", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Invalid item ID", errorResponse.Error)
	})

	// Test case for item not found
	t.Run("Item not found", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{}))

		h := handlers.NewHandler(db)
		r.DELETE("/shopping-list-api/v1/items/:id", h.DeleteItemHandler)

		req, _ := http.NewRequest(http.MethodDelete, "/shopping-list-api/v1/items/1", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Item not found", errorResponse.Error)
	})

	// Test case for database error during deletion
	t.Run("Database error during deletion", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

		// Mock the delete operation to return an error
		mock.ExpectExec("DELETE FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnError(sql.ErrConnDone)

		h := handlers.NewHandler(db)
		r.DELETE("/shopping-list-api/v1/items/:id", h.DeleteItemHandler)

		req, _ := http.NewRequest(http.MethodDelete, "/shopping-list-api/v1/items/1", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Failed to delete item", errorResponse.Error)
	})
}
