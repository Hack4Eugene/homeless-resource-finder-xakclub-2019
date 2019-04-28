package main

import (
  "fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
)

func handleSubmit(w http.ResponseWriter, r *http.Request) {
	sex := r.PostFormValue("sex")
	age := r.PostFormValue("age")
	vet := r.PostFormValue("veteran")
	family := r.PostFormValue("family")
	service := r.PostFormValue("service")
	topStr := r.PostFormValue("top")

  fmt.Println(sex, age, vet, family, service)

	top, err := strconv.Atoi(topStr)
	if err != nil || top > 20 || top < 1 {
		top = 3
	}

	io.WriteString(w, getAvailable(service, sex, age, vet, family, top))
}

func handleGetProvider(w http.ResponseWriter, r *http.Request) {
	id := strings.Split(r.URL.Path, "/")[4]

	io.WriteString(w, getProvider(id))
}
