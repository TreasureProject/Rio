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
/v2/sum?a=1&b=1&version=1
```

Example Response:
```
{
  "result": 2
}
```
___
###### endpt #2
```
POST - /v2/sum
```

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
  a: 1,
  b: 1,
  version: 1
}
```

Example Response:
```
{
  "result": 2
}
```
