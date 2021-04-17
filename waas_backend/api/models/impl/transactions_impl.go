package impl

import (
	"bitbucket.org/waas_pro/api/views"
	"github.com/jinzhu/gorm"
	"time"
)

func GenerateReport(db *gorm.DB) ([]views.ReportRes, error) {
	var err error
	var res []views.ReportRes
	after := time.Now().AddDate(0, 0, -1)
	db.Debug().Table("transactions").Select("users.uid, users.username, wallets.wallet_name, transactions.transaction_id, transactions.amount, transactions.transaction_type").Joins("inner join wallets on wallets.id = transactions.wallet_id").Joins("inner join users on wallets.user_id = users.uid").Where("transactions.created_at >= ?", after).Scan(&res)
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return []views.ReportRes{}, err
	}
	return res, nil
}
