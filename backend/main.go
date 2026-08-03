package main

import (
	"haupcar/controllers"
	"haupcar/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.ConnectDatabase()
}

func main() {
  router := gin.Default()

  api := router.Group("/api") 
  {
	api.POST("/car", controllers.CreateCar)
	api.GET("/cars", controllers.GetAllCars)
	api.GET("/car/:id", controllers.GetCarByID)
	api.PUT("/car/:id", controllers.UpdateCar)
	api.DELETE("/car/:id", controllers.DeleteCar)
  }

  router.Run() 
}
