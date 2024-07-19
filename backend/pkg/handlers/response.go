package handlers

import (
	"shoppinglist-backend/pkg/models"

	"github.com/gin-gonic/gin"
)

func RespondWithError(c *gin.Context, code int, message string) {
	c.JSON(code, models.ErrorResponse{Error: message})
}
