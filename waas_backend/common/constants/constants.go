package constants

const (
	EmptyString  =       ""
	Success            = "success"
	Failed             = "failed"
	Pending            = "pending"
	HealthCheckSuccess = "Health check successful"
	HealthCheckFailed  = "Health check failed"
	Unauthorized       = "unauthorized"
	Welcome            = "Welcome to Wallet as a service API"

	ReqUserName        = "Username required"
	ReqKycDetails      = "kycdetails required"

	UserDeleted        = "User deleted"
	AmountCredited	   = "Amount Credited"
	AmountDebited	   = "Amount Debited"
    WalletsDeleted     = "Selected wallets deleted"
    WalletsBlocked     = "Selected wallets blocked"
	//login
    UsernameNotFound      = "Username doesn't exist"

	// LogTags
	ServerLogTag         = "server.go"
	ServerBaseLogTag     = "server_base.go"
	ControllerBaseLogTag = "controller_base.go"

	Port     = ":8080"
	Mysql    = "mysql"
	MysqlURL = "%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True"

	ServerConnectedMsg   = "we are connected to the database"
	ErrorWrongEngineName = "Error: Engine name is not Mysql."
)