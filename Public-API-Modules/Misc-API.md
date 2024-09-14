# Misc

All other endpoints

## Table of Contents
- [[GET] — ](#endpt-1)
- [[POST] — ](#endpt-2)
- [[GET] — greetings](#endpt-3)

___
###### endpt #1
```
GET - /
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns the string 'Hello, world'

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/?version=1
```

Example Response:
```
77
```
___
###### endpt #2
```
POST - /
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns the string 'Hello, world'

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
{
  "version": 1
}
```

Example Response:
```
{
  "result": "Hello, world"
}
```
___
###### endpt #3
```
GET - /greetings
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns Hello, world!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings?version=1
```

Example Response:
```
"Hello, world!"
```
