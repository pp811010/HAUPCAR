package models

import (
	"gorm.io/gorm"
)

type Car struct {
	gorm.Model
	LicensePlate  string `gorm:"unique"`
	Province      string
	Brand         string
	CarModel      string
	Year          int
	Color         string
	ChassisNumber string
	EngineNumber  string
	FuelType      string
	Status        string
	Remark        string
}
