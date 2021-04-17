package domain

import (
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/api/models/impl"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/common/constants"
	"bitbucket.org/waas_pro/errorhandling"
	"bitbucket.org/waas_pro/logging"
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"html"
	"strings"
	"time"
)

var (
	packageTag     = "domain"
	userLogTag = "user_handler.go" + "(" + packageTag + ")"
	standardLogger = logging.NewStandardLogger()
)


func Prepare(u *views.CreateUserReq) {
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Name = html.EscapeString(strings.TrimSpace(u.Name))
}

func Validate(u *views.CreateUserReq, action string) *errorhandling.Error {
	switch strings.ToLower(action) {
	case "register":
		if u.Username == "" {
			standardLogger.Error(constants.ReqUserName, userLogTag)
			return errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
		}
		if u.KycDetails == "" {
			standardLogger.Error(constants.ReqKycDetails, userLogTag)
			return errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
		}

		return nil
	case "update":
		if u.Username == "" {
			standardLogger.Error(constants.ReqUserName, userLogTag)
			return errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
		}
		return nil
	case "login":

		if u.Username == "" {
			standardLogger.Error(constants.ReqUserName, userLogTag)
			return errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
		}
		return nil

	default:
		if u.Username == "" {
			standardLogger.Error(constants.ReqUserName, userLogTag)
			return errorhandling.CreateError(errorhandling.ErrorInvalidInputPassed)
		}
		return nil
	}
}

func CreateUserHandler(data *views.CreateUserReq, db *gorm.DB) (*entity.Users, *errorhandling.Error) {

	uuidWithHyphen := uuid.New()
	id := strings.Replace(uuidWithHyphen.String(), "-", "", -1)
	Prepare(data)
	err := Validate(data, "register")
	if err != nil {
		standardLogger.Error(err.Error(), userLogTag)
		return nil, err
	}

	user := entity.Users{
		Uid:        id,
		Username:   data.Username,
		Name:       data.Name,
		Age:        data.Age,
		Contact:    data.Contact,
		KycDetails: data.KycDetails,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
		IsDeleted:  0,
	}

	userCreated, err := impl.SaveUser(&user, db)
	if err != nil {
		return nil, err
	}

	return userCreated, nil
}









