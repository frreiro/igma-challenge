<div align="center" >
  <img width="150px" src="" alt="igma-logo" width="400">
  <br>
  <br>
  <h1>IGMA - Challenge</h1>
</div>

## 📝 Description

This challenge consists in create an REST API to create and retrieve Users.
Each user has the following data structure.

```js
	- name
	- cpf
	- birthday
```

## 🚀 Technologies

- [Nest.js](https://nestjs.com/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Eslint](https://eslint.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)


## 🚀 Deploy

This project is deployed on [Render](https://render.com/) clound, and can be connected and tested using the following link: 
`https://igma-challenge.onrender.com`

Disclaimer: The first request is a little longer than others. It happen because the server automatically spun down after 15 minutes of inactivity, and then the first request "wakes up" the server.  See more information [here](https://render.com/docs/free)


In case you want to install and test the application locally follow the next steps


## 📦 Installation

Clone the repository.

```bash
# https
$ git clone https://github.com/frreiro/igma-challenge
# ssh
$ git clone git@github.com:frreiro/igma-challenge.git
```

Install the dependencies.

```bash
$ cd igma-challenge && npm install
#or
$ cd igma-challenge &&  yarn
```

## 🚀 Usage

This project required three enviroments files
 - .env
 - .env.docker
 - .env.test

To create those enviroments, just follow the instructions in the following files:

- .env.example
- .env.docker.example
- .env.test.example


### Development mode

To run the project in development mode, create a `.env` file based on the `.env.example` file and run the following command:

```bash
$ npm run start:dev
#or
$ yarn run start:dev
```
Make a request for `http://localhost:<PORT>/<ROUTE>`, `PORT` was defined by you in `.env` and `ROUTE` see [below](#🔀-routes) for more informations 

### Docker mode

To run the project in docker mode, create a `.env.docker` file based on the `.env.docker.example` file and run the following command:

```bash
$ npm run docker:up
#or
$ yarn run docker:up
```

Make a request for `http://localhost:<PORT>/<ROUTE>`, `PORT` was defined by you in `.env` and `ROUTE` see [below](#🔀-routes) for more informations 
### Tests mode

To run the tests of the project in docker, create a `.env.test` file based on the `.env.test.example` file and run the following command:

```bash
$ npm run docker:up:test
#or
$ yarn run docker:up:test
```

## 📌 Features

- [x] Create user
- [x] Read all users
- [x] Read all users by `page`
- [x] Read users by `cpf`

## 🔀 Routes

- **POST** `/users` - Create a new User
	
  - headers: default
  - body:
	```json
	{
		"name": "yourname",
		"cpf": "XXXXXXXXXDD",
		"birthday": "YYYY-MM-DDTHH:mm:ss",
	}
	```

	Thoses three types of body cpf property are accepted:

  	| property | type | example | obligation | 
  	| :---:  | :---: | :---: | :---: |
 	| `cpf`  | `number` | 12345678910 | [must be a valid cpf](CPFVALIDATE.md) | 
 	| `cpf`  | `string` | '123.456.789-10' | [must be a valid cpf](CPFVALIDATE.md) | 
 	| `cpf`  | `string` | '12345678910' | [must be a valid cpf](CPFVALIDATE.md) | 


  - response:
	```json
		{
			"id": 0,
			"name": "yourname",
			"cpf": "XXXXXXXXXDD",
			"birthday": "YYYY-MM-DDTHH:mm:ss",
		}
	``` 

	

- **GET** `/users` - Get all users, limit 5 users by page
  
    | Query Params | type | value | Description | 
  	| :---:  | :---: | :---: | :---: |
	| none  | none | null | first page | 
	| `page`  | `number` | 0 |first page | 
	| `page`  | `number` | 1 | first page | 
 	| `page`  | `number` | > 1 | pagination | 
	
  - headers: default 
  - body: none
  - response:
	```json
	[
		{
			"id": 0,
			"name": "yourname",
			"cpf": "XXXXXXXXXDD",
			"birthday": "YYYY-MM-DDTHH:mm:ss",
		}
	]
	```


- **GET** `/users/:cpf` - Get user by cpf
  
  - headers: default 
  - body: none
  - response:
	```json
	{
		"id": 0,
		"name": "yourname",
		"cpf": "XXXXXXXXXDD",
		"birthday": "YYYY-MM-DDTHH:mm:ss",
	}
	```
- **GET** `/health` - Get API health
    - headers: 
    - body: none
    - response: `OK`

## 💽 Database

This project uses a [PostgreSQL](https://www.postgresql.org/) database.
- **Database name:** `igmadb`
- **`Tables`:**
  - **`users`:** Stores all users