package views

type CreateUserReq struct {
	Name string `json:"name"`
	Username string `json:"username"`
	Age int64 `json:"age"`
	Contact string`json:"contact"`
	KycDetails string `json:"kycdetails"`
}

type LoginReq struct {
	Username string `json:"username"`
}

type DeleteUserReq struct {
	DeleteIDs []string `json:"deleteids"`
}

type CreateWalletReq struct {
	WalletName string `json:"walletname"`
}

type TransferReq struct {
	WalletName string `json:"walletname"`
	Amount float64 `json:"amount"`
}

type BlockWalletsReq struct {
	BlockNames []string `json:"blocknames"`
}

type DeleteWalletsReq struct {
	DeleteNames []string `json:"deletenames"`
}