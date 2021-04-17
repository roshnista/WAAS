package controllers

import (
	"bitbucket.org/waas_pro/api/models/entity"
	"bitbucket.org/waas_pro/common"
	"bitbucket.org/waas_pro/common/constants"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"net/http"
)

type Server struct {
	DB     *gorm.DB
	Router *mux.Router
}

func (server *Server) Initialize(params *entity.DatabaseParams) {

	var err error

	if params.Engine == "mysql" {
		DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", params.User, params.Password, params.Server, params.Port, params.Database)
		server.DB, err = gorm.Open(params.Engine, DBURL)
		if err != nil {
			common.Logger.Fatal("URL: "+DBURL+"  ERROR: "+err.Error(), constants.ServerBaseLogTag)
			log.Fatal("This is the error:", err)
		} else {
			common.Logger.Info(constants.ServerConnectedMsg, constants.ServerBaseLogTag)
		}
	}

	//server.Router.Use(CORS)

	server.DB.Debug().AutoMigrate(&entity.Users{},&entity.Wallets{},&entity.Transactions{}) //database migration

	server.Router = mux.NewRouter()
	server.Report()

	server.initializeRoutes()
}

func (server *Server) Run(addr string) {
	common.Logger.Info("Listening to port: "+constants.Port, constants.ControllerBaseLogTag)
	common.Logger.Fatal(http.ListenAndServe(addr, server.Router).Error(), constants.ControllerBaseLogTag)
}

//func CORS(next http.Handler) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//
//		w.Header().Set("Access-Control-Allow-Headers:", "Origin, X-Requested-With, Content-Type, Accept, message_id, Authorization")
//		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8081")
//		w.Header().Set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE")
//
//		if r.Method == "OPTIONS" {
//			w.WriteHeader(http.StatusOK)
//			return
//		}
//
//		// Next
//		next.ServeHTTP(w, r)
//		return
//	})
//}
