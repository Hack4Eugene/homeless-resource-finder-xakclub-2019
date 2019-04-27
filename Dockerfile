FROM golang:1.8.5-jessie
LABEL maintainer="Jake Petersen <jpeter17@uoregon.edu>"
WORKDIR $GOPATH/src/app
ADD src src
CMD [ "go", "run", "src/main.go"]