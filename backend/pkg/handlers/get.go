package handlers

import (
	"net/http"
	"shoppinglist-backend/pkg/models"

	"github.com/gin-gonic/gin"
)

// @Summary Get all items
// @Description Retrieves all items from the shopping list.
// @Tags items
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Item "List of items"
// @Failure 500 {object} models.ErrorResponse "Internal Server Error"
// @Router /items [get]
func (h *Handler) ItemsHandler(c *gin.Context) {
	var items []models.Item

	rows, err := h.DB.Query("SELECT id, name, description, quantity, purchased, created_at FROM items")
	if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to query items")
		return
	}
	defer rows.Close()

	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Name, &item.Description, &item.Quantity, &item.Purchased, &item.CreatedAt); err != nil {
			RespondWithError(c, http.StatusInternalServerError, "Failed to scan item")
			return
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Error encountered during iteration")
		return
	}

	// Return an empty array if no items found
	if len(items) == 0 {
		c.JSON(http.StatusOK, []models.Item{})
		return
	}

	c.JSON(http.StatusOK, items)
}
