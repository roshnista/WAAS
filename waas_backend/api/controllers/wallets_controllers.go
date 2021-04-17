package controllers

import (
	"bitbucket.org/waas_pro/api/domain"
	"bitbucket.org/waas_pro/api/models/impl"
	"bitbucket.org/waas_pro/api/responses"
	"bitbucket.org/waas_pro/api/views"
	"bitbucket.org/waas_pro/errorhandling"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
)


var (
	walletLogTag = "wallets_controller.go" + "(" + packageTag + ")"
)

func (server *Server) CreateWallet(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
	}
	vars := mux.Vars(r)
	userid := vars["id"]
	wallet := views.CreateWalletReq{}
	err = json.Unmarshal(body, &wallet)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}
	walletCreated, er := domain.CreateWalletHandler(&wallet, server.DB, userid)
	if er != nil {
		responses.ERROR(w, er.ErrorCode)
		return
	}
	res := views.CreateWalletRes{
		WalletName: walletCreated.WalletName,
	}
	responses.JSON(w, http.StatusCreated, res)
}



func (server *Server) Credit(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
	}
	data := views.TransferReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}

	vars := mux.Vars(r)
	userid := vars["id"]
	credited, er := domain.CreditAmount(&data, server.DB, userid)
	if er != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, er.ErrorCode)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.RequestURI))
	responses.JSON(w, http.StatusCreated, credited)

}



func (server *Server) Debit(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
	}
	data := views.TransferReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}

	vars := mux.Vars(r)
	userid := vars["id"]
	debited, er := domain.DebitAmount(&data, server.DB, userid)

	if er != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, er.ErrorCode)
		return
	}
	if debited == "Insufficient Balance" {
		responses.JSON(w, http.StatusBadRequest, debited)
	} else {
		responses.JSON(w, http.StatusCreated, debited)
	}

}



func (server *Server) BlockWallets(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
	}
	data := views.BlockWalletsReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}

	vars := mux.Vars(r)
	userid := vars["id"]
	blocked, er := impl.BlockWallets(&data, server.DB, userid)

	if er != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, er.ErrorCode)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.RequestURI))
	responses.JSON(w, http.StatusCreated, blocked)
}



func (server *Server) DeleteWallets(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorInvalidInputPassed)
	}
	data := views.DeleteWalletsReq{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, errorhandling.ErrorUnmarshalFailure)
		return
	}

	vars := mux.Vars(r)
	userid := vars["id"]
	deleted, er := impl.DeleteWallets(&data, server.DB, userid)

	if er != nil {
		standardLogger.Error(err.Error(), walletLogTag)
		responses.ERROR(w, er.ErrorCode)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.RequestURI))
	responses.JSON(w, http.StatusOK, deleted)

}
