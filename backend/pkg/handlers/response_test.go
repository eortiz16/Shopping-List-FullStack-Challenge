package handlers_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"shoppinglist-backend/pkg/handlers"
	"shoppinglist-backend/pkg/models"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestRespondWithError(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Respond with error", func(t *testing.T) {
		// Create a new gin router
		r := gin.Default()

		// Define a handler that uses respondWithError
		r.GET("/test-error", func(c *gin.Context) {
			handlers.RespondWithError(c, http.StatusBadRequest, "Test error message")
		})

		// Create a request to the handler
		req, _ := http.NewRequest(http.MethodGet, "/test-error", nil)
		w := httptest.NewRecorder()

		// Serve the request
		r.ServeHTTP(w, req)

		// Assert the response code
		assert.Equal(t, http.StatusBadRequest, w.Code)

		// Assert the response body
		var errorResponse models.ErrorResponse
		err := json.Unmarshal(w.Body.Bytes(), &errorResponse)
		assert.NoError(t, err)
		assert.Equal(t, "Test error message", errorResponse.Error)
	})
}
