package main

import (
	"encoding/json"
)

type overview struct {
	Name    string
	Id      string
	Service string
}

type provider struct {
	Name    string
	Phone   string
	Email   string
	Address string
	Coords  string
	Website string
	Id      string
	Service string
}

type results struct {
	Shelter   []overview
	Food      []overview
	Transport []overview
	Medical   []overview
}

// Get available resources for a person
func getAvailable(service, sex, age, vet, family string, top int) string {
  var jsonbytestr []byte
  var err error

	if service == "any" {
    var available results
    shelters := make([]overview, top)
    food := make([]overview, top)
    transport := make([]overview, top)
    medical := make([]overview, top)

    // fill shelters, food, transport, and medical

    available.Shelter = shelters
    available.Transport = transport
    available.Food = food
    available.Medical = medical
    jsonbytestr, err = json.Marshal(available)
    // remove this at one point
    if err != nil {
      panic(err)
    }

	}
  if service != "any" {
    available := make([]overview, top)

    // fill available

    jsonbytestr, err = json.Marshal(available)
    if err != nil {
      panic(err)
    }

    return string(jsonbytestr)

  }



	return "{}"
}

// Get more information about a specific resource
func getProvider(id string) string {

	return "{}"
}
