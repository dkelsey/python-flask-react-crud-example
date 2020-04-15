# Overview

This app was created as an exercise. The goal was to create templates to automate the deployment of an application into OpenShift where the application has least 2 components which communicate with each other.

I looked at a few example apps and chose this one.  I wanted something with Python, Flask, and React.  I settled on the demo created by Okta, however I modified it to use Keycloak.

I used the following tutorial and other listed material to construct the app:

* [Build a Simple CRUD App with Python, Flaks, and React - Kleber Correia - 2018/12/20](https://developer.okta.com/blog/2018/12/20/crud-app-with-python-flask-react)

* [Welcome to your Secure React App with Keycloak - Abhishek Koserwal - 2019/05/17](https://medium.com/keycloak/secure-react-app-with-keycloak-4a65614f7be2)

* [User Authentication with Keycloak - Part 1: React Front-End - Jakub Mikulski - 2019/02/14](https://scalac.io/user-authentication-keycloak-1/)

* [Keycloak  on Docker - Getting started with Keycload on Docker](https://www.keycloak.org/getting-started/getting-started-docker)

* [OpenShift 3.11 Dev Guide - Binary Builds](https://docs.openshift.com/container-platform/3.11/dev_guide/dev_tutorials/binary_builds.html#binary-builds-private-code)

## The App Components

* A Mongodb database.
* A python/flask API.
* A React frontend App that integrates with Keycloak.
* A Keycloak setup with a realm, a client, and some users.


# Provisioning in OpenShift
#### Task Summary

1. Create ImageStreams and Secrets
2. Provision Mongodb
3. Provision the API
4. Configure a Keycloak
5. Provision the React App

## Create ImageStreams and Secrets

_**Note:** I'd suggest you specify the namespace with `-n`_
```bash
oc create imagestream kudo-api -n ${YOUR_NAMESPACE}
imagestream.image.openshift.io/kudo-api created
```

```bash
oc create imagestream kudo-app  -n ${YOUR_NAMESPACE}
imagestream.image.openshift.io/kudo-api created
```

_I provided a mongodb-secret.yaml.sample that can be customized._
```bash
oc create  -f mongodb-secret.yaml -n ${YOUR_NAMESPACE}
```


## Provision Mongodb

```bash
oc process -f mongodb-template.yaml | oc apply -f - -n ${YOUR_NAMESPACE}
```

## Provision the API

_Again, specify your namespace both as a param to the template as the namespace to use in the 'oc apply'_
```bash
oc process -f kudo-api.template.yaml \
  -o yaml -p NAMESPACE=${YOUR_NAMESPACE} \
  | oc apply -f - -n ${YOUR_NAMESPACE}
service/kudo-api created
deploymentconfig.apps.openshift.io/kudo-api created
buildconfig.build.openshift.io/kudo-api created
route.route.openshift.io/kudo-api created
```
## Configure Keycloak

#### _TODO_
* This needs more detail

_Generally:_
1. Login as admin/admin
2. Create a realm
3. Add a user to your realm
4. Add a client to your realm - for this app.
5. For the client, get the `keycloak.json` config file (Keycloak OIDC JSON) and place it in `/public` of your running node app.


## Provision the React App

#### _TODO_
* This needs more detail.

You'll need to update the `keycloak.json` in the `/public` folder of your repo, commit/push and rebuild/deploy the image.

_I provided a kudo-app.env.sample that can be customized. Note: the env file specifies a NAMESPACE variable._
```bash
oc process -f kudo-app.template.yaml \
  --param-file=kudo-app.env \
  -o yaml \
  | oc apply -f - -n ${YOUR_NAMESPACE}
```

# Development Environment Setup
#### Tasks Summary

1. Setup Keycloak
2. Setup Mongodb
3. Setup the API
4. Setup the React App

#### Notes
* I describe a few `bootstrap` files I've created.  These are not in the repo.  

### Setup a local Keycloak service

I created `bootstrap-keycloak`
```bash
docker run -ti -p 8081:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:9.0.2
```

```bash
. bootstrap-keycloak
```

#### Keycloak Tasks

1. Login as `admin/admin`
2. Create a realm
3. Add a user to your realm
4. Add a client to your realm - for this app.
5. For the client, get the `keycloak.json` config file (`Keycloak OIDC JSON`) and place it in `/public` of your running node app.

### Setup a local MongoDB

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

* Add Mongo connection info to environment
  * _The original instructions had this step.  I've added it to a `bootstrap-app` script instead, but showing this here so that it's clear the `MONGO_URL`must be set._

```bash
export MONGO_URL=mongodb://mongo_user:mongo_secret@0.0.0.0:27017/
```

* I use **pyenv** and created a python 3.8.2 env called `KUDO`.

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
