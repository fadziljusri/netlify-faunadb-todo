# Serverless Todo App
This application is using [Vue 2](https://vuejs.org/v2/guide/) for the frontend, [Netlify Functions](https://www.netlify.com/docs/functions/) for API calls, and [FaunaDB](https://fauna.com/) as the backing database.

## Project setup
### 1. Install the dependencies
```
npm install
npm install -g netlify-cli
```
### 2. Setup FaunaDB
First add the `fauna` add-on

```bash
netlify addons:create fauna
```

Then login and claim your new database

```
netlify addons:auth fauna
```
The fauna environment variables are automatically injected into your serverless functions and in `netlify dev`

### 3. Create `.env` file at root of project directory
Setup your environment variables
```
FAUNADB_SERVER_SECRET=<YOUR_SERVER_SECRET>

```

## Compiles and hot-reloads for development
**IMPORTANT!!!** The terminal logs will be a bit confusing. Your project will run on two different ports by default:-
* http://localhost:8080 (frontend) 
* http://localhost:8888 (frontend + netlify functions) 

**Run the app at port 8888** for debugging or check port used by `netlify dev` before vue finished compiling.
```
netlify dev
# or
npm start
```

## Compiles and minifies for production
```
npm run build
```

## Run your unit tests
```
npm run test:unit
```

## References 
* [React example](https://github.com/netlify/netlify-faunadb-example/blob/master/README.md)