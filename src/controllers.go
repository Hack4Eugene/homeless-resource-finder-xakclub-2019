package main

import (
	"io"
	"net/http"
	"strings"
)

func handleSubmit(w http.ResponseWriter, r *http.Request) {
	sex := r.PostFormValue("gender")
	age := r.PostFormValue("age")
	vet := r.PostFormValue("veteran")
	family := r.PostFormValue("family")
	service := r.PostFormValue("service")
	// top := r.PostFormValue("top")

	io.WriteString(w, getAvailable(service, sex, age, vet, family))
}

func handleGetProvider(w http.ResponseWriter, r *http.Request) {
	id := strings.Split(r.URL.Path, "/")[4]

	io.WriteString(w, getProvider(id))
}
