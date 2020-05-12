FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=registerclient
ENV AUTHTYPE=password
ENV CLIENTID=sas.ec
ENV USER=omitest
ENV PASSWORD=metadata1$
CMD ["npm", "run", "indocker"]