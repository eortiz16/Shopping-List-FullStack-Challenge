package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetConfig(t *testing.T) {
	// Set environment variables
	err := os.Setenv("DB_HOST", "localhost")
	assert.NoError(t, err)
	err = os.Setenv("DB_PORT", "5432")
	assert.NoError(t, err)
	err = os.Setenv("DB_USER", "user")
	assert.NoError(t, err)
	err = os.Setenv("DB_PASSWORD", "password")
	assert.NoError(t, err)
	err = os.Setenv("DB_NAME", "dbname")
	assert.NoError(t, err)

	// Call the GetConfig function
	cfg := GetConfig()

	// Assert the values
	assert.Equal(t, "localhost", cfg.DBHost)
	assert.Equal(t, "5432", cfg.DBPort)
	assert.Equal(t, "user", cfg.DBUser)
	assert.Equal(t, "password", cfg.DBPassword)
	assert.Equal(t, "dbname", cfg.DBName)

	// Unset environment variables
	err = os.Unsetenv("DB_HOST")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_PORT")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_USER")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_PASSWORD")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_NAME")
	assert.NoError(t, err)
}

func TestGetConfigWithMissingEnvVars(t *testing.T) {
	// Ensure environment variables are not set
	err := os.Unsetenv("DB_HOST")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_PORT")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_USER")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_PASSWORD")
	assert.NoError(t, err)
	err = os.Unsetenv("DB_NAME")
	assert.NoError(t, err)

	// Call the GetConfig function
	cfg := GetConfig()

	// Assert the values are empty
	assert.Empty(t, cfg.DBHost)
	assert.Empty(t, cfg.DBPort)
	assert.Empty(t, cfg.DBUser)
	assert.Empty(t, cfg.DBPassword)
	assert.Empty(t, cfg.DBName)
}
