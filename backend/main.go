package main

import (
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
	api.POST("/cars", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
  }

  router.Run() 
}
