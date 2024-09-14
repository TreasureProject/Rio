# /greetings

Greetings API

## Table of Contents
- [[GET] — greetings](#endpt-1)
- [[GET] — greetings/get](#endpt-2)
- [[GET] — greetings/say/:greeting](#endpt-3)
- [[GET] — greetings/say/greet/:greeting/hi](#endpt-4)
- [[GET] — greetings/say/greet/:greeting/yo](#endpt-5)
- [[GET] — greetings/say/hi](#endpt-6)

___
###### endpt #1
```
GET - /greetings
```

**Status**: LIVE

**Availability**: PUBLIC

#### Description:
- Returns Hello, world!

Params:

| Name | Type | Description |
|--|--|--|
| **version** | `integer` | A version number (*Required)


Example Request:
```
/greetings?version=1
```

Example Response:
```
"Hello, world!"
```
___
###### endpt #2
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
###### endpt #3
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
###### endpt #4
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
###### endpt #5
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
___
###### endpt #6
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
