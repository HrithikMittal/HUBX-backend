# HUBX-backend


### Prerequisites

To work with the api you must have to install the following:
* [NodeJS](https://nodejs.org/en/download/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB Server](https://docs.mongodb.com/manual/installation/) - NoSql Database and server
* [Postman](https://www.getpostman.com/downloads/) - API development environment

## Installation

Before doing anything you have to clone or download(and unzip) the project folder, open terminal and navigate to the project folder and run:

```bash
npm install
```
This will install all the dependencies required by the project.

## Getting Started

To start using this API, start your local database server, open terminal and navigate to the project folder and run:
```bash
npm run start
```
If an error occur, check your database server or check if you have installed the prerequisites correctly.

If there was no error, open Postman and create and send a new get request to:

```
http://localhost:3000/
```
Expected Output: 
```
{
	message: "Welcome!"
}
```



### Postman docs: https://documenter.getpostman.com/view/5665978/SzfDx4z5?version=latest

### Add env variables before Using it

 ```
PORT=****
MONGO_URI=mongodb://*****
JWT_SECRET=******
 
 ```
