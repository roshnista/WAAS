package impl

import (
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/common/constants"
	"bitbucket.org/waas_pro/errorhandling"
	"github.com/jinzhu/gorm"
	"time"
)
var (
	walletLogTag = "wallets_impl.go" + "(" + packageTag + ")"
)

func ValidateWallet(db *gorm.DB, WalletName string, userid string) (bool, *errorhandling.Error) {
	var countWallets int64
	var count int64

	err := db.Debug().Table("wallets").Where("user_id = ?", userid).Count(&countWallets).Error
	if countWallets >= 5 {
		return false, errorhandling.CreateError(errorhandling.ErrorWalletsLimitReached)
	}
	err = db.Debug().Table("wallets").Where("user_id = ? AND wallet_name = ?", userid, WalletName).Count(&count).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return false, errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	if count == 0 {
		return true, nil
	}

	return false, nil
}


func SaveWallet(w *entity.Wallets, db *gorm.DB) (*entity.Wallets, *errorhandling.Error) {

	var err error
	err = db.Debug().Create(&w).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return &entity.Wallets{}, errorhandling.CreateError(errorhandling.ErrorDBInsertFailure)
	}
	return w, nil
}

func FindActiveWallet(db *gorm.DB, WalletName string, userid string) (entity.Wallets, *errorhandling.Error) {
	var wallet entity.Wallets
	var err error
	err = db.Debug().Table("wallets").Select("id").Where("wallet_name = ? AND user_id = ? AND is_active = ? AND is_deleted = ?", WalletName, userid, 1, 0).Scan(&wallet).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return entity.Wallets{}, errorhandling.CreateError(errorhandling.ErrorUserDoesNotExist)
	}
	return wallet, nil
}

func FindWallet(db *gorm.DB, WalletName string, userid string) (entity.Wallets, *errorhandling.Error) {
	var wallet entity.Wallets
	var err error
	err = db.Debug().Table("wallets").Select("id").Where("wallet_name = ? AND user_id = ? AND is_deleted = ?", WalletName, userid, 0).Scan(&wallet).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return entity.Wallets{}, errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	return wallet, nil
}

func UpdateDebitBalance(db *gorm.DB, data *views.TransferReq, wallet entity.Wallets) (string, *errorhandling.Error) {
	var wal entity.Wallets
	var err error
	err = db.Debug().Table("wallets").Select("wallet_balance").Where("id = ?", wallet.ID).Scan(&wal).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	if data.Amount > wal.Balance {
		return "Insufficient Balance", nil
	}
	err = db.Debug().Model(&wallet).UpdateColumn("wallet_balance", gorm.Expr("wallet_balance - ?", data.Amount)).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", errorhandling.CreateError(errorhandling.ErrorDBUpdateFailure)
	}
	return constants.AmountDebited, nil
}

func UpdateCreditBalance(db *gorm.DB, data *views.TransferReq, wallet entity.Wallets) (string, *errorhandling.Error) {
	var err error
	err = db.Debug().Model(&wallet).UpdateColumn("wallet_balance", gorm.Expr("wallet_balance + ?", data.Amount)).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", errorhandling.CreateError(errorhandling.ErrorDBUpdateFailure)
	}
	return constants.AmountCredited, nil
}

func CreateTransaction(t *entity.Transactions, db *gorm.DB) *errorhandling.Error {

	var err error
	err = db.Debug().Create(&t).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return errorhandling.CreateError(errorhandling.ErrorDBInsertFailure)
	}
	return nil
}

func BlockWallets(data *views.BlockWalletsReq, db *gorm.DB, userid string) (string, *errorhandling.Error) {

	namesArray := data.BlockNames

	var supersetArray []entity.Wallets
	err := db.Debug().Table("wallets").Select("wallet_name").Where("user_id = ? AND is_deleted = ?", userid, 0).Scan(&supersetArray).Error
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	var namesSuperArray []string
	for _, val := range supersetArray {
		namesSuperArray = append(namesSuperArray, val.WalletName)
	}

	for _, element := range namesSuperArray {
		wallet, er := FindWallet(db, element, userid)
		if er != nil {
			standardLogger.Error(err.Error(), walletLogTag)
			return "", er
		}
		updatedEntityMap := map[string]interface{}{}
		updatedEntityMap["is_active"] = 1
		updatedEntityMap["updated_at"] = time.Now()
		for _, val := range namesArray {
			if val == element {
				updatedEntityMap["is_active"] = 0
			}

		}
		db.Debug().Table("wallets").Where("id = ?", wallet.ID).Updates(updatedEntityMap)
		if db.Error != nil {
			standardLogger.Error(err.Error(), walletLogTag)
			return "", errorhandling.CreateError(errorhandling.ErrorDBUpdateFailure)
		}
	}
	return constants.WalletsBlocked, nil
}

func DeleteWallets(data *views.DeleteWalletsReq, db *gorm.DB, userid string) (string, *errorhandling.Error) {
	namesArray := data.DeleteNames

	for _, element := range namesArray {
		wallet, err := FindActiveWallet(db, element, userid)
		if err != nil {
			standardLogger.Error(err.Error(), walletLogTag)
			return "", errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
		}
		updatedEntityMap := map[string]interface{}{}
		updatedEntityMap["is_deleted"] = 1
		updatedEntityMap["updated_at"] = time.Now()
		db.Debug().Table("wallets").Where("id = ?", wallet.ID).Updates(updatedEntityMap)
		if db.Error != nil {
			standardLogger.Error(db.Error.Error(), walletLogTag)
			return "", errorhandling.CreateError(errorhandling.ErrorDBUpdateFailure)
		}
	}

	return constants.WalletsDeleted , nil
}


func GetUserWallets(userid string, db *gorm.DB) ([]entity.Wallets, *errorhandling.Error) {
	var err error
	var res []entity.Wallets
	err = db.Debug().Table("wallets").Where("user_id = ? AND is_deleted = ?", userid, 0).Scan(&res).Error
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return []entity.Wallets{}, errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	return res, nil
}
