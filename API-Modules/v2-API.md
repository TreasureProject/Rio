# /v2

V2 API documentation

## Table of Contents
- [/v2/sum](#endpt-1)
- [/v2/sum](#endpt-2)

___
###### endpt #1
```
GET - /v2/sum
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Adds numbers

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | a number (*Required)
| **b** | `integer` | a number (*Required)
| **version** | `integer` | A version number (*Required)


Example Request:
```
/v2/sum?a=3&b=4&version=1
```

Example Response:
```
{
  "result": [
    7
  ],
  "other": {
    "A": "A"
  }
}
```
___
###### endpt #2
```
POST - /v2/sum
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Adds numbers

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | a number (*Required)
| **b** | `integer` | a number (*Required)
| **version** | `integer` | A version number (*Required)


Example Request:
```
{
  "a": 10,
  "b": 25,
  "version": 1
}
```

Example Response:
```
[
  35
]
```
