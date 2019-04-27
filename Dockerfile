FROM golang:1.8.5-jessie
LABEL maintainer="Jake Petersen <jpeter17@uoregon.edu>"
WORKDIR /go/src/app
ADD src src
ADD public public
EXPOSE 8080
CMD [ "./src/src"]