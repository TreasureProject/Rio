# /greetings/say

_No description for this module_

## Table of Contents
- [/greetings/say/:greeting](#endpt-1)
- [/greetings/say/hi](#endpt-2)

___
###### endpt #1
```
GET - /greetings/say/:greeting
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
/greetings/say/:greeting?version=1
```

Example Response:
```
"Hi!"
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
