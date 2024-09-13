# /math

All math related functionality

## Table of Contents
- [/math/makeSum](#endpt-1)
- [/math/makeSum](#endpt-2)
- [/math/sum](#endpt-3)
- [/math/sum](#endpt-4)

___
###### endpt #1
```
POST - /math/makeSum
```

**Status**: PREVIEW

**Availability**: PRIVATE

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
{
  "a": 1,
  "b": 1,
  "version": 1
}
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
POST - /math/makeSum
```

**Status**: PREVIEW

**Availability**: PRIVATE

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
{
  "a": 1,
  "b": 1,
  "version": 1
}
```

Example Response:
```
{
  "result": 2
}
```
___
###### endpt #3
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
___
###### endpt #4
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
