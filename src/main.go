package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting webserver")
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("/api/v1", handleGetVersion)

	// Resources
	// http.HandleFunc("/api/v1/shelter/submit", handleShelter)
	// http.HandleFunc("/api/v1/food/submit", handleFood)
	// http.HandleFunc("/api/v1/medical/submit", handleMedical)
	// http.HandleFunc("/api/v1/transport/submit", handleTransport)

	const PORT string = "8080"
	log.Fatal(http.ListenAndServe(":"+PORT, nil))
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
