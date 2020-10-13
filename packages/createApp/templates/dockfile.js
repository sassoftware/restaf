/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function dockfile (appName) {

    let code = `
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
ENV APPNAME=${appName}
ENV AUTHFLOW=code
ENV CLIENTID=${appName}
ENV CLIENTSECRET=secret
# ENV SAMESITE=None,secure

# TLS
# ENV HTTPS=true


# ENV DEBUG=*


CMD ["npx", "@sassoftware/restaf-server"]


`;
    return code;
};