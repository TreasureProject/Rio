# /greetings

_No description for this module_

## Table of Contents
- [/greetings/get](#endpt-1)
- [/greetings/say/hi](#endpt-2)

___
###### endpt #1
```
GET - /greetings/get
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns Hi!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings/get?version=1
```

Example Response:
```
[]
```
___
###### endpt #2
```
GET - /greetings/say/hi
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns Hi!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings/say/hi?version=1
```

Example Response:
```
"Hi!"
```
