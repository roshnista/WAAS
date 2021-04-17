package entity

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)
//func (transaction *Transactions) TableName() string {
//	return "transactions"
//}

type Transactions struct {
	ID							int64			`gorm:"column:id;primary_key;auto_increment"`
	TransactionID 				string 			`gorm:"column:transaction_id;type:varchar(50) NOT NULL"`
	WalletID 					int64			`gorm:"column:wallet_id;type:integer(10) NOT NULL"`
	Amount 						float64			`gorm:"column:amount;type:decimal(19,2) NOT NULL"`
	TransactionType 			string			`gorm:"column:transaction_type;type:char(20) NOT NULL"`
	TransactionTime				time.Time		`gorm:"column:transaction_time;type:timestamp NOT NULL"`
	CreatedAt           		time.Time       `gorm:"column:created_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	UpdatedAt           		time.Time       `gorm:"column:updated_at;type:timestamp; default:CURRENT_TIMESTAMP"`
	Wallet 						Wallets 		`gorm:"foreignKey:WalletID"`
}
