# city-bikes

## _Real Time and Re-play bike stations data_

## Prod url

[City Bikes Deploy, Click Me!](http://citybikes-env.eba-er8znpuk.us-east-1.elasticbeanstalk.com/)

## Summary

This app has been deployed to AWS platform using AWS Elastic Beanstalk service.
The projects has development and production workflow.

(This is how I like to work on a fullstack app)

There is a docker set up for dev mode. To set up the project locally, run the following command:

```sh
docker-compose -f docker-compose-dev.yml up --build
```

In dev environment there is a nginx server as entry point
that will distribute the requests betwenn the dev react server and the api server.

You can check the Docekerfile.dev files used for development.

In production we use a different set of docker files ( Dockerfile ) and run the react app and api in prod mode.

## CI/CD

The project implements continous integration and deployment through Travis service.
When a pull request is created Travis will build the docker images and run tests.

When a pull request is merged to _main_ only branch Travis will build images, run tests
and if tests are successfull the images are deployed to Docker Hub and the AWS deploy begins.

AWS Beanstalk has a docker environment set up that will pull the images from Docker Hub and create the services.
The configuration is read drom docker-compose.yml.

## Features

- The idea of this proyect is not only implement the requested features, like using socket io to serve bike stations data in real time
  but also provide a real workflow for softwate development and a _solid architecture_ that will scale for real.

- Some patterns like dependency inyection container and factory functions are implemented in the backend code and others like custom hooks,
  theme provider for design system and context provider are implemented in the frontend.

- This proyect also uses a _redis_ instance as a message broker adapter for socket io.

- If scaling the application to multiple socket io servers were necessary, that wouldn't be a problem because socket io will use redis to distribute the events.
  Redis data structures are also used to implement

- In development we have the exact same infrastructure than aws production set up. We use nginx and redis images.
  This way we reduce the differences between environments and as a result the number of bugs.

- Because we are using ENV vars for config settings, in production the requests are made every 5 seconds while in developmen each 10 seconds.
