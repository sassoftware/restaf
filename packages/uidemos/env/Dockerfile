FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./

COPY . .
RUN npm install

EXPOSE 8080


ENV APPNAME=viyaapp
ENV APPLOC=./public
ENV APPENV=./env/appenv.js

#
# APPHOST - Leave this as specified belowm and override in the env file with the following value.
#  *      = sets it to the hostname of where this code is runnning
#  string = set the APPHOST directly(like http://a.b.com or to its ip like http://10.0.0.1
#  use util/myip.js to find your current ip address.

ENV APPHOST=0.0.0.0

# If APPPORT is not specified APPPORT will be set to the value of EXPOSE
# 

# ENV APPPORT=8080

# SAS_SSL_ENABLED=NO
# PEMFILE=<your pem file if SAS_SSL_ENABLED=YES>





CMD ["npm", "run", "indocker"]




