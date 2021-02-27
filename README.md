# LangCards: Spaced-Repetition Capstone
A simple Spanish language trainer app for anyone that uses the spaced repetition revision technique for a more effective learning experience.

---

### Working Prototype
#### Client Live:
https://spaced-repetition-blue.vercel.app

#### API URL
https://cryptic-badlands-24275.herokuapp.com

#### API GitHub:
https://github.com/dionisggr/spaced-repetition-api

---

### USER STORIES:
- As a prospective user:
  - I can register an account so that I can login and use the application
    - I'm directed to a registration page
    - On that page, I can enter my name, username, and password
    - If all of my information is correct, upon clicking the submit button, I'm redirected to my dashboard
    - If any of my information is incorrect, I'm given an appropriate error message and the option to correct my information
- As a registered user:
  - I can navigate to the "login" page
  - I can login to the application so that I can begin learning
  - I can navigate back to the registration page
  - I can enter my username and password
  - If my submitted username and password are incorrect, I'm given an appropriate error message so that I can attempt to login again
  - If my submitted username and password are correct, the app "logs me in" and redirects me to my dashboard
- As a logged in user:
  - The application remembers that I'm logged in and doesn't redirect me to the registration page
  - I'm directed to a dashboard where I can see my progress learning my language
  - The app displays my name and presents a logout button
  - The application refreshes my auth token so that I can remain logged in while active on the page
  - The app gets my language and words progress from the server
    - I'm shown my language
    - I'm shown the words to learn for the language
    - I'm shown my count for correct and incorrect responses for each word
    - I'm given a button/link to start learning
    - I'm shown the total score for guessing words correctly
  - I can learn words using spaced repetition
    - The app gets my next word to learn details from the server
    - I'm shown the word to learn
    - I'm shown my current total score
    - I'm shown the number of correct and incorrect guesses for that word
    - I'm presented an input to type my answer/guess for the current words translation
  - I can see feedback on my submitted answers.
    - The app POSTs my answer for this word to the server
    - The server will update my appropriate scores in the database
    - After submitting, I get feedback whether I was correct or not
    - After submitting, I'm told the correct answer
    - My total score is updated
    - I'm told how many times I was correct and incorrect for the word
    - I can see a button to try another word
  - I can learn another word after receiving feedback from my previous answer
    - I'm presented with a button that I can click to learn another word
    - When clicking on the button I see the next word to learn

---

### Technology
* **Front-End:** React.js, CSS3, HTML5, Javascript, Cypress, API fetch
* **Back-End:** Javascript, Node.js, Express.js, Knex.js, PostgreSQL, Mocha, Chai, Supertest, Nodemon, Postgrator, Dotenv, JWT, Bcrypt, Morgan, XSS, CORS, Helmet, HTML5, CI scripts
* **Development Environment:** Vercel, Heroku, DBeaver, Postman

---

### Wireframes

Register Page
:-------------------------:
![Register Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/register.png)

Login Page
:-------------------------:
![Login Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/login.png)

Dashboard
:-------------------------:
![Dashboard](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/dashboard.png)

Word Page
:-------------------------:
![Word Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/word.png)

Correct Answer Page
:-------------------------:
![Correct Answer Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/correct.png)

Incorrect Answer Page
:-------------------------:
![Incorrect Answer Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/wireframes/incorrect.png)

---

### Functionality
The app's functionality includes:
* Any User
  * May create an account
* Registered User
  * User lands on Dashboard with words and total score information
  * May begin quiz and see next words to answer based on previous history
  * Is provided correct or incorrect feedback based on answer
    
---

### Front-End Structure
* __Index.js__ - (stateless)
    * __App.js__ - (stateful)
      * __Header.js__ - (stateless)
      * __DashboardRoute.js__ - (stateful)
      * __LearningRoute.js__ - (stateful)
        * __LoginForm.js__ - (stateful)
          * __Label.js__ - (stateless)
          * __Input.js__ - (stateless)
          * __Button.js__ - (stateless)
      * __RegistrationRoute.js__ - (stateless)
        * __RegistrationForm.js__ - (stateless)
          * __Required.js__ - (stateless)
          * __Label.js__ - (stateless)
          * __Input.js__ - (stateless)
          * __Button.js__ - (stateless)
      * __LoginRoute.js__ - (stateless)
      * __NotFoundRoute.js__ - (stateless)
      * __Footer.js__ - (stateless)

---

### Back-End Structure
- User (database table)
  - id (serial, primary key)
  - username (unique text, not null)
  - password (text, not null)
  - name (text, not null)
- Language (database table)
  - id (text, primary key)
  - name (text, not null)
  - total_score (smallint, default 0)
  - user_id (integer, foreign key [user.id])
- Word (database table)
  - id (serial, primary key)
  - original (text, not null)
  - translation (text, not null)
  - memory_value (smallint, default 0)
  - correct_count (smallint, default 0)
  - incorrect_count (smallint, default 0)
  - language_id (text, foreign key [language.id])
  - next (integer, foreign key [word.id])

---

## API Documentation

### Endpoints that require Authentication
Closed endpoints that require a valid username and password to be included in the header body of the request.

#### Login

- Step 1: *(Generate JSON Web Token)*
  - `POST /api/token`
    - 'Admin' credentials
      - Username: `dwight`
      - Password: `pass`
- Step 2: &lt;*Use generated JSON Web Token (3 hrs)*&gt;
- Step 3 *(Optional): Refresh JSON Web Token*
  -  `PUT /api/token`

### Endpoints that require Authorization
Closed endpoints that require a valid JSON Web Token to be inlcuded in the header 'Authorization' of the request.
```
// Add to request header
headers: {'Authorization': 'Bearer <JSON Web Token>'}
```
If sending content through request body (`POST` `PUT`), don't forget to add the following in the headers:
```
// Add to request header
headers" {'Content-Type': 'application/json'}
```

### User related
Each endpoint manipulates information related to users.
- [Create User (Register)](https://github.com/dionisggr/spaced-repetition/wiki/User-Endpoints): `POST /api/user`

#### Create User *(Register)*
**URL:** `/api/user` \
**Method:** `POST` \
**Auth required:** No
- `Bearer my-secret-key`

##### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "name": "Dwight Schrute"
  "username": "dwight",
  "password": "pass"
}
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `id`            | integer | header | Primary key               |
| `username`      | string  | header | Unique username           |
| `name`          | string  | header | First name of user        |
| `password`      | string  | header | User password             |

##### Success Reponse
**Code:** `201 Created` \
**Content example**
```
{
  "id": 1,
  "username": "dwight",
  "name": Dwight Schrute
}
```

---

### Language-Word related
Each endpoint manipulates information about languages, words and guess/answer feedback.
- [Get Language Words](https://github.com/dionisggr/spaced-repetition/wiki/Language-Word-Endpoints): `GET /api/language`
- [Get Next Word](https://github.com/dionisggr/spaced-repetition/wiki/Language-Word-Endpoints): `POST /api/language/head`
- [Get Guess/Answer Feedback](https://github.com/dionisggr/spaced-repetition/wiki/Language-Word-Endpoints): `GET /api/language/guess`

#### Get Language Words
**URL:** `/api/language` \
**Method:** `GET` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

##### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*

##### Success Reponse
**Code:** `200 OK` \
**Content example**
```
{
  "nextWord": "casa",
  "totalScore": 2,
  "wordCorrectCount": 0,
  "wordIncorrectCount": 0,
  "answer: "house",
  isCorrect: true,
}
```

#### Get Next Word
**URL:** `/api/language/head` \
**Method:** `GET` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

##### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*

##### Success Reponse
**Code:** `200 OK` \
**Content example**
```
{
  "nextWord": "casa",
  "totalScore": 2,
  "wordCorrectCount": 0,
  "wordIncorrectCount": 0,
  "answer: "house",
  isCorrect: true,
}
```

#### Guess/Answer Feedback
**URL:** `/api/language/guess` \
**Method:** `POST` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

##### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "name": "Dwight Schrute"
  "username": "dwight",
  "password": "pass"
}
```
| Name                 | Type       | In     | Description                 |
| ---------------------| ---------- | ------ | --------------------------- |
| `nextWord`           | text       | header | Next word after guess       |
| `totalScore`         | integer    | header | Score among all words guess |
| `wordCorrectCount`   | integer    | header | Word correct answer score   |
| `wordIncorrectCount` | integer    | header | Word incorrect answer score |
| `answer`             | text       | header | Correct answer              |
| `isCorrect`          | boolean    | header | Feedback for previous guess |

##### Success Reponse
**Code:** `200 OK` \
**Content example**
```
{
  "nextWord": "casa",
  "totalScore": 2,
  "wordCorrectCount": 0,
  "wordIncorrectCount": 0,
  "answer: "house",
  isCorrect: true,
}
```

---

### Access related
Each endpoint manipulates information user registration, login and authorization token refresh.
- [Login](https://github.com/dionisggr/spaced-repetition/wiki/Access-Endpoints): `POST /api/auth/token`
- [Refresh Token](https://github.com/dionisggr/spaced-repetition/wiki/Access-Endpoints): `PUT /api/auth/token`
- [Registration](https://github.com/dionisggr/spaced-repetition/wiki/Access-Endpoints): `GET /api/user`

#### Login
**URL:** `/api/auth/token` \
**Method:** `POST` \
**Auth required:** Yes

##### Request Body
```
{
  "username": "dwight",
  "password": "password",
}
```

| Name       | Type    | In     | Description       |
| -----------| ------- | ------ | ----------------- |
| `username` | string  | header | Unique username   |
| `password` | string  | header | User password     |

##### Success Response
**Code:** `200 OK` \
**Content example**
```
{
  "authToken": <JSON Web Token>;
}
```

---

#### Refresh Token
**URL:** `/api/auth/token` \
**Method:** `PUT` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

##### Success Response
**Code:** `200 OK` \
**Content example**
```
{
  "authToken": <JSON Web Token>;
}
```

---

#### Registration
**URL:** `/api/user` \
**Method:** `POST` \
**Auth required:** No
- `Bearer my-secret-key`

##### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "name": "Dwight Schrute"
  "username": "dwight",
  "password": "pass"
}
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `id`            | integer | header | Primary key               |
| `username`      | string  | header | Unique username           |
| `name`          | string  | header | First name of user        |
| `password`      | string  | header | User password             |

##### Success Reponse
**Code:** `201 Created` \
**Content example**
```
{
  "id": 1,
  "username": "dwight",
  "name": Dwight Schrute
}
```

---

### Screenshots

Register Page
:-------------------------:
![Register Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/register.png)

Login Page
:-------------------------:
![Login Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/login.png)

Dashboard
:-------------------------:
![Dashboard](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/dashboard.png)

Word Page
:-------------------------:
![Home Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/word.png)

Correct Answer Page
:-------------------------:
![User Lists](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/correct.png)

Incorrect Answer Page
:-------------------------:
![List Page](https://github.com/dionisggr/spaced-repetition/blob/main/public/screenshots/incorrect.png)

---

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
- More user account management functionalities
- More languages and words
- User may add words to languages

---

## Local Dev Set Up

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
```

### Configuring Postgres
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