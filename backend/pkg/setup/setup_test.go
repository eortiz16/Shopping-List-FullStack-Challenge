package setup

import (
	"database/sql"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

// setupTestDB creates a mock database connection using sqlmock
func setupTestDB() (*sql.DB, sqlmock.Sqlmock, error) {
	db, mock, err := sqlmock.New()
	if err != nil {
		return nil, nil, err
	}
	return db, mock, nil
}

// TestSetupRouter ensures that the router can be set up without errors
func TestSetupRouter(t *testing.T) {
	// Create a mock database connection
	db, _, err := setupTestDB()
	assert.NoError(t, err, "Failed to set up mock database")
	defer db.Close()

	// Set up the router with the mock database
	router := SetupRouter(db)
	assert.NotNil(t, router, "Router should be set up without errors")
}

// TestDatabaseConnection ensures that the database connection is established without errors
func TestDatabaseConnection(t *testing.T) {
	// Create a mock database connection
	db, _, err := setupTestDB()
	assert.NoError(t, err, "Failed to set up mock database")
	defer db.Close()

	// Verify that the database is reachable by pinging it
	err = db.Ping()
	assert.NoError(t, err, "Database should be reachable")
}
