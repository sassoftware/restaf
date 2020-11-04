FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
RUN apk add --no-cache --upgrade bash
RUN apk add --no-cache --upgrade curl

WORKDIR /usr/src/app
# COPY package.json .
RUN npm install -g @sassoftware/restaf-server
COPY ./build ./public
# COPY ./start.sh ./start.sh
COPY ./appenv.js ./appenv.js


EXPOSE 8080
EXPOSE 443

#
# You can override these(but in container leave APPHOST as shown below)
# Comment out APPPORT before running in docker container and use port redirection of docker

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV AUTHFLOW=code
ENV CLIENTID=viyaapp
ENV CLIENTSECRET=secret
ENV SAMESITE=None,secure
CMD ["npx", "@sassoftware/restaf-server"]

