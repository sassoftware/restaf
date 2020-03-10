FROM node:13.8.0-alpine3.11
LABEL maintainer="deva.kumar@sas.com"
RUN apk add --no-cache --upgrade bash
WORKDIR /usr/src/app
# COPY package*.json ./
COPY . .
RUN rm -r node_modules
RUN yarn install
EXPOSE 8080
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#
# You can override these(but in container leave APPHOST as shown below)
# 

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=ruthere
ENV AUTHTYPE=password
ENV CLIENTID=sas.ec
ENV USER=omitest
ENV PASSWORD=metadata1$
ENV TESTS=
ENV LOGGER=OFF
CMD ["./start.sh"]