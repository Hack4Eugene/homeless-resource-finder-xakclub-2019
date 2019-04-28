FROM mvpstudio/golang:1.12
LABEL maintainer="Jake Petersen <jpeter17@uoregon.edu>"

WORKDIR $GOPATH

ADD src src
ADD public public

WORKDIR $GOPATH/src
RUN go get github.com/go-sql-driver/mysql
RUN go build

EXPOSE 8080
USER mvp
CMD [ "./src"]