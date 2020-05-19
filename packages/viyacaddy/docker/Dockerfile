FROM node:13.8.0-alpine3.11
LABEL maintainer="deva.kumar@sas.com"
RUN apk add --no-cache --upgrade bash
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 8080
RUN npm install
#
# You can override these(but in container leave APPHOST as shown below)
# 

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV CLIENTID=sas.ec
ENV CLIENTSECRET=
CMD ["npx", "@sassoftware/viyacaddy"]