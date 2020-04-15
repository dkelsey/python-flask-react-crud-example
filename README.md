# Overview

This app was crate as an exercise. The goal was to have at least 2 components which communicate with eachother.
I looked for a basic app to use.  I wanted something with Python, Flask, and React.  I settled on a demo created by OKTA, however I didn't want to integrate with Okta so I modified it to use Keycloak.

I used the following tutorial and other listed material to construct the app:

* [Build a Simple CRUD App with Python, Flaks, and React - Kleber Correia - 2018/12/20](https://developer.okta.com/blog/2018/12/20/crud-app-with-python-flask-react)

* [Welcome to your Secure React App with Keycloak - Abhishek Koserwal - 2019/05/17](https://medium.com/keycloak/secure-react-app-with-keycloak-4a65614f7be2)

* [User Authentication with Keycloak - Part 1: React Front-End - Jakub Mikulski - 2019/02/14](https://scalac.io/user-authentication-keycloak-1/)

* [Keycloak  on Docker - Getting started with Keycload on Docker](https://www.keycloak.org/getting-started/getting-started-docker)

* [OpenShift 3.11 Dev Guide - Binary Builds](https://docs.openshift.com/container-platform/3.11/dev_guide/dev_tutorials/binary_builds.html#binary-builds-private-code)

## The App Components

* A Mongodb database

* A python/flask API 

* A React frontend that integrates with Keycloak for

* A Keacloak setup with a realm, a clent, and some users.


# Provisioning in OpenShift
#### Task Summary

1. Create ImageStreams and Secrets
2. Provision Mongodb
3. Provision the API
4. Configure a Keycloak
5. Provision the React App

## Create ImageStreams and Secrets

```bash
oc create imagestream kudo-api -n wvmyix-dev
imagestream.image.openshift.io/kudo-api created
```

```bash
oc create imagestream kudo-app -n wvmyix-dev
imagestream.image.openshift.io/kudo-api created
```

```bash
oc create  -f mongodb-secret.yaml
```


## Provision Mongodb

```bash
oc process -f mongodb-template.yaml | oc apply -f -
```

## Provision the API

_Specify your namespace both as a parm to the tempate as the namespace to use in the 'oc apply'_
```bash
oc process -f kudo-api.template.yaml -o yaml -p NAMESPACE=wvmyix-dev \
  | oc apply -f - -n wvmyix-dev
service/kudo-api created
deploymentconfig.apps.openshift.io/kudo-api created
buildconfig.build.openshift.io/kudo-api created
route.route.openshift.io/kudo-api created
```
## Configure Keycloak

TODO
_Generally:_
1. Login as admin/admin
2. Create a realm
3. Add a user to your realm
4. Add a client to your realm - for this app.
5. For the client, get the `keycloak.json` config file (Keycloak OIDC JSON) and place it in `/public` of your running node app.


## Provision the React App

TODO
you'll need to update the `keycloak.json` in the `/public` folder of your repo, commit/push and rebuild/deploy the image.

_I provided a kudo-app.env.sample that can be cusomized_
```bash
oc process -f kudo-app.template.yaml \
  --param-file=kudo-app.env \
  -o yaml \
  | oc apply -f - -n wvmyix-dev
```

# Development Environment Setup
#### Tasks Summary

1. Setup Keycloak
2. Setup Mongodb
3. Setup the API
4. Setup the React App

### The local Keycloak service

I created `bootstrap-keycloak`

```bash
docker run -ti -p 8081:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:9.0.2
```

```bash
. bootstrap-keycloak
```

#### Keycload tasks

1. Login as admin/admin
2. Create a realm
3. Add a user to your realm
4. Add a client to your realm - for this app.
5. For the client, get the `keycloak.json` config file (Keycloak OIDC JSON) and place it in `/public` of your running node app.

### The local Mongodb

* This requires `docker-compose`

```yaml
version: '3'
services:
  mongo:
    image: mongo
    restart: always
    ports:
     - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongo_user
      MONGO_INITDB_ROOT_PASSWORD: mongo_secret
```

* run mogo detached

```bash
docker-compose up -d
```

### The Python/Flask API

* add Mongo connections info to environment
  * The original instructions had this step.  I've added it to a `bootstrap-app` script instead, but showeing this here so that it's clear the `MONGO_URL`must be set.

```bash
export MONGO_URL=mongodb://mongo_user:mongo_secret@0.0.0.0:27017/
```

* I use **pyenv** and created a python 3.8.2 env.

```bash
pyenv activate KUDO
KUDO> pip install -r requirements.txt
```

I created a **`bootstrap-app`**

```bash
MONGO_URL=mongodb://mongo_user:mongo_secret@0.0.0.0:27017/ \
 FLASK_APP=$PWD/app/http/api/endpoints.py \
 FLASK_ENV=development \
 python -m flask run --port 4433
```

```bash
. bootstrap-app
```
### The React App

```bash
cd app
npm install
...
HOST=localhost PORT=8080 npm start
```

