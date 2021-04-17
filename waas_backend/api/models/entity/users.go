package entity

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)

//func (users *Users) TableName() string {
//	return "users"
//}



type Users struct {
	ID 					int64			`gorm:"column:id;primary_key;auto_increment"`
	Uid 				string			`gorm:"column:uid;type:varchar(50) NOT NULL"`
	Username 			string			`gorm:"unique;column:username;type:varchar(50) NOT NULL"`
	Name 				string 			`gorm:"column:name;type:varchar(50) NOT NULL"`
	Age 				int64			`gorm:"column:age;type:int(2) NOT NULL"`
	Contact 			string			`gorm:"column:contact;type:varchar(50) NOT NULL"`
	KycDetails 			string			`gorm:"column:kyc_details;type:varchar(50) NOT NULL"`
	CreatedAt           time.Time       `gorm:"column:created_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	UpdatedAt           time.Time       `gorm:"column:updated_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	IsDeleted 			int64			`gorm:"column:is_deleted;type:tinyint(1);default:0 NOT NULL"`
	Wallets 			[]Wallets		`gorm:"foreignkey:UserID;association_foreignkey:Uid;auto_preload"`
}


