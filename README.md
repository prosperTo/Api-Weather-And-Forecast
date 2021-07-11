
# Introduction

This is a REST api developed with NodeJs, TypeScript, ExpressJs.

It consists of consulting the weather of both the current location, as well as being able to search for the current weather in any city in the world and also being able to make a 5-day forecast

## Use Cases

Whether we want to check the weather from any front, it has support for more than 200,000 cities


## Request

```http
GET /api/v1/location
```

## Response

What this api returns is the exact location of the ip that makes the request even if we are in localhost along with other interesting data


## Request

```http
GET /api/v1/current/city?
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `city` | `string` | **Optional**. The name of a city |

## Responses

We have 2 cases in this api, pass it the city parameter or not pass it, in case we do not pass it, we will obtain not only the data of our ip and location but also how the current weather is.


## Request

```http
GET /api/v1/forecast/city?
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `city` | `string` | **Optional**. The name of a city |

## Responses

In this api we also have 2 cases to set the city parameter or not pass it, for either of them, the api returns the info of a 5-day forecast

## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

## Instruccion to Start Api

Install Depedencies

```node
yarn install
```

## Run Build

Install Depedencies

```node
yarn build
```

## Run test

Run tests on enpoinds

```node
yarn test
```

## Start Api

Server start at port 5000

```node
yarn start:prod
```