package main

import (
  "io"
  "net/http"
)

func handleSubmit(w http.ResponseWriter, r *http.Request) {
  io.WriteString(w, "{Json here}")
}
