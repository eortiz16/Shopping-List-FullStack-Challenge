package handlers

import (
	"database/sql"
	"net/http"
	"shoppinglist-backend/pkg/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary Update an existing item
// @Description Updates an existing item in the shopping list.
// @Tags items
// @Accept  json
// @Produce  json
// @Param id path int true "Item ID"
// @Param item body models.Item true "Updated Item"
// @Success 200 {object} models.Item "Item updated successfully"
// @Failure 400 {object} models.ErrorResponse "Bad Request"
// @Failure 404 {object} models.ErrorResponse "Item not found"
// @Failure 500 {object} models.ErrorResponse "Internal Server Error"
// @Router /items/{id} [put]
func (h *Handler) EditItemHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		RespondWithError(c, http.StatusBadRequest, "Invalid item ID")
		return
	}

	var item models.Item
	if err := c.ShouldBindJSON(&item); err != nil {
		RespondWithError(c, http.StatusBadRequest, "Invalid request payload")
		return
	}

	var existingItem models.Item
	err = h.DB.QueryRow("SELECT id FROM items WHERE id=$1", id).Scan(&existingItem.ID)
	if err == sql.ErrNoRows {
		RespondWithError(c, http.StatusNotFound, "Item not found")
		return
	} else if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to check item existence")
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

	query := "UPDATE items SET name=$1, description=$2, quantity=$3, purchased=$4, due_date=$5 WHERE id=$6 RETURNING id, name, description, quantity, purchased, due_date, created_at"
	var updatedItem models.Item
	err = h.DB.QueryRow(query, item.Name, item.Description, item.Quantity, item.Purchased, item.DueDate, id).Scan(&updatedItem.ID, &updatedItem.Name, &updatedItem.Description, &updatedItem.Quantity, &updatedItem.Purchased, &updatedItem.DueDate, &updatedItem.CreatedAt)
	if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to update item")
		return
	}

	c.JSON(http.StatusOK, updatedItem)
}
