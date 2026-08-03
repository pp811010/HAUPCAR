package models

import (
	"gorm.io/gorm"
)

type Car struct {
	gorm.Model
	LicensePlate  string `json:"license_plate"`
	Province      string `json:"province" gorm:"unique"`
	Brand         string `json:"brand" `
	CarModel      string `json:"car_model"`
	SubModel      string `json:"sub_model"`
	Year          int    `json:"year"`
	Color         string `json:"color"`
	ChassisNumber string `json:"chassis_number"`
	EngineNumber  string `json:"engine_number"`
	FuelType      string `json:"fuel_type"`
	Status        string `json:"status"`
	Remark        string `json:"remark"`
}
