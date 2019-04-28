package main

import (
	"encoding/json"
  _ "fmt"
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

	if service == "any" {
    var available results
    shelters := make([]overview, top)
    food := make([]overview, top)
    transport := make([]overview, top)
    medical := make([]overview, top)

    // fill shelters, food, transport, and medical
    stmtfood, err := db.Prepare("SELECT s.serviceID, s.type, p.providerName FROM services s JOIN provider p ON s.providerID = p.providerID WHERE s.type='food';")
    if err != nil {
      panic(err)
    }

    foodRow, _ := stmtfood.Query()

    for i:=0;i<top;i++ {
      foodRow.Next()
      foodRow.Scan(&food[i].Id, &food[i].Service, &food[i].Name)
    }

    stmtshelters, err := db.Prepare("SELECT s.serviceID, s.type, p.providerName FROM services s JOIN provider p ON s.providerID = p.providerID WHERE s.type='shelter';")
    if err != nil {
      panic(err)
    }

    shelterRow, _ := stmtshelters.Query()

    for i:=0;i<top;i++ {
      shelterRow.Next()
      shelterRow.Scan(&shelters[i].Id, &shelters[i].Service, &shelters[i].Name)
    }

    stmtMedical, err := db.Prepare("SELECT s.serviceID, s.type, p.providerName FROM services s JOIN provider p ON s.providerID = p.providerID WHERE s.type='medical';")
    if err != nil {
      panic(err)
    }

    medicalRow, _ := stmtMedical.Query()

    for i:=0;i<top;i++ {
      medicalRow.Next()
      medicalRow.Scan(&medical[i].Id, &medical[i].Service, &medical[i].Name)
    }

    stmtTransport, err := db.Prepare("SELECT s.serviceID, s.type, p.providerName FROM services s JOIN provider p ON s.providerID = p.providerID WHERE s.type='transport';")
    if err != nil {
      panic(err)
    }

    transportRow, _ := stmtTransport.Query()

    for i:=0;i<top;i++ {
      transportRow.Next()
      transportRow.Scan(&transport[i].Id, &transport[i].Service, &transport[i].Name)
    }

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


    // fill available
    stmt, err := db.Prepare("SELECT s.serviceID, s.type, p.providerName FROM services s JOIN provider p ON s.providerID = p.providerID WHERE s.type=?;")

    rows, err := stmt.Query(service)
    if err != nil {
      panic(err)
    }

    available := make([]overview, top)

    for i:=0;rows.Next();i++ {
      rows.Scan(&available[i].Id, &available[i].Service, &available[i].Name)
    }

    jsonbytestr, err = json.Marshal(available)
    if err != nil {
      panic(err)
    }

  }

  return string(jsonbytestr)

}

// Get more information about a specific resource
func getProvider(id string) string {

  var provider provider

  stmtProvider, err := db.Prepare("SELECT providerID, providerName, geoLocation, physicalAddress, phone, email, website FROM provider WHERE providerID = ?")
  if err != nil {
    panic(err)
  }
  rows, err := stmtProvider.Query(id)
  if err != nil {
    panic(err)
  }

  rows.Next()
  rows.Scan(&provider.Id, &provider.Name, &provider.Coords, &provider.Address, &provider.Phone, &provider.Email, &provider.Website)

	dat, err := json.Marshal(provider)
  if err != nil {
    panic(err)
  }

  return string(dat)
}
