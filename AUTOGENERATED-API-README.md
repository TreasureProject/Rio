# RIO Example API

## Table of Contents
- [/](#endpt-1)
- [/hi](#endpt-2)
- [/makeSum](#endpt-3)
- [/sum](#endpt-4)

___
###### endpt #1
```
GET - /
```

#### Description:
- Returns the string 'Hello, world'

_No parameters_


Example Request:
```
/
```

Example Response:
```
{
  "result": "Hello, world"
}
```
___
###### endpt #2
```
GET - /hi
```

#### Description:
- Returns Hi!

_No parameters_


Example Request:
```
/hi
```

Example Response:
```
"Hi!"
```
___
###### endpt #3
```
POST - /makeSum
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
###### endpt #4
```
GET - /sum
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
/sum?a=1&b=1
```

Example Response:
```
{
  "result": 2
}
```
