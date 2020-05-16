# App Financial System

This project is a compilation of **financial formulas** led to the code to present an interface where they are put into practice several of the formulas that we can find for **financial calculation**.

In the formulas we find:

- interest rate conversion.
- value equations.
- annuities.

This project contains the Back End for the application if you wish to review the Front End please visit: [Financial System FrontEnd Repositorie](https://github.com/danielmillan/financialsystem)

# Acces to API

You can find the **online version API** of the repository at: [API](https://us-central1-financial-system-ecci.cloudfunctions.net/api)

Additional API documentation can be found at: [https://ecci-financial-system.herokuapp.com/api](https://financial-system-ecci.web.app/api)

# Installation

This project is available for use under the **MIT license**. Below is the information you must follow to install the project on your machine.

## Dependencies

This package needs as a **dependency the BackEnd service working**, so make sure that before using the package's functionalities you have correctly configured your BackEnd server.

After this the necessary **packages** are:

| Package| url| version	|
| ------ | ------ | ------ |
| Node| [https://nodejs.org/es/download/](https://nodejs.org/es/download/) | ^12.14.1	|
| Firebase| [https://firebase.google.com/docs?authuser=0](https://firebase.google.com/docs?authuser=0) | ^8.0.0	|

### CLI commands

To download and install the project, follow the steps below:

```sh
$ git clone https://github.com/danielmillan/financialsystem-backend.git
$ cd financialsystem-backend
$ npm install -d
$ firebase init (Init your app whit your firebase credentials)
$ firebase serve
```
# Deployment
This project is based on a [Firebase Functions](https://firebase.google.com/docs/functions?authuser=0) application, to deploy the project on your server:

## As an local environment
This project is configured to accept **express** deployment, for this use the following sentence:
```sh
$ firebase serve
```
