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

RUN npm install -g @sassoftware/restaf-server
COPY ./build ./public
# COPY ./start.sh ./start.sh
COPY ./appenv.js ./appenv.js

EXPOSE 8080

#
# You can override these(but in container leave APPHOST as shown below)
# Comment out APPPORT before running in docker container and use port redirection of docker

ENV APPHOST=0.0.0.0
# ENV APPPORT=8080
ENV APPNAME=viyademo

CMD ["npx", "@sassoftware/restaf-server]

`;
    return code;
};