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

func CreateCar(c *gin.Context){
	var req models.Car
	if err := c.ShouldBindBodyWithJSON(&req); err != nil{
		c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
			Success: false,
			Error: "Invalid inputs: " + err.Error(),
		})
	}

	newCars := models.Car{
		LicensePlate:  req.LicensePlate,
		Province:      req.Province,
		Brand:         req.Brand,
		CarModel:      req.CarModel,
		SubModel:      req.SubModel,
		Year:          req.Year,
		Color:         req.Color,
		ChassisNumber: req.ChassisNumber,
		EngineNumber:  req.EngineNumber,
		FuelType:      req.FuelType,
		Status:        req.Status,
		Remark:        req.Remark,
	}
	

	result  := initializers.DB.Create(&newCars)
	
	if result.Error != nil{
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Car created successfully",
		Data:    req,
	})
	
}


func GetAllCars(c *gin.Context){
	var Car []models.Car

	if err := initializers.DB.Find(&Car).Error; err != nil{
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Get all cars successfully",
		Data:    Car,
	})
	
}


func GetCarByID(c *gin.Context){
	id := c.Param("id")
	var car models.Car

	if err := initializers.DB.First(&car, id).Error; err != nil{
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: "Get car successfully",
		Data:    car,
	})
	
}


func UpdateCar(c *gin.Context){
	id := c.Param("id")
	
	var req models.Car
	if err := c.ShouldBindBodyWithJSON(&req); err != nil{
		c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
			Success: false,
			Error: "Invalid inputs: " + err.Error(),
		})
		return
	}

	var target models.Car
	if err := initializers.DB.Where("id = ?", id).First(&target).Error; err != nil{
		if errors.Is(err, gorm.ErrRecordNotFound){
			c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
				Success: false,
				Error: "Car not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	if err := initializers.DB.Model(&target).Updates(req).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	initializers.DB.First(&target, target.ID)
	c.JSON(http.StatusOK, dtos.SuccessResponse{
		Success: true,
		Message: fmt.Sprintf("Car ID: %s updated successfully", id),
		Data:    target,
	})
}


func DeleteCar(c *gin.Context){
	id := c.Param("id")
	
	var target models.Car 
	if err := initializers.DB.Where("id = ?", id).First(&target).Error; err != nil{
		if errors.Is(err, gorm.ErrRecordNotFound){
			c.JSON(http.StatusBadRequest, dtos.ErrorResponse{
				Success: false,
				Error: "Car not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal server error",
		})
		return
	}

	if err := initializers.DB.Delete(&target).Error; err != nil{
		c.JSON(http.StatusInternalServerError, dtos.ErrorResponse{
			Success: false,
			Error: "Internal Server error",
		})
		return
	}

	c.JSON(http.StatusAccepted, dtos.SuccessResponse{
		Success: true,
		Message: fmt.Sprintf("Deleted Car ID: %s Succussfully", id),
	})

}

