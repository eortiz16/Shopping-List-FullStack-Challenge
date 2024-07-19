package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"shoppinglist-backend/pkg/setup"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestIntegration(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Mock database
	db, mock, err := sqlmock.New()
	assert.NoError(t, err)
	defer db.Close()

	// Setup router with mock database
	r := setup.SetupRouter(db)

	// Test /items endpoint
	t.Run("GET //items", func(t *testing.T) {
		// Mock the query and rows
		rows := sqlmock.NewRows([]string{"id", "name", "description", "quantity", "purchased", "created_at"}).
			AddRow(1, "Item 1", "Description 1", 1, false, time.Now()).
			AddRow(2, "Item 2", "Description 2", 2, true, time.Now())
		mock.ExpectQuery("SELECT id, name, description, quantity, purchased, created_at FROM items").WillReturnRows(rows)

		// Create a request to the endpoint
		req, _ := http.NewRequest(http.MethodGet, "/shopping-list-api/v1/items", nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		// Assert the response code and body
		assert.Equal(t, http.StatusOK, w.Code)
		assert.Contains(t, w.Body.String(), "Item 1")
		assert.Contains(t, w.Body.String(), "Item 2")
	})
}
