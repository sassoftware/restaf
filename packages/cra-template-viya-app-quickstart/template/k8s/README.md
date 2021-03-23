# Configuration files for viyaapp 

---

**World of docker**

---

### `Dockerfile`

Make your Dockerfile look like this:

```docker
FROM node:12.16.1-alpine
LABEL maintainer="your-email"
WORKDIR /usr/src/app
# COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080
ENV APPPORT=8080

# will change to localhost in non-docker environments
ENV APPHOST=0.0.0.0

ENV APPLOC=./public
ENV APPENTRY=index.html

##########################
# TLS Setup
##########################

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV SAMESITE=None,secure

#####################################################################

CMD ["npm","run", "indocker"]
```

## `.env file`

Recommend using .env as the name for the env file. Replace the values to match your setup. 

The combination of specifying https protocol for the VIYA_SERVER and the presence of the TLS_CREATE will result in your app server running with SSL.

```env
# APPHOST = localhost | dns name of the server(ex: acme.unx.sas.com) | * to use hostname
# APPNAME is thename of your apiserver
VIYA_SERVER=https://your-viya-url
APPHOST=localhost
APPNAME=viyaapp
APPPORT=8080
CLIENTID=apicom
CLIENTSECRET=secret
TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost"
```

## `A note on TLS`

In the default setup the TLS_CREATE option causes the server to create a temporary self-signed certificate. You can also specify signed certificates. The option are listed below.

```env
# Option 1
# ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:deptname,CN:localhost"

# Option 2
# TLS_CERT=path to cert
# TLS_KEY=path-to-key.pem
# 

# Option 3 -- useful when running in K8 (see later in this document) 
# TLS_CRT=actual-crt-string
# TLS_KEY=actual-key-string

# Option 4
# TLS_PFX=../certs/sascert/sascert2.pfx
# TLS_PW=rafdemo

```

### A note for Viya 20.x

In Viya 20.x it is easy to get the certificate and key from the Viya and use it in your env file ( option 2)
Use these commands to get the certicate and use the tls.crt and tls.key in the env file(option2).

```sh
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/ca.crt ./ca.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.crt ./tls.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.key ./tls.key
```

## docker-compose file

Use the docker-compose.yml file to run the app in docker. Modify the values to suit your needs.

```docker
version: "3.3"
services:
  viyaapp:
      build: .
      restart: always
      ports:
        - 8080:8080
      environment:
        - VIYA_SERVER=https://viyaapp.ingress-nginx.kumar-app5-m1.stobosh.sashq-d.openstack.sas.com
        - CLIENTID=apicom
        - CLIENTSECRET=secret
        - APPNAME=viyaapp
        - TLS_CREATE=TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:deptname,CN:localhost"
```

To run the application in docker issue this command:

Recommend you add the following script to your package.json

```js
"scripts" {
   "indocker": "npx @sassoftware/viya-apiserverjs"
}
```
The to build and run the image in docker run this command:

```sh
docker-compose up
```

Once you are happy with the container, tag and publish the image to a docker repository. See the example below.


```docker
docker tag viyaapp:latst docker.sas.com/xxx/viyaapp:1.0.0
docker publish docker.sas.com/xxx/viyaapp:1.0.0
```
### Test the published image

Test the published image using the following docker-compose.yml file

```docker
version: "3.3"
services:
  viyaapp:
      image: docker.sas.com/xxxx/viyaapp:1.0.0
      restart: always
      ports:
        - 8080:8080
      environment:
        - VIYA_SERVER=https://your-viya-url
        - CLIENTID=apicom
        - CLIENTSECRET=secret
        - APPNAME=viyaapp
        - TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost"
```

---

**The world of K8**

---


> Tip: A quick way to jump start the migration to K8 is use the kompose utility to convert the docker-compose to a deployment.yaml and service.yaml. You can thend edit those files and add other configurations  <https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/>

This project use kustomize to create the final yaml files for deployment.
The config files are all in the k8s-configurations sub-directory for each of the services in this repository.

> At this point only the viyaapp service is being developed with the hope that the other services that be able to use a common base configuration.

### Some useful links
1. https://blog.stack-labs.com/code/kustomize-101


### Tips for quick adoption

The env values specified in docker-compose are not split into multiple files based on my understanding of how k8s configuation should be done.

1. base/clientFile.txt -- for clientid and clientsecret
2. configFile.txt -- information you used to specify in the .env and/or Dockerfile
3. tls-certs -- the certificate and key that was discussed earlier in this doc.


```
echo -n "string" | base64 
```

3. Create viyaapp-tls-cert.yaml - this is for the tls.key and tls.crt needed to run with SSL enabled.

The tls.crt and tls.key need to configured via a k8 secret object.(see cloud directory in this repo). See this link for information - <https://go.documentation.sas.com/?cdcId=sasadmincdc&cdcVersion=v_008&docsetId=calencryptmotion&docsetTarget=n1xdqv1sezyrahn17erzcunxwix9.htm&locale=en#n0309hwuyq56x2n17mkapfltqau6>.
 Run these commands to get tls information from your viya server

```sh
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/ca.crt ./ca.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.crt ./tls.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.key ./tls.key
```

Then convert the tls.crt and tls.key to base64 and create the yaml file.

A quick way to build the required file is to use this command
```
kubectl create secret tls tls-secret \
  --cert=path/to/cert/file \
  --key=path/to/key/file

```
## Create Deployment yaml

See  configmap.yaml for an example. 

### Pointers

1. The image you pushed to docker registry is referenced here.
2. The labels in the spec are important. This will be used by service objects to find the correct pods.
3. The tls-secret, secret and configmap we created earlier are referenced here. 



## K8 configurations

