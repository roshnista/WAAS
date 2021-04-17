package errorhandling

import "net/http"

type ErrorCode int

const (
	ErrorInvalidProductIDPassed = 4001

	ErrorInvalidCountryCodePassed = 4002

	ErrorInvalidInputPassed = 4003 //-----

	ErrorInvalidUserIDPassed = 4004 //-----

	ErrorInsufficientWalletBalance = 4005

	ErrorPaysiNotifyFailure = 4006

	ErrorPaysiPaymentMethodFailure = 4007

	ErrorInactiveWallet = 4008

	ErrorMultipleRequestFound = 4019

	ErrorUnAuthorized = 4020

	ErrorSendingNotification = 4021

	ErrorBillDetailsNotFound = 4026

	ErrorBillTransactionNotFound = 4027

	ErrorBillListingNotFound = 4028

	ErrorPaysiUserFlagFailure = 4029

	ErrorCriticalLogicFailure = 5001

	ErrorDBUpdateFailure = 5002

	ErrorDBFetchFailure = 5003

	ErrorDBInsertFailure = 5004

	ErrorDecimalConversion = 5005

	ErrorDBConnectionFailure = 5006

	ErrorDBTableCreateFailure = 5007 //my

	ErrorWalletsLimitReached = 5008

	ErrorWalletAlreadyExists = 5009

	ErrorRedisLock = 4024

	ErrorGrabIDMissing = 4025

	ErrorReconFailure = 4030

	ErrorSqsPushFailure = 4031

	ErrorUserDoesNotExist = 4032

	ErrorInternalServer = 4033

	ErrorTransactionAmount = 4034

	ErrorUnmarshalFailure     = 4035
	ErrorHashPassword         = 4036
	SuccessResponse           = 1000
	ErrorJwtTokenParsing      = 4037
	ErrorRequestFailed        = 4038
	ErrorRequestPending       = 4039
	ErrorGettingLock          = 4040
	ErrorMessageIdCheckFailed = 4041
)

var MapErrorCodeToStatusCode = map[int]int{
	ErrorCriticalLogicFailure:      http.StatusInternalServerError,
	ErrorDBUpdateFailure:           http.StatusInternalServerError,
	ErrorDBFetchFailure:            http.StatusInternalServerError,
	ErrorDBInsertFailure:           http.StatusInternalServerError,
	ErrorInternalServer:            http.StatusInternalServerError,
	ErrorInvalidInputPassed:        http.StatusBadRequest,
	ErrorInvalidUserIDPassed:       http.StatusBadRequest,
	ErrorInvalidCountryCodePassed:  http.StatusBadRequest,
	ErrorInvalidProductIDPassed:    http.StatusBadRequest,
	ErrorWalletsLimitReached:		http.StatusBadRequest,
	ErrorWalletAlreadyExists:		http.StatusBadRequest,
	ErrorInsufficientWalletBalance: http.StatusInternalServerError,
	ErrorPaysiNotifyFailure:        http.StatusInternalServerError,
	ErrorMultipleRequestFound:      http.StatusConflict,
	ErrorUnAuthorized:              http.StatusConflict,
	ErrorSendingNotification:       http.StatusInternalServerError,
	SuccessResponse:                http.StatusOK,
	ErrorRedisLock:                 http.StatusInternalServerError,
	ErrorGrabIDMissing:             http.StatusBadRequest,
	ErrorPaysiPaymentMethodFailure: http.StatusInternalServerError,
	ErrorBillDetailsNotFound:       http.StatusNotFound,
	ErrorBillTransactionNotFound:   http.StatusNotFound,
	ErrorBillListingNotFound:       http.StatusNotFound,
	ErrorDecimalConversion:         http.StatusInternalServerError,
	ErrorReconFailure:              http.StatusInternalServerError,
	ErrorSqsPushFailure:            http.StatusInternalServerError,
	ErrorPaysiUserFlagFailure:      http.StatusInternalServerError,
	ErrorTransactionAmount:         http.StatusBadRequest,
	ErrorUserDoesNotExist:          http.StatusNotFound,
	ErrorUnmarshalFailure:          http.StatusFailedDependency,
	ErrorHashPassword:              http.StatusInternalServerError,
	ErrorDBTableCreateFailure:      http.StatusBadRequest,
	ErrorJwtTokenParsing:           http.StatusBadRequest,
	ErrorRequestFailed:             http.StatusInternalServerError,
	ErrorRequestPending:            http.StatusProcessing,
	ErrorGettingLock:               http.StatusInternalServerError,
	ErrorMessageIdCheckFailed:      http.StatusBadRequest,
}

var MapErrorCodeToErrorMessage = map[int]string{
	ErrorCriticalLogicFailure:      "CreditLineErrorCriticalLogicFailure",
	ErrorDBUpdateFailure:           "Error: DB Update Failure",
	ErrorDBFetchFailure:            "Error: DB Fetch Failure",
	ErrorDBInsertFailure:           "Error: DB Insert Failure",
	ErrorDBConnectionFailure:       "Error: DB Connection Failure",
	ErrorInvalidInputPassed:        "Error: Invalid Input Passed",
	ErrorInsufficientWalletBalance: "Error: Insufficient Wallet Balance",
	ErrorInvalidProductIDPassed:    "Error: Invalid Product ID",
	ErrorInvalidCountryCodePassed:  "InvalidCountryCodePassed",
	ErrorInvalidUserIDPassed:       "InvalidUserIDPassed",
	ErrorPaysiNotifyFailure:        "NotifyFailed",
	ErrorMultipleRequestFound:      "MultipleRequestFound",
	ErrorUnAuthorized:              "Unauthorized",
	ErrorSendingNotification:       "FailedToSendNotification",
	SuccessResponse:                "RequestSuccessful",
	ErrorRedisLock:                 "RedisLockFailure",
	ErrorGrabIDMissing:             "GrabIDMissing",
	ErrorPaysiPaymentMethodFailure: "PaysiPaymentMethodFailed",
	ErrorBillDetailsNotFound:       "BillDetailsNotFound",
	ErrorDecimalConversion:         "ErrorDecimalConversion",
	ErrorBillTransactionNotFound:   "ErrorBillTransactionNotFound",
	ErrorBillListingNotFound:       "ErrorBillListingNotFound",
	ErrorReconFailure:              "ErrorReconFailure",
	ErrorSqsPushFailure:            "ErrorSqsPushFailure",
	ErrorPaysiUserFlagFailure:      "ErrorPaysiUserFlagFailure",
	ErrorTransactionAmount:         "Error: Invalid Transaction Amount",
	ErrorUserDoesNotExist:          "Error: User Does Not Exist",
	ErrorInternalServer:            "Error: Internal Server Error",
	ErrorUnmarshalFailure:          "Error: Unmarshal Failure",
	ErrorHashPassword:              "ErrorHashingPassword",
	ErrorDBTableCreateFailure:      "Error: DB Table Create Failure",
	ErrorJwtTokenParsing:           "Error: Parsing Jwt Token Error",
	ErrorRequestFailed:             "Error: Request Failed",
	ErrorRequestPending:            "Error: Request Pending",
	ErrorGettingLock:               "Error: Error Getting Lock",
	ErrorMessageIdCheckFailed:      "Error: MessageId Check Failed",
	ErrorWalletsLimitReached:		"Error: Wallets Limit Reached",
	ErrorWalletAlreadyExists:		"Error: Wallet Already Exists",
}
