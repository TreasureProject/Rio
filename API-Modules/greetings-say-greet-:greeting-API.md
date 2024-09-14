# /greetings/say/greet/:greeting

_No description for this module_

## Table of Contents
- [/greetings/say/greet/:greeting/hi](#endpt-1)
- [/greetings/say/greet/:greeting/yo](#endpt-2)

___
###### endpt #1
```
GET - /greetings/say/greet/:greeting/hi
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns the greeting!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings/say/greet/:greeting/hi?version=1
```

Example Response:
```
"Hi!"
```
___
###### endpt #2
```
GET - /greetings/say/greet/:greeting/yo
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns the greeting!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings/say/greet/:greeting/yo?version=1
```

Example Response:
```
"Hi!"
```
