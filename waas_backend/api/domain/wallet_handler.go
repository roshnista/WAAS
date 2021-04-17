package domain

import (
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/api/models/impl"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/errorhandling"
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"strings"
	"time"
)

var (
	walletLogTag = "wallet_handler.go" + "(" + packageTag + ")"
)

func CreateWalletHandler(data *views.CreateWalletReq, db *gorm.DB, userid string) (*entity.Wallets, *errorhandling.Error) {

	validated, err := impl.ValidateWallet(db, data.WalletName, userid)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return nil, err
	}

	if validated==false {
		return nil, errorhandling.CreateError(errorhandling.ErrorWalletAlreadyExists)
	}

	wallet := entity.Wallets{
		UserID:       userid,
		WalletName:   data.WalletName,
		Balance:      0,
		IsActive:     1,
		IsDeleted:    0,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	walletCreated, err := impl.SaveWallet(&wallet, db)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return nil, err
	}

	return walletCreated, nil
}



func CreditAmount(data *views.TransferReq, db *gorm.DB, userid string) (string, *errorhandling.Error) {
	wallet, err := impl.FindActiveWallet(db, data.WalletName, userid)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}
	credited, err := impl.UpdateCreditBalance(db, data, wallet)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}


	uuidWithHyphen := uuid.New()
	id := strings.Replace(uuidWithHyphen.String(), "-", "", -1)

	transaction := entity.Transactions{
		TransactionID:   id,
		WalletID:        wallet.ID,
		Amount:          data.Amount,
		TransactionType: "Credit",
		TransactionTime: time.Now(),
	}

	err = impl.CreateTransaction(&transaction, db)

	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}
	return credited, nil

}



func DebitAmount(data *views.TransferReq, db *gorm.DB, userid string) (string, *errorhandling.Error) {
	wallet, err := impl.FindActiveWallet(db, data.WalletName, userid)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}
	debited, err := impl.UpdateDebitBalance(db, data, wallet)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}
	if debited == "Insufficient Balance" {
		return debited, nil
	}

	uuidWithHyphen := uuid.New()
	id := strings.Replace(uuidWithHyphen.String(), "-", "", -1)

	transaction := entity.Transactions{
		TransactionID:   id,
		WalletID:        wallet.ID,
		Amount:          data.Amount,
		TransactionType: "Debit",
		TransactionTime: time.Now(),
	}

	err = impl.CreateTransaction(&transaction, db)

	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		return "", err
	}

	return debited, nil

}




