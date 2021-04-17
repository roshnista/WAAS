package impl

import (
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/common/constants"
	"bitbucket.org/waas_pro/errorhandling"
	"bitbucket.org/waas_pro/logging"
	"github.com/jinzhu/gorm"
	"time"
)

var (
	packageTag     = "impl"
	userLogTag = "users_impl.go" + "(" + packageTag + ")"
	standardLogger = logging.NewStandardLogger()
)

func SaveUser(u *entity.Users, db *gorm.DB) (*entity.Users, *errorhandling.Error) {
	var err error
	err = db.Debug().Create(&u).Error
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return nil, errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
	}
	return u, nil
}

func SignIn(username string, db *gorm.DB) (*[]views.Wallets, string,  error) {
    var err error
	var user entity.Users
	db.Debug().Table("users").Select("uid").Where("username = ?", username).Scan(&user)
	if db.Error != nil {
		standardLogger.Error(constants.UsernameNotFound, userLogTag)
		return &[]views.Wallets{}, "",  db.Error
	}

	var res []views.Wallets
	err = db.Debug().Table("wallets").Select("wallet_name, wallet_balance, is_active").Where("user_id = ? AND is_deleted = ?", user.Uid, 0).Scan(&res).Error
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return &[]views.Wallets{}, "", errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	return &res, user.Uid, nil
}

func FindAllUsers(db *gorm.DB) ([]entity.Users, *errorhandling.Error) {
	var err error
	var users []entity.Users
	err = db.Debug().Table("users").Where("is_deleted = ?", 0).Scan(&users).Error
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return []entity.Users{}, errorhandling.CreateError(errorhandling.ErrorDBFetchFailure)
	}
	return users, nil
}


func DeleteUserHandler (data *views.DeleteUserReq, db *gorm.DB) (string, *errorhandling.Error) {

	idArray := data.DeleteIDs
	var user entity.Users
	for _, element := range idArray {
		user.Uid = element
		db.Debug().Table("users").Where("uid = ?", user.Uid).UpdateColumns(entity.Wallets{UpdatedAt: time.Now(), IsDeleted: 1})
		if db.Error != nil {
			standardLogger.Error(db.Error.Error(), userLogTag)
			return "", errorhandling.CreateError(errorhandling.ErrorDBUpdateFailure)
		}
	}

	return constants.UserDeleted, nil
}