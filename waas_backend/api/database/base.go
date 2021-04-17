package database

import "github.com/jinzhu/gorm"

type DataBase struct {
	DB *gorm.DB
}

var DataBaseObject DataBase
