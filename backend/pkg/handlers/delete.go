package handlers

import (
	"database/sql"
	"net/http"
	"shoppinglist-backend/pkg/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary Delete an item
// @Description Deletes an item from the shopping list.
// @Tags items
// @Accept  json
// @Produce  json
// @Param id path int true "Item ID"
// @Success 200 {object} models.SuccessResponse "Item deleted successfully"
// @Failure 400 {object} models.ErrorResponse "Bad Request"
// @Failure 404 {object} models.ErrorResponse "Item not found"
// @Failure 500 {object} models.ErrorResponse "Internal Server Error"
// @Router /items/{id} [delete]
func (h *Handler) DeleteItemHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		RespondWithError(c, http.StatusBadRequest, "Invalid item ID")
		return
	}

	var existingItemID int
	err = h.DB.QueryRow("SELECT id FROM items WHERE id=$1", id).Scan(&existingItemID)
	if err == sql.ErrNoRows {
		RespondWithError(c, http.StatusNotFound, "Item not found")
		return
	} else if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to check item existence")
		return
	}

	query := "DELETE FROM items WHERE id=$1"
	result, err := h.DB.Exec(query, id)
	if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to delete item")
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		RespondWithError(c, http.StatusInternalServerError, "Failed to retrieve deletion result")
		return
	}
	if rowsAffected == 0 {
		RespondWithError(c, http.StatusNotFound, "Item not found")
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{Message: "Item deleted successfully"})
}
