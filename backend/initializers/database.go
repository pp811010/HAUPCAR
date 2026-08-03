package initializers

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"haupcar/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}
	DB = db
	DB.AutoMigrate(&models.Car{})
}


