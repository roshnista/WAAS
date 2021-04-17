package controllers

import "bitbucket.org/waas_pro/api/middlewares"

func (s *Server) initializeRoutes() {

	// Login Route
	s.Router.HandleFunc("/login", middlewares.SetMiddlewareJSON(s.Login)).Methods("POST")

	//Users routes
	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.CreateUser)).Methods("POST") // done
	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.GetUsers)).Methods("GET") // done
	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareJSON(s.GetUser)).Methods("GET")	// done
	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.DeleteUsers)).Methods("DELETE") // done

	//Wallet routes
	s.Router.HandleFunc("/wallet/{id}", middlewares.SetMiddlewareJSON(s.CreateWallet)).Methods("POST") // done
	s.Router.HandleFunc("/wallet/{id}", middlewares.SetMiddlewareJSON(s.DeleteWallets)).Methods("DELETE") // done
	s.Router.HandleFunc("/block/{id}", middlewares.SetMiddlewareJSON(s.BlockWallets)).Methods("POST") // done

	//Transaction routes
	s.Router.HandleFunc("/credit/{id}", middlewares.SetMiddlewareJSON(s.Credit)).Methods("POST") // done
	s.Router.HandleFunc("/debit/{id}", middlewares.SetMiddlewareJSON(s.Debit)).Methods("POST") // done

}