FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
RUN apk add --no-cache --upgrade bash
RUN apk add --no-cache --upgrade curl

WORKDIR /usr/src/app
COPY package.json .
RUN npm install @sassoftware/viya-appserverjs@next
COPY ./build ./public
# COPY ./start.sh ./start.sh
COPY ./appenv.js ./appenv.js
COPY ./server.js ./server.js

ENV APPHOST=0.0.0.0
EXPOSE 8080

#############################################################################
# You can override these in .env file| docker--co,mpose fle| k8s config files
#############################################################################

ENV APPNAME=reactapp
ENV AUTHFLOW=code
# The following are buitin defaults
# ENV APPLOC=./public
# ENV APPENTRY=index.html -- since we are overriding this thru cross-env
# if your app takes advantage of appenv.js to pass configuration to the web application 
# ENV APPENV=appenv.js 
# Better to use the customize function in app.js


ENV SAMESITE=None,secure
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#
# This is the default if no other ssl information is provided.
# Better to provide your own.
#
ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:Myco,OU:STO,CN:localhost"


#####################################################################
CMD ["npm", "run", "indocker"]