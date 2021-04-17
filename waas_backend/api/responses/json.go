package responses

import (
	"bitbucket.org/waas_pro/errorhandling"
	"encoding/json"
	"fmt"
	"net/http"
)

func JSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func ERROR(w http.ResponseWriter, errorCode int) {
	statusCode, err := errorhandling.CreateErrorWithStatusCode(errorCode)
	JSON(w, statusCode, err)
	return
}
