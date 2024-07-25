package handlers_test

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"shoppinglist-backend/pkg/handlers"
	"shoppinglist-backend/pkg/models"
	"strconv"
	"strings"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Utility function to compare items
func compareItems(t *testing.T, expected, actual models.Item) {
	t.Helper()
	if !reflect.DeepEqual(expected, actual) {
		t.Errorf("expected item: %v, got: %v", expected, actual)
	}
}

func TestEditItemHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Test case for invalid item ID
	t.Run("Invalid item ID", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/invalid", strings.NewReader(`{}`))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Invalid item ID", errorResponse.Error)
	})

	// Test case for invalid request payload
	t.Run("Invalid request payload", func(t *testing.T) {
		r := gin.Default()
		db, _, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

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

	// Test case for item not found
	t.Run("Item not found", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		id := 1
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(id).
			WillReturnError(sql.ErrNoRows)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/"+strconv.Itoa(id), strings.NewReader(`{}`))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Item not found", errorResponse.Error)
	})

	// Test case for database error during existence check
	t.Run("Database error during existence check", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		id := 1
		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(id).
			WillReturnError(sql.ErrConnDone)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/"+strconv.Itoa(id), strings.NewReader(`{}`))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusInternalServerError, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Failed to check item existence", errorResponse.Error)
	})

	// Test case for invalid quantity
	t.Run("Invalid quantity", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		id := 1
		item := models.Item{Name: "UpdatedItem", Description: "UpdatedDescription", Quantity: 0, Purchased: false}
		itemJson, _ := json.Marshal(item)

		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(id).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(id))

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/"+strconv.Itoa(id), strings.NewReader(string(itemJson)))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		var errorResponse models.ErrorResponse
		err = json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Quantity must be greater than zero", errorResponse.Error)
	})

	// Test case for database error during update
	t.Run("Database error during update", func(t *testing.T) {
		r := gin.Default()
		db, mock, err := sqlmock.New()
		assert.NoError(t, err)
		defer db.Close()

		h := handlers.NewHandler(db)
		r.PUT("/shopping-list-api/v1/items/:id", h.EditItemHandler)

		id := 1
		item := models.Item{Name: "UpdatedItem", Description: "UpdatedDescription", Quantity: 2, Purchased: false}
		itemJson, _ := json.Marshal(item)

		mock.ExpectQuery("SELECT id FROM items WHERE id=\\$1").
			WithArgs(id).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(id))

		mock.ExpectQuery("UPDATE items SET name=\\$1, description=\\$2, quantity=\\$3, purchased=\\$4, due_date=\\$5 WHERE id=\\$6 RETURNING id, name, description, quantity, purchased, due_date, created_at").
			WithArgs(item.Name, item.Description, item.Quantity, item.Purchased, item.DueDate, id).
			WillReturnError(sql.ErrConnDone)

		req, _ := http.NewRequest(http.MethodPut, "/shopping-list-api/v1/items/"+strconv.Itoa(id), strings.NewReader(string(itemJson)))
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
