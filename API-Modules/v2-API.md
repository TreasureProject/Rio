# /v2

V2 API documentation

## Table of Contents
- [[DELETE] — v2/data](#endpt-1)
- [[PATCH] — v2/data](#endpt-2)
- [[PUT] — v2/data](#endpt-3)
- [[GET] — v2/sum](#endpt-4)
- [[POST] — v2/sum](#endpt-5)

___
###### endpt #1
```
DELETE - /v2/data
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- updates stored numbers

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
[
  true
]
```
___
###### endpt #2
```
PATCH - /v2/data
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- updates stored numbers

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | a number (Optional)
| **b** | `integer` | a number (Optional)
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
  {
    "a": 10,
    "b": 25
  }
]
```
___
###### endpt #3
```
PUT - /v2/data
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- stores numbers

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
  {
    "a": 10,
    "b": 25
  }
]
```
___
###### endpt #4
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
  },
  "b": []
}
```
___
###### endpt #5
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
