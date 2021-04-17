package views

import "time"

type CreateUserRes struct {
	Name string `json:"name"`
	Username string `json:"username"`
	Age int64 `json:"age"`
	Contact string`json:"contact"`
	KycDetails string `json:"kyc_details"`
}
type CreateWalletRes struct {
	WalletName 			string			`json:"wallet_name"`
}

type Wallets struct {
	WalletName 			string			`json:"wallet_name"`
	WalletBalance 		float64			`json:"wallet_balance"`
	IsActive 			int64			`json:"is_active"`
}

type SignInRes struct {
	Wallets []Wallets
	Uid     string
}


type GetUsersRes struct {
	Uid string `json:"uid"`
	Name string `json:"name"`
	Username string `json:"username"`
}


type ReportRes struct {
	Uid					string 			`json:"uid"`
	Username 			string			`json:"username"`
	WalletName			string			`json:"wallet_name"`
	TransactionID 		string 			`json:"transaction_id"`
	Amount 				float64			`json:"amount"`
	TransactionType 	string			`json:"transaction_type"`
	TransactionTime		time.Time		`json:"transaction_time"`
}