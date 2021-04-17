package logging

import (
	"github.com/sirupsen/logrus"
	"log"
	"os"
)

type StandardLogger struct {
	*logrus.Logger
}

func NewStandardLogger() Logger {
	var baseLogger = logrus.New()
	var standardLogger = &StandardLogger{baseLogger}
	//standardLogger.Formatter = &logrus.JSONFormatter{}
	return standardLogger
}

func (logger *StandardLogger) Debug(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Debug(arg)

}

func (logger *StandardLogger) Info(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Info(arg)

}

func (logger *StandardLogger) Warn(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Warning(arg)

}

func (logger *StandardLogger) Error(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Error(arg)

}

func (logger *StandardLogger) Fatal(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Fatal(arg)

}

func (logger *StandardLogger) Panic(arg string, logTag string) {

	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Panic(arg)

}

func (logger *StandardLogger) FileInfo(arg string, logTag string) {
	file, err := os.OpenFile("logrus.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		log.Fatal(err)
	}
	 defer file.Close()

	logger.SetOutput(file)
	logger.WithFields(logrus.Fields{
		"tag": logTag,
	}).Info(arg)

}
