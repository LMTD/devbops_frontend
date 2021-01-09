# Devbops Frontend Repo

## Installed Packages

- Axios: HTTP requests
- Material-UI: to maintain constant style
- React-hook-form: to validate the forms across the different components
- Redux: to store user data and allow different components to access to it
- React-Router-DOM: to render different components based on the routes

## Start This Project On Development Evironment

- clone this project through `git clone`
- switch to `development` branch by: `git checkout development`
- create your own branch if want to update: `git checkout -b <name-of-your-branch>`
- run `npm install` to install all required packages
- run `npm start` to start the development environment

## Production Environment

- create the docker image based on the docker file: `docker image build -f Dockerfile.prod -t devbops:prod .`
- run the container: `sudo docker run -d -p 3000:80/tcp devbops:prod`
