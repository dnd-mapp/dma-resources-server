# DMA Resources Server

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-resources-server/push-main.yml?branch=main&logo=github)](https://github.com/dnd-mapp/dma-resources-server/actions/workflows/push-main.yml)

The resources backend server for the D&D Mapp platform, built with NestJS. This service is responsible for managing and serving various static resources required by the D&D Mapp platform and other associated services, such as Spells, Races, Classes, Items, Backgrounds, etc.

## Table of Contents

*  [Features](#features)
*  [Technologies Used](#technologies-used)
*  [Getting Started](#getting-started)
   *  [Prerequisites](#prerequisites)
   *  [Installation](#installation)
   *  [Running the Application](#running-the-application)
   *  [Running Tests](#running-tests)
*  [API Documentation](#api-documentation)
*  [Configuration](#configuration)
*  [Contributing](#contributing)
*  [License](#license)
*  [Contact](#contact)

## Features

*  **Resource Management:** CRUD operations for various D&D resources (e.g., Monsters, Spells, Races, Classes, Backgrounds).
*  **Database Integration:** Persistent storage for all resource data.
*  **Validation:** Robust input validation for all API endpoints.

## Technologies Used
*  [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*  [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
*  [Node.js](https://nodejs.org/): JavaScript runtime environment.
*  [Fastify](https://fastify.dev/): Fast web framework for Node.js (used by NestJS under the hood).
*  [Prisma](https://www.prisma.io/): Object-Relational Mapper (ORM) for database interaction.
*  [MariaDB](https://mariadb.com/): Database system.
*  [Jest](https://jestjs.io/): Testing framework.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **[Node.js](https://nodejs.org/en/download/) (v22) and npm (Node Package Manager, v11)**: We recommend using [mise-en-place](https://mise.jdx.dev/) to manage your installed version of Node.js and npm globally.
*   **NestJS CLI**: Install globally using npm
    ```bash
    npm install -g @nestjs/cli@~11
    ```
*   **[mkcert](https://github.com/FiloSottile/mkcert)**: Create a new local CA
    ```bash
    mkcert -install
    ```
*   [Mariadb](https://mariadb.com/downloads/) client and server
*   (Optional, but recommended) A tool like [Docker](https://www.docker.com/get-started) for easier database setup.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dnd-mapp/dma-resources-server.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd dma-resources-server
    ```
3.  **(Optional when using mise-en-place) Install project tools**
    ```bash
    mise install
    ```
4.  **Install project dependencies:**
    ```bash
    npm ci
    ```

5.  **Environment Variables:**
    Create a `.env` file in the root of the project by copying `.env.template`.
    ```bash
    cp .env.template .env
    ```
    Edit the `.env` file with your specific environment configurations.

    Example `.env` content:
    ```
    # Server configuration
    HOST="localhost"
    PORT=3000

    DATABASE_HOST="localhost"
    DATABASE_PORT=3306
    DATABASE_USERNAME="root"
    DATABASE_PASSWORD="password"
    DATABASE_SCHEMA="my_db"
    ```
    *Make sure to replace placeholder values with strong, unique secrets for production.*

6.  **Database Setup:**
    Ensure your database server is running. If you're using Docker, you might start a database instance like this (for Mariadb):
    ```bash
    docker run --name mariadb -e MARIADB_ROOT_PASSWORD=password -e MARIADB_DATABASE=my_db -p 3306:3306 -d mariadb:latest
    ```

7.  **Generate a self-signed certificate to serve the application over HTTPS:** The app is served locally over HTTPS by default. In order to accomplish this you must generate a self-signed certificate using mkcert.
    ```bash
    mkcert -cert-file certificate.pem -key-file certificate-key.pem localhost.resources.dndmapp.dev localhost
    ```

8.  **Trust the certificate:** In order to prevent HTTPS warnings from your browser you must add them as trusted certificates. Follow the steps below for your Operating System:
    <ul>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>
                        Press <kbd>&#8862; Win</kbd>+<kbd>R</kbd> to open `Run`.
                    </li>
                    <li>
                        Type `mmc` and press <kbd>⏎ Enter</kbd> to open `Microsoft Management Console` (You may need to accept that this app may make changes to your device).
                    </li>
                    <li>
                        Press <kbd>CTRL</kbd>+<kbd>M</kbd> to add or remove Snap-ins.
                    </li>
                    <li>
                        Add the `Certificates` snap-in, confirm that it'll manage certificates for your user account, and confirm the selection of snap-ins.
                    </li>
                    <li>
                        In the side panel, navigate to `Console Root > Certificates - Current User > Trusted Root Certification Authorities > Certificates`.
                    </li>
                    <li>
                        In the top bar, open the `Action` menu, open the `All Tasks` sub menu, and select the `Import...` task.
                    </li>
                    <li>
                        Click on next to confirm that the store location is for the `Current User`.
                    </li>
                    <li>
                        Click on `Browse...`, navigate to the repository root folder, allow all file types, and select the `certificate.pem`.
                    </li>
                    <li>
                        Continue and finish by placing the certificate under the `Trusted Root Certification Authorities` store (There's no need to save the console settings).
                    </li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>
                        Press <kbd>⌘ Command</kbd>+<kbd>Space</kbd>.
                    </li>
                    <li>
                        Search for and open `Keychain Access` (You might get prompted to provide your password).
                    </li>
                    <li>
                        Open the root folder of the repository in finder.
                    </li>
                    <li>
                        Make sure that "Keychain Access" has the `login` section open on `All Items`.
                    </li>
                    <li>
                        Drag the certificate from finder into the Keychain Access (You might get an error message "-26276" indicating that the import of the certificate was not possible).
                    </li>
                    <li>
                        Find the certificate by the looking for it by the name `localhost.www.dndmapp.dev`, Right click on it and select `Get Info`.
                    </li>
                    <li>
                        Expand the `Trust` section and set `Secure Sockets Layer (SSL)` to `Always Trust`.
                    </li>
                    <li>
                        You may now close all windows (You might get prompted to provide your password to save the changes).
                    </li>
                </ol>
            </details>
        </li>
        <li>For all Operating Systems: You need to restart your browser after trusting the certificate to complete the process.</li>
    </ul>

9.  **Update the hosts file:** To be able to use the custom host names you need to update the hosts file. Follow the steps below for your Operating System:
    <ul>
        <li>
            <p>
                The following contents will need to be added to the Hosts file, no matter the OS of your device:
            </p>
            <pre>127.0.0.1    localhost.resources.dndmapp.dev</pre>
        </li>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>Run a text editor like Notepad or Notepad++ as Administrator.</li>
                    <li>Open the Hosts file on the following location: <pre>C:\Windows\System32\drivers\etc\hosts</pre></li>
                    <li>Add the contents from above in the file, save, and close the file.</li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>Open a terminal.</li>
                    <li>
                        Using your favorite CLI text editor tool, open the hosts file located at: <pre>/etc/hosts</pre> (You might need to use <code>sudo</code> to have write permissions for this file).
                    </li>
                    <li>Add the contents from above in this file. After that you may save and close the file.</li>
                </ol>
            </details>
        </li>
    </ul>

### Running the Application

```bash
npm run start
```
This will start the application in watch mode, automatically recompiling and restarting on file changes. The server will typically be available at `https://localhost.resources.dndmapp.dev:3000/server`.

### Running Tests

To run the test suite:

```bash
npm run test
```

To run tests with watch mode:

```bash
npm run test:dev
```

To run end-to-end tests:

```bash
npm run e2e
```

## API Documentation

Once the server is running in development mode, the API documentation (powered by Swagger/OpenAPI) will be available at:

[https://localhost.resources.dndmapp.dev:3000/server/api](https://localhost.resources.dndmapp.dev:3000/server/api)

This interface allows you to explore available endpoints, understand request/response schemas, and even test them directly from your browser.

## Configuration

The application's configuration is managed through environment variables, primarily loaded from the `.env` file (see [Installation](#installation)).

Key configuration parameters include:

*   `DMA_HOST`: The hostname the server listens on (default: `localhost.resources.dndmapp.dev`).
*   `DMA_PORT`: The port the server listens on (default: `3000`).

For a full list of configurable options, please refer to the `.env.template` file.

## License

This project is licensed as **"All Rights Reserved"** by [NoNamer777](https://github.com/NoNamer777). For full details regarding the terms and conditions, please refer to the [LICENSE](LICENSE) in the repository.

## Contact

If you have any questions, suggestions, or issues, please open an issue on GitHub or contact us at:

*   **Project Maintainer:** NoNamer777
*   **Email:** mail.dndmapp@gmail.com
*   **GitHub Issues:** [dnd-mapp/dma-resources-server/issues](https://github.com/dnd-mapp/dma-resources-server/issues)

---