package controllers

import (
	"bitbucket.org/waas_pro/api/domain"
	"bitbucket.org/waas_pro/api/models/impl"
	"bitbucket.org/waas_pro/api/responses"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/errorhandling"
	"bitbucket.org/waas_pro/logging"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
)

var (
	packageTag  = "controllers"
	usersLogTag = "users_controllers.go" + "(" + packageTag + ")"
	standardLogger = logging.NewStandardLogger()

)


func (server *Server) CreateUser(w http.ResponseWriter, r *http.Request)  {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
		return
	}
	data := views.CreateUserReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}
	userCreated, er := domain.CreateUserHandler(&data, server.DB)
	if er != nil {
		responses.ERROR(w, er.ErrorCode)
		return
	}
	res := views.CreateUserRes{
		Name:       userCreated.Name,
		Username:   userCreated.Username,
		Age:        userCreated.Age,
		Contact:    userCreated.Contact,
		KycDetails: userCreated.KycDetails,
	}

	responses.JSON(w, http.StatusCreated, res)

}


func (server *Server) GetUser(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	userid := vars["id"]
	res, err := impl.GetUserWallets(userid, server.DB)
	if err != nil {
		standardLogger.Error(err.Error(), loginLogTag)
		responses.ERROR(w, err.ErrorCode)
		return
	}

	var wallets []views.Wallets
	for _, element := range res {
		user := views.Wallets{
			WalletName:    element.WalletName,
			WalletBalance: element.Balance,
			IsActive:      element.IsActive,
		}
		wallets = append(wallets, user)
	}

	responses.JSON(w, http.StatusOK, wallets)
}

func (server *Server) GetUsers(w http.ResponseWriter, _ *http.Request) {


	res, err := impl.FindAllUsers(server.DB)
	if err != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, err.ErrorCode)
		return
	}

	var users []views.GetUsersRes
	for _, element := range res {
		user := views.GetUsersRes{
			Uid:      element.Uid,
			Name:     element.Name,
			Username: element.Username,
		}
		users = append(users, user)

	}
	responses.JSON(w, http.StatusOK, users)
}


func (server *Server) DeleteUsers(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
		return
	}
	data := views.DeleteUserReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}
	deleted, er := impl.DeleteUserHandler(&data, server.DB)

	if er != nil {
		standardLogger.Error(err.Error(), usersLogTag)
		responses.ERROR(w, er.ErrorCode)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.RequestURI))
	responses.JSON(w, http.StatusOK, deleted)

}
