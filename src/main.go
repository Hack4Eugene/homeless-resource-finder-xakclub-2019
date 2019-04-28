package main

import (
	"database/sql"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	fmt.Println("Starting webserver")
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("/api/v1", handleGetVersion)

	// dbConnect()
	// Resources
	http.HandleFunc("/api/v1/submit", handleSubmit)
	http.HandleFunc("/api/v1/info/", handleGetProvider)

	const PORT string = "8080"
	log.Fatal(http.ListenAndServe(":"+PORT, nil))

}

func dbConnect() {
	// Create the database handle, confirm driver is present
	user := os.Getenv("DATABASE_USER")
	host := os.Getenv("DATABASE_HOST")
	pass := os.Getenv("DATABASE_PASSWORD")
	db, err := sql.Open("mysql", user+":"+pass+"@tcp("+host+")/HomelessResources")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	// Connect and check the server version
	var version string
	err = db.QueryRow("SELECT VERSION()").Scan(&version)
	if err != nil {
		panic(err)
	}
	fmt.Println(version)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	// Get path, make changes if needed
	filename := r.URL.Path

	if filename[len(filename)-1] == '/' {
		filename += "index.html"
	}

	// remove need to append .html to URL
	if filename == "/404" {
		filename += ".html"
	}

	http.ServeFile(w, r, "public"+filename)
}

func handleGetVersion(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "API Version 0.1")
}
