# Z-Jobs
WORK IN PROGRESS

Applicant tracking system - demo, showcase project

## Project Structure

```./infrastructure``` directory with docker composer configuration and sample polyfill data   
```./packages/api``` GraphqQL Api webserver   
```./packages/web``` GraphqQL WEB client   

## How to run

### Prerequisites
You should have installed next software  
[Docker](https://www.docker.com)
[Docker](https://www.docker.com)
[Docker-compose](https://docs.docker.com/compose/install/)
[NodeJS](https://nodejs.org/en/) latest version
install `npx` and `lerna` packages globaly
```
 npm install -g npx lerna
```

### Run in development
1. Run PostgreSQL container
```
 cd ./infrastructure
 docker-compose up 
```
2. Install dependecies 
```
lerna bootstrap
```
3. Run the API server

```
lerna exec --scope api -- npm start
```
go to http://localhost:4000/graphql to check the GraphQL schema


4. Run client side

```
lerna exec --scope web -- npm start
```
go to http://localhost:3000/graphql to check the Client side


## Config


## Build with 
[PostgreSQL] (https://www.postgresql.org/  
[https://nodejs.org/en/] (https://nodejs.org/en/)  
[ApolloGraphql] (https://www.apollographql.com/)  
[React] (https://reactjs.org/)  