package main

import (
  "io"
  "net/http"
)

func handleSubmit(w http.ResponseWriter, r *http.Request, service string) {
  gender := r.PostFormValue("gender")
  age := r.PostFormValue("age")
  vet := r.PostFormValue("veteran")
  family := r.PostFormValue("family")

  io.WriteString(w, getAvailable(service, gender, age, vet))
}

func handleShelter(w http.ResponseWriter, r *http.Request) {
  handleSubmit(w, r, "shelter")
}

func handleFood(w http.ResponseWriter, r *http.Request) {
  handleSubmit(w, r, "food")
}

func handleMedical(w http.ResponseWriter, r *http.Request) {
  handleSubmit(w, r, "medical")
}

func handleTransport(w http.ResponseWriter, r *http.Request) {
  handleSubmit(w, r, "transport")
}
