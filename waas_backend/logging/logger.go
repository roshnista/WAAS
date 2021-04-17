package logging

type Logger interface {
	Debug(msg string, logTag string)
	Info(msg string, logTag string)
	Warn(msg string, logTag string)
	Error(msg string, logTag string)
	Fatal(msg string, logTag string)
	Panic(msg string, logTag string)
}
