package dtos

type carRequest struct {
	LicensePlate string `json:"license_plate" binding:"required"`
	Province     string `json:"province" binding:"required"`
	Brand         string `json:"brand" binding:"required"`
	CarModel      string `json:"car_model" binding:"required"`
	SubModel      string `json:"sub_model" binding:"required"`
	Year          int    `json:"year" binding:"required"`
	Color         string `json:"color" binding:"required"`
	ChassisNumber string `json:"chassis_number" binding:"required"`
	EngineNumber  string `json:"engine_number" binding:"required"`
	FuelType      string `json:"fuel_type" binding:"required"`
	Status        string `json:"status" binding:"required"`
	Remark        string `json:"remark"`
}