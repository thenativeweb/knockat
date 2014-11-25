package main

import (
	"github.com/docopt/docopt-go"
	"net"
	"os"
	"time"
)

func main() {
	usage := `knockat

Usage:
  knockat <host> <port>
  knockat -h | --help
  knockat --version

Options:
  -h --help     Show this screen.
  --version     Show version.`

	arguments, _ := docopt.Parse(usage, nil, true, "knockat 0.0.1", false)
	host := arguments["<host>"].(string) + ":" + arguments["<port>"].(string)

	for i := 0; i < 60; i++ {
		_, err := net.DialTimeout("tcp", host, 2*time.Second)

		if err == nil {
			os.Exit(0)
		}
	}

	os.Exit(1)
}
