package dtos

import "time"

type CarRequest struct {
	LicensePlate  string `json:"license_plate" binding:"required"`
	Province      string `json:"province" binding:"required"`
	Brand         string `json:"brand" binding:"required"`
	CarModel      string `json:"car_model" binding:"required"`
	Year          int    `json:"year" binding:"required"`
	Color         string `json:"color" binding:"required"`
	ChassisNumber string `json:"chassis_number" binding:"required"`
	EngineNumber  string `json:"engine_number" binding:"required"`
	FuelType      string `json:"fuel_type" binding:"required"`
	Status        string `json:"status" binding:"required"`
	Remark        string `json:"remark"`
}

type CarResponse struct {
	ID            uint      `json:"id"`
	LicensePlate  string    `json:"license_plate"`
	Province      string    `json:"province"`
	Brand         string    `json:"brand"`
	CarModel      string    `json:"car_model"`
	Year          int       `json:"year"`
	Color         string    `json:"color"`
	ChassisNumber string    `json:"chassis_number"`
	EngineNumber  string    `json:"engine_number"`
	FuelType      string    `json:"fuel_type"`
	Status        string    `json:"status"`
	Remark        string    `json:"remark"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}



