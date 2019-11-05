FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./

COPY . .
RUN npm install

EXPOSE 8080

################################################################################
# specify environment variables                                                #
# using an env file to be portable between windows and unix                    #
################################################################################
#
# Values are examples - replace them with the values appropriate for your use case
#

#
# APPNAME - the name you want the user to use to invoke it
#           For example if APPNAME is myapp then user will invoke the app as <host:port>/myapp.
#           If you are using rafserver as a proxy make sure your appname is not same as onf ot the points
#           in the  downstream server(ex: Do not name your app "reports', 'files' etc...
#
ENV APPNAME=viyaapp

#
# Location of the application resources(html, shared resources etc...)
# each APPNAME corresponds to a sub-directory directory in this location with the same name as APPNAME.
# if current directory then set APPLOC to .
#
ENV APPLOC=./public

#
# Specify the entry point
# /{name}  - a route path to redirect to on logon
# {name}   - name without a / is an asset like index.html(typical case)
# To invoke the graphql playground enter /graphql
#

#
# APPHOST - Leave this as specified below
# The service will use the hostname where rafserver is running.
#  *   = sets it to the hostname of where this code is runnning
#  *ip = sets it to the ip address of where this code is run
#  string = set the APPHOST directly(like http://a.b.com)
#  Overriding externally

ENV APPHOST=0.0.0.0

#
# The port on which this app is expected to run
# 8080 is probably taken so use any valid available port no.
#
ENV APPPORT=8080

# SAS_SSL_ENABLED=NO
# PEMFILE=<your pem file if SAS_SSL_ENABLED=YES>



ENV APPENV=./env/appenv.js

CMD ["npm", "run", "indocker"]




