## REST API, mongoDB, hosting SPA

#### Endpoints

| Path                          | Method           | Auth  | Notes
|:------------------------------|:-----------------|:-----:|:------
| /users/login                  | post             |       |
| /users/register               | post             |       |
| /users                        | get              |       |
| /shared/books, /shared/movies | get              |       | user id in the query
| /books, /movies               | get, post        | +     |
| /books/id, /movies/id         | get, put, delete | +     |
| /books/upload, /movies/upload | post             | +     |
| /settings                     | get, put         | +     |


##### build/run:
```
    install: npm i
    start server: heroku local
```

#### JSON file to upload books:
```
[
    { "title": "t-0001", "author": "a-0001", "completed": "2016-01-01", "mode": "r" },
    { "title": "t-0002", "author": "a-0002", "completed": "2016-01-02", "mode": "a" },
    { "title": "t-0003", "author": "a-0003", "completed": "2016-01-03", "mode": "r-a" }
]
```

#### JSON file to upload movies:
```
[
    { "title": "t-0001", "year": "2001", "completed": "2016-01-01", "notes": "note-001" },
    { "title": "t-0002", "year": "2002", "completed": "2016-01-02", "notes": "note-002" },
    { "title": "t-0003", "year": "2003", "completed": "2016-01-03", "notes": "note-003" }
]
```

#### local configuration (.env file):
```
    CONNECTION_STRING = <connection string to mongodb>
    JWT_SECRET = <JWT secret key>
    CAPTCHA_SECRET = <The shared key between my site and ReCAPTCHA>
    CAPTCHA_API = https://www.google.com/recaptcha/api/siteverify
    ALLOW_CORS = < yes when the separate server is used for hosting front-end application>
    PORT = 3000
```

#### remote configuration (process.env variables):
```
    CONNECTION_STRING = <connection string to mongodb>
    JWT_SECRET = <JWT secret key>
    CAPTCHA_SECRET = <The shared key between my site and ReCAPTCHA>
    CAPTCHA_API = https://www.google.com/recaptcha/api/siteverify
    ALLOW_CORS = no
```

#### deploy back-end to heroku (after building front-end):
```
    cd ../
    git subtree push --prefix back-end heroku master
```
