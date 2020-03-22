# to-do-app (Work in Progress)

This is a simple to-do app as a practice using React, Redux, Express, MongoDB, Docker and TypeScript.

The frontend is based on [this example](https://redux.js.org/basics/basic-tutorial/), and I'd like to add some more features.


## Getting Started

Clone this repository:

```
$ git clone git@github.com:Pick1a1username/to-do-app.git
```


Move to the directory:

```
$ cd to-do-app
```


Checkout development branch:

```
$ git checkout development
```


Build a docker image for preparing the database:

```
$ cd src/db-helper
$ docker build -t pymongo:0.1 .
$ cd ../
```


Install the packages for the apps:

```
(WIP)
```


Create `.env.development.local` for the frontend:

```
echo 'REACT_APP_BACKEND_URL=http://localhost:3000/todo' > frontend/todo-frontend/.env.development.local
```


Run docker services:

```
$ docker-compose -f docker/docker-compose-dev.yaml up -d
```


Access to the frontend:

```
http://localhost:4000
```
