# /math

This is placeholder text for the description of this module. It will explain what this module does and why it exists

## Table of Contents
- [/math/makeSum](#endpt-1)
- [/math/sum](#endpt-2)

___
###### endpt #1
```
POST - /math/makeSum
```

#### Description:
- Adds two numbers together

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | A number to be added (*Required)
| **b** | `integer` | Another number to be added (*Required)


Example Request:
```
{
  a: 1,
  b: 1
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
GET - /math/sum
```

#### Description:
- Adds two numbers together

Params:

| Name | Type | Description |
|--|--|--|
| **a** | `integer` | A number to be added (*Required)
| **b** | `integer` | Another number to be added (*Required)


Example Request:
```
/math/sum?a=1&b=1
```

Example Response:
```
{
  "result": 2
}
```
