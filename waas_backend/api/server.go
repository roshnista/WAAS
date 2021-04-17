package api

import (
	"bitbucket.org/waas_pro/api/controllers"
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/common/constants"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var server = controllers.Server{}

func Run() {

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	} else {
		fmt.Println("We are getting the env values")
	}
	data := entity.DatabaseParams{
		Engine:   os.Getenv("DB_DRIVER"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Server:   os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Database: os.Getenv("DB_NAME"),
	}
	server.Initialize(&data)

	server.Run(constants.Port)

}
