package controllers

import (
	"bitbucket.org/waas_pro/api/models/impl"
	"bitbucket.org/waas_pro/api/responses"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/errorhandling"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

var (
	loginLogTag = "login_controllers.go" + "(" + packageTag + ")"
)


func (server *Server) Login(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), loginLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
		return
	}
	user := views.LoginReq{}
	err = json.Unmarshal(body, &user)
	if err != nil {
		standardLogger.Error(err.Error(), loginLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}

	res, userid, err := impl.SignIn(user.Username, server.DB)
	if err != nil {
		standardLogger.Error(err.Error(), loginLogTag)
		responses.ERROR(w, errorhandling.ErrorUserDoesNotExist)
		return
	}
	token := views.SignInRes{
		Wallets: *res,
		Uid:     userid,
	}
	responses.JSON(w, http.StatusOK, token)
}


