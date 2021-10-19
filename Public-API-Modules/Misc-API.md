# Misc

All other endpoints

## Table of Contents
- [/](#endpt-1)
- [/](#endpt-2)

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
{
  "result": "Hello, world"
}
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
