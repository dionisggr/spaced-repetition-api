# Spaced repetition API!
A simple API for the Spaced Repetition Language Trainer App for all HTTP-related requests.

The App allows users to train in Spanish for common words, and slowly scale up to more complex and less frequently words. It allows for users to keep track of the last word in their history, and their score progress. It will further keep history of each time the user has answered the translation correctly and incorrectly.

This API stop represents a way for the app to communicate with the list of users, languages and words per language available for practice. Please read the instructions for more information.

### Client-Side
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://devmap.vercel.app/

### Deployment Platform:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Heroku

### Languages/Tools
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Javascript, Node.js, Express.js, Knex.js, PostgreSQL, Mocha, Chai, Supertest, Nodemon, Postgrator, Dotenv, JSON Web Tokens, Bcrypt, HTML5, CI scripts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Loggers:** Morgan \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Securities:** CORS, Helmet

---

## API Instructions

### Endpoints that require Authentication
Closed endpoints that require a valid username and password to be included in the header body of the request.

#### Login

- Step 1:  *(Generate JSON Web Token)*
  - [Login](https://github.com/dionisggr/devmap-api/wiki/Access-Permission): `POST /api/auth/token`
    - 'Admin' credentials
      - Username: `dwight`
      - Password: `pass`
- Step 2: &lt;*Use generated JSON Web Token*&gt;

### Endpoints that require Authorization
Closed endpoints that require a valid JSON Web Token to be inlcuded in the header 'Authorization' of the request.
```
// Add to request header
headers: {'Authorization': 'Bearer <JSON Web Token>'}
```
If sending content through request body (`POST`), don't forget to add the following in the headers:
```
// Add to request header
headers" {'Content-Type': 'application/json'}
```

#### Language related
Each endpoint manipulates information related to language sets.
- [Get Language and Set of Words](https://github.com/dionisggr/devmap-api/wiki/Projects): `GET /api/language`

#### Word related
Each endpoint manipulates information related to word data.
- [Get Last Tracked Word](https://github.com/dionisggr/devmap-api/wiki/Projects): `GET /api/language/head`

#### Guess related
Each endpoint manipulates next information after user guess.
- [Get Feedback and Next Word](https://github.com/dionisggr/devmap-api/wiki/Projects): `POST /api/language/guess`

#### User related
Each endpoint manipulates information related to users.
- [Create an User](https://github.com/dionisggr/devmap-api/wiki/Users): `POST /api/user`


























## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
