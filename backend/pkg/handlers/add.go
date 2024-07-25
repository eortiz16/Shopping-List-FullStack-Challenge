package handlers

import (
	"net/http"
	"shoppinglist-backend/pkg/models"

	"github.com/gin-gonic/gin"
)

// @Summary Add a new item
// @Description Adds a new item to the shopping list.
// @Tags items
// @Accept  json
// @Produce  json
// @Param item body models.Item true "New Item"
// @Success 200 {object} models.Item "The created item"
// @Failure 400 {object} models.ErrorResponse "Bad Request"
// @Failure 500 {object} models.ErrorResponse "Internal Server Error"
// @Router /items [post]
func (h *Handler) AddItemHandler(c *gin.Context) {
	var item models.Item

	if err := c.ShouldBindJSON(&item); err != nil {
		RespondWithError(c, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if item.Name == "" {
		RespondWithError(c, http.StatusBadRequest, "Name is required")
		return
	}
	if item.Quantity <= 0 {
		RespondWithError(c, http.StatusBadRequest, "Quantity must be greater than zero")
		return
	}

	query := "INSERT INTO items (name, description, quantity, purchased, due_date, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, name, description, quantity, purchased, due_date, created_at"
	err := h.DB.QueryRow(query, item.Name, item.Description, item.Quantity, item.Purchased, item.DueDate).Scan(&item.ID, &item.Name, &item.Description, &item.Quantity, &item.Purchased, &item.DueDate, &item.CreatedAt)
	if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to add item")
		return
	}

	c.JSON(http.StatusOK, item)
}
