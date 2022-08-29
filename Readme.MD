# node-authentication

### Pre-requisites

- [Passport](https://www.passportjs.org/)

## Installation

A little intro about the installation.

```
$ git clone https://github.com/mauryasaurav/node-authentication

Node Version 
  - v14.15.5
NPM version 
  -  6.14.11

Start Server - 

$ cd node-authentication
$ npm i
$ npm start
```

## CURL REQUEST FOR ALL ROUTES

```
Register - 

curl --location --request POST 'http://localhost:8000/api/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_sessions=s%3A404i8Kc75A7dMyqF7_wVrrhoWiSEjfbo.lN7wDIpRt75hkDVPmNOkh2Jcttxu05Na3mqMTkW46ZM' \
--data-raw '{
    "full_name": "saurav maurya",
    "email": "s2maurya1@gmail.com",
    "password": "Qwerty@123"
}'

Login - 

curl --location --request POST 'http://localhost:8000/api/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_sessions=s%3ANAVs78_cFjUKeRW51sOX-obrfpPzq8f5.V4MDHKWkLaWDgFe2uwnUF4r2mkHizt4TRAljU9CbpvQ' \
--data-raw '{
    "email": "s2maurya1@gmail.com",
    "password": "Qwerty@123"
}'

Check Authentication - 

curl --location --request GET 'http://localhost:8000/api/checkAuthenticated' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_sessions=s%3ANAVs78_cFjUKeRW51sOX-obrfpPzq8f5.V4MDHKWkLaWDgFe2uwnUF4r2mkHizt4TRAljU9CbpvQ' \
--data-raw '{
    "full_name": "saurav maurya",
    "email": "s2maurya1@gmail.com",
    "password": "Qwerty@123"
}'

Logout - 

curl --location --request GET 'http://localhost:8000/api/logout' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_sessions=s%3A404i8Kc75A7dMyqF7_wVrrhoWiSEjfbo.lN7wDIpRt75hkDVPmNOkh2Jcttxu05Na3mqMTkW46ZM' \
--data-raw '{
    "full_name": "saurav maurya",
    "email": "s2maurya1@gmail.com",
    "password": "Qwerty@123"
}'
```
