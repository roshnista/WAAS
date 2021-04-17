package errorhandling

import "strconv"

type Error struct {
	ErrorCode    int    `json:"error_code"`
	ErrorMessage string `json:"error_message"`
}

func CreateError(code int) *Error {
	return &Error{ErrorCode: code, ErrorMessage: MapErrorCodeToErrorMessage[code]}
}

func CreateErrorWithStatusCode(code int) (int, *Error) {
	return MapErrorCodeToStatusCode[code], &Error{ErrorCode: code, ErrorMessage: MapErrorCodeToErrorMessage[code]}
}

func (err *Error) Error() string {
	return "ErrorCode: " + strconv.Itoa(err.ErrorCode) + ", ErrorMessage: " + err.ErrorMessage + "."

}
