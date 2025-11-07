# E2E Testing

In order to validate that the D&D Mapp Resources Server fully works as intended we use E2E testing to validate the data
flow from request to response.

## Requirements

In order to run the E2E tests, you'll need to have done at least the following steps:

1. Installed [Docker](https://docs.docker.com/).
2. Installed [Node.js](https://nodejs.org/en) and NPM (Which comes integrated with Node).
3. Cloned the repository to your machine by running the following command:
   ```bash
   git clone https://github.com/dnd-mapp/dma-resources-server.git
   ```
4. Installed dependencies by running the following command:
   ```bash
   npm ci
   ```

## Setups

We support multiple setups for running the E2E. The setups include:

- Fully managed.
  This means you don't have the app nor a database running on your computer. When using this setup, the database and app will be setup for you by using Docker containers. The app will run migrations automatically to ensure that the database schema is compatible to the latest changes.

- Half managed.
  This setup allows you to reuse an existing Mariadb database server. This also requires you to have your database fully migrated to the latest changes. The setup will automatically start the application locally before running the tests. 

- Not managed.
  Besides the requirements mentioned for a "Half managed" setup, you'll also need to have the app running locally. This setup will not automatically set up a database nor will it run the application.

E2E testing is done with [Jest](https://jestjs.io/).

## How it works

After the E2E test script has determined that the database and application are running and available, the database tables will be cleared and reset to a predetermined state. This will be done before every test.
