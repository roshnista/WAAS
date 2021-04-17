package entity

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)
//func (wallets *Wallets) TableName() string {
//	return "wallets"
//}
type Wallets struct {
	ID 					int64			`gorm:"column:id;primary_key;auto_increment"`
	UserID 				string 			`gorm:"column:user_id;type:varchar(50) NOT NULL"`
	WalletName 			string			`gorm:"column:wallet_name;type:varchar(50) NOT NULL"`
	Balance 			float64			`gorm:"column:wallet_balance;type:decimal(19,2);default:0 NOT NULL"`
	IsActive 			int64			`gorm:"column:is_active;type:tinyint(1);default:1 NOT NULL"`
	IsDeleted 			int64			`gorm:"column:is_deleted;type:tinyint(1);default:0 NOT NULL"`
	CreatedAt           time.Time       `gorm:"column:created_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	UpdatedAt           time.Time       `gorm:"column:updated_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	Transactions 		[]Transactions	`gorm:"foreignkey:WalletID;association_foreignkey:ID;auto_preload"`
}
