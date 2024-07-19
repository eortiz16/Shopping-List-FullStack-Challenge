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

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestEditItemHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Test case for successfully updating an item
	t.Run("Update item successfully", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

		// Mock the update operation
		mock.ExpectExec("UPDATE items SET name=\\$1, description=\\$2, quantity=\\$3, purchased=\\$4 WHERE id=\\$5").
			WithArgs("UpdatedItem", "UpdatedDescription", 2, true, 1).
			WillReturnResult(sqlmock.NewResult(1, 1))

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		item := models.Item{Name: "UpdatedItem", Description: "UpdatedDescription", Quantity: 2, Purchased: true}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/1", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		var successResponse models.SuccessResponse
		err = json.Unmarshal(w.Body.Bytes(), &successResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Item updated successfully", successResponse.Message)
	})

	// Test case for invalid item ID
	t.Run("Invalid item ID", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/abc", strings.NewReader("{}"))
		req.Header.Set("Content-Type", "application/json")
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
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		item := models.Item{Name: "UpdatedItem", Description: "UpdatedDescription", Quantity: 2, Purchased: true}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/1", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Item not found", errorResponse.Error)
	})

	// Test case for invalid request payload
	t.Run("Invalid request payload", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/1", strings.NewReader("{invalid json}"))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Invalid request payload", errorResponse.Error)
	})

	// Test case for database error during update
	t.Run("Database error during update", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		// Mock the query to check if the item exists
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(1).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))

		// Mock the update operation to return an error
		mock.ExpectExec("UPDATE items SET name=\\$1, description=\\$2, quantity=\\$3, purchased=\\$4 WHERE id=\\$5").
			WithArgs("UpdatedItem", "UpdatedDescription", 2, true, 1).
			WillReturnError(sql.ErrConnDone)

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		item := models.Item{Name: "UpdatedItem", Description: "UpdatedDescription", Quantity: 2, Purchased: true}
		itemJson, _ := json.Marshal(item)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/1", strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Failed to update item", errorResponse.Error)
	})
}
