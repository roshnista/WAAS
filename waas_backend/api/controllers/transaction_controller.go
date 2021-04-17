package controllers

import (
	"bitbucket.org/waas_pro/api/models/impl"
	"encoding/csv"
	"fmt"
	"github.com/mileusna/crontab"
	"log"
	"os"
	"strconv"
	"time"
)

func (server *Server) Report() {
	ctab := crontab.New()

	// AddJob and test the errors
	err := ctab.AddJob("0 9 * * *", server.cronReport) // everyday at 9 AM

	if err != nil {
		log.Fatal(err)
		return
	}
}


func (server *Server) cronReport() {
	res, err := impl.GenerateReport(server.DB)
	if err != nil {
		log.Fatal(err)
	}
	e := os.Remove("report.csv")
	if e != nil {
		log.Fatal(e)
	}
	filename := "report.csv"
	file, e := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if nil != e {
		fmt.Printf("Open file '%s' failed: %s\n", filename, e)
		os.Exit(1)
	}

	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	for _, row := range res {

		a := []string{}
		a = append(a, row.Uid, row.Username, row.WalletName, row.TransactionID, strconv.FormatFloat((row.Amount), 'f', 2, 64), row.TransactionType)
		err := writer.Write(a)
		checkError("Cannot write to file", err)
	}

	fmt.Println("Updated report at: ", time.Now())

}
func checkError(message string, err error) {
	if err != nil {
		log.Fatal(message, err)
	}
}
