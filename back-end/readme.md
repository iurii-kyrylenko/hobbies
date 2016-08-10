## REST API, mongoDB, hosting SPA

build/run:
```
    install: npm i
    start server: heroku local
```

local configuration (.env file):
```
    CONNECTION_STRING = <connection string to mongodb>
    JWT_SECRET = <JWT secret key>
    CAPTCHA_SECRET = <The shared key between my site and ReCAPTCHA>
    CAPTCHA_API = https://www.google.com/recaptcha/api/siteverify
    ALLOW_CORS = < yes when the separate server is used for hosting front-end application>
    PORT = 3000
```

remote configuration (process.env variables):
```
    CONNECTION_STRING = <connection string to mongodb>
    JWT_SECRET = <JWT secret key>
    CAPTCHA_SECRET = <The shared key between my site and ReCAPTCHA>
    CAPTCHA_API = https://www.google.com/recaptcha/api/siteverify
    ALLOW_CORS = no
```

deploy back-end to heroku (after building front-end):
```
    cd ../
    git subtree push --prefix back-end heroku master
```
