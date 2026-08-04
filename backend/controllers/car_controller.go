package controllers

import (
	"errors"
	"fmt"
	"haupcar/dtos"
	"haupcar/initializers"
	"haupcar/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCar(c *gin.Context) {
	var req dtos.CarRequest
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
			Success: false,
			Error:   "Invalid inputs: " + err.Error(),
		})
		return
	}

	newCars := models.Car{
		LicensePlate:  req.LicensePlate,
		Province:      req.Province,
		Brand:         req.Brand,
		CarModel:      req.CarModel,
		Year:          req.Year,
		Color:         req.Color,
		ChassisNumber: req.ChassisNumber,
		EngineNumber:  req.EngineNumber,
		FuelType:      req.FuelType,
		Status:        req.Status,
		Remark:        req.Remark,
	}

	result := initializers.DB.Create(&newCars)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Car created successfully",
		Data:    mapToCarResponse(newCars),
	})

}

func GetAllCars(c *gin.Context) {
	var Car []models.Car

	if err := initializers.DB.Order("updated_at DESC").Find(&Car).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Get all cars successfully",
		Data:    mapToCarResponseList(Car),
	})

}

func GetCarByID(c *gin.Context) {
	id := c.Param("id")
	var car models.Car

	if err := initializers.DB.First(&car, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Get car successfully",
		Data:    mapToCarResponse(car),
	})

}

func UpdateCar(c *gin.Context) {
	id := c.Param("id")

	var req dtos.CarRequest
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
			Success: false,
			Error:   "Invalid inputs: " + err.Error(),
		})
		return
	}

	var target models.Car
	if err := initializers.DB.Where("id = ?", id).First(&target).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
				Success: false,
				Error:   "Car not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	if err := initializers.DB.Model(&target).
		Select("*").
		Omit("ID", "CreatedAt", "DeletedAt").
		Updates(req).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	initializers.DB.First(&target, target.ID)
	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: fmt.Sprintf("Car ID: %s updated successfully", id),
		Data:    mapToCarResponse(target),
	})
}

func DeleteCar(c *gin.Context) {
	id := c.Param("id")

	var target models.Car
	if err := initializers.DB.Where("id = ?", id).First(&target).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
				Success: false,
				Error:   "Car not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal server error",
		})
		return
	}

	if err := initializers.DB.Delete(&target).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error:   "Internal Server error",
		})
		return
	}

	c.JSON(http.StatusAccepted, dtos.SuccessResponse{
		Success: true,
		Message: fmt.Sprintf("Deleted Car ID: %s Succussfully", id),
	})

}

func mapToCarResponse(car models.Car) dtos.CarResponse {
	return dtos.CarResponse{
		ID:            car.ID,
		LicensePlate:  car.LicensePlate,
		Province:      car.Province,
		Brand:         car.Brand,
		CarModel:      car.CarModel,
		Year:          car.Year,
		Color:         car.Color,
		ChassisNumber: car.ChassisNumber,
		EngineNumber:  car.EngineNumber,
		FuelType:      car.FuelType,
		Status:        car.Status,
		Remark:        car.Remark,
		CreatedAt:     car.CreatedAt,
		UpdatedAt:     car.UpdatedAt,
	}
}

func mapToCarResponseList(cars []models.Car) []dtos.CarResponse {
	responseList := []dtos.CarResponse{}
	for _, car := range cars {
		responseList = append(responseList, mapToCarResponse(car))
	}
	return responseList
}
