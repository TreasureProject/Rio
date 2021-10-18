# /math

All math related functionality

## Table of Contents
- [/math/sum](#endpt-1)

___
###### endpt #1
```
GET - /math/sum
```

**Status**: LIVE
**Availability**: PUBLIC

#### Description:
- Adds two numbers together

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | A number to be added (*Required)
| **b** | `integer` | Another number to be added (*Required)
| **version** | `integer` | A version number (*Required)


Example Request:
```
/math/sum?a=1&b=1&version=1
```

Example Response:
```
{
  "result": 2
}
```
