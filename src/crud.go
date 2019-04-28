package main

import (
	_ "encoding/json"
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
	if service == "any" {

	}


	return "{}"
}

// Get more information about a specific resource
func getProvider(id string) string {

	return "{}"
}
