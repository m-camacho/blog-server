## Steps to run the web server 

In the project directory, run:
### `npm install`

This command will download all third party libraries.

This project works with mongoDB as data base. Default configuration uses a local instance, so please install mongoDB before running next command.
In order to seed the database (populate with some basic data to work) run:
### `npm run seed`

And finally to start the express server:
### `npm run start`

The port used by default is 3001. You can perform HTTP requests using the tool of your preference.

## Nice to have in next commits

- Include a linter tool
- Write unit tests
