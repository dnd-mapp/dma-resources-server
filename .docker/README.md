# D&D Mapp - Web client

[![Docker Pulls](https://img.shields.io/docker/pulls/dnd-mapp/dma-web-client.svg)](https://ghcr.io/dnd-mapp/dma-web-client)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/dnd-mapp/dma-web-client/latest?color=blue)](https://ghcr.io/dnd-mapp/dma-web-client)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-web-client/push-main.yml?branch=main&label=CI)](https://github.com/dnd-mapp/dma-web-client/actions?query=workflow%3ACI)
[![License](https://img.shields.io/github/license/dnd-mapp/dma-web-client)](https://github.com/dnd-mapp/dma-web-client/blob/main/LICENSE)

## Table of Contents

-   [Overview](#overview)
-   [Supported Tags](#supported-tags)
-   [How to Use](#how-to-use)
    -   [Pulling the Image](#pulling-the-image)
    -   [Running with Docker CLI](#running-with-docker-cli)
    -   [Running with Docker Compose](#running-with-docker-compose)
-   [Configuration](#configuration)
    -   [Runtime Configuration File (`config.json`)](#runtime-configuration-file-configjson)
    -   [Ports](#ports)
-   [Building the Image (Optional)](#building-the-image-optional)
    -   [Local Build via npm script](#local-build-via-npm-script)
    -   [Manual Build](#manual-build)
-   [Development](#development)
-   [Issues & Contributing](#issues--contributing)
-   [License](#license)

---

## Overview

This Docker image provides a containerized Nginx web server configured to serve the **D&D Mapp Web Client**, the main user interface for the D&D Mapp platform. It encapsulates the Angular application, making it easy to deploy and run consistently across various environments.

## Supported Tags

The following image tags are available on `ghcr.io/dnd-mapp/dma-web-client`:

*   `latest`: The most recent stable build of the web client.
*   `1.2.3`, `1.2`, `1`: Specific stable major, minor, or patch versions. It is recommended to use specific version tags for production deployments.
*   `1.2.3-alpha.4`, `1.2.3-beta.4`, `1.2.3-rc.4`: Pre-release versions (alpha, beta, release candidate) for testing and development.

## How to Use

### Pulling the Image

First, pull the Docker image from GitHub Container Registry (GHCR):

```bash
docker pull ghcr.io/dnd-mapp/dma-web-client:latest
```

Replace `latest` with a specific version tag if you require a particular release.

### Running with Docker CLI

To start the D&D Mapp Web Client in a Docker container, use the `docker run` command. The application listens on port `80` inside the container, so you'll typically map this to a host port.

```bash
# Example: Running with default configuration (connects to localhost backends as per default image config)
docker run -d \
  --name dma-web-client \
  -p 80:80 \
  ghcr.io/dnd-mapp/dma-web-client:latest
```

*Explanation of parameters:*
*   `-d`: Runs the container in detached mode (in the background).
*   `--name dma-web-client`: Assigns a readable name to your container.
*   `-p 80:80`: Maps port 80 on your host to port 80 inside the container. You can change the host port (e.g., `-p 8080:80`) if port 80 is already in use on your host.
*   `ghcr.io/dnd-mapp/dma-web-client:latest`: The image to use.

After running, you should be able to access the D&D Mapp Web Client at `http://localhost` (or `http://localhost:8080` if you mapped to port 8080).

**Configuring at Runtime with Docker CLI:**

The D&D Mapp Web Client supports a `config.json` file for runtime configuration. You can provide your own `config.json` by mounting it into the container. This is crucial for pointing the client to the correct backend services.

1.  **Create your `config.json` file on your host machine.**
    For example, create a file named `config.json` in your current directory:

    ```json
    {
        "authServerBaseUrl": "https://your-auth.dndmapp.dev/server",
        "resourcesServerBaseUrl": "https://your-resources.dndmapp.dev/server",
        "playerServerBaseUrl": "https://your-player.dndmapp.dev/server"
    }
    ```
    **Remember to replace the placeholder URLs with the actual URLs of your D&D Mapp backend services.**

2.  **Run the container, mounting your `config.json`:**

    ```bash
    docker run -d \
      --name dma-web-client-configured \
      -p 80:80 \
      -v $(pwd)/config.json:/usr/share/nginx/html/config.json \
      ghcr.io/dnd-mapp/dma-web-client:latest
    ```
    *   `-v $(pwd)/config.json:/usr/share/nginx/html/config.json`: This mounts your `config.json` from the current directory on your host into the container, replacing the default `config.json` at `/usr/share/nginx/html/config.json`.

### Running with Docker Compose

For easier management, especially when running alongside other services, you can use `docker compose`.

1.  **Create a `docker-compose.yml` file:**
    In a new directory, create `docker-compose.yml`. You'll also need a `config.json` file in the same directory (or a specified path) to provide your application's configuration.

    ```yaml
    # docker-compose.yml
    services:
      dma-web-client:
        image: ghcr.io/dnd-mapp/dma-web-client:latest
        container_name: dma-web-client
        restart: unless-stopped
        ports:
          - "80:80" # Map host port 80 to container port 80
        volumes:
          # Mount your custom config.json to override the default.
          # Ensure config.json exists in the same directory as this docker-compose.yml
          - ./config.json:/usr/share/nginx/html/config.json
    ```

    **Example `config.json` to place alongside `docker-compose.yml`:**

    ```json
    {
        "authServerBaseUrl": "https://your-auth.dndmapp.dev/server",
        "resourcesServerBaseUrl": "https://your-resources.dndmapp.dev/server",
        "playerServerBaseUrl": "https://your-player.dndmapp.dev/server"
    }
    ```

2.  **Start the service:**
    Navigate to the directory containing your `docker-compose.yml` and `config.json`, then run:

    ```bash
    docker compose up -d
    ```

    To stop and remove the container:
    ```bash
    docker compose down
    ```

## Configuration

### Runtime Configuration File (`config.json`)

The Angular application reads its runtime configuration from `/usr/share/nginx/html/config.json` inside the container. This file should be a JSON object defining the base URLs for the various D&D Mapp backend services.

**Example `config.json` structure:**

```json
{
    "authServerBaseUrl": "https://your-auth.dndmapp.dev/server",
    "resourcesServerBaseUrl": "https://your-resources.dndmapp.dev/server",
    "playerServerBaseUrl": "https://your-player.dndmapp.dev/server"
}
```

*   `authServerBaseUrl`: The base URL for the authentication server.
*   `resourcesServerBaseUrl`: The base URL for the resources server.
*   `playerServerBaseUrl`: The base URL for the player server.

To provide your custom `config.json`, use a Docker volume mount as shown in the [Running with Docker CLI](#running-with-docker-cli) or [Running with Docker Compose](#running-with-docker-compose) sections.

### Ports

*   `80/tcp`: The Nginx web server inside the container listens on this port for incoming HTTP requests.

## Building the Image (Optional)

### Local Build via npm script

If you want to build the Docker image locally from the source code, you can use the provided npm script:

```bash
# Clone the repository
git clone https://github.com/dnd-mapp/dma-web-client.git
cd dma-web-client

# Install npm dependencies (if required by the build process itself, e.g. for pre-build steps)
npm install

# Run the docker build script
npm run docker:build
```
This script will leverage the `Dockerfile` and other Docker-related files located in the `.docker/` directory of the repository.

### Manual Build

For advanced users or specific scenarios, you can manually build the image by navigating to the `.docker/` directory:

```bash
# Clone the repository
git clone https://github.com/dnd-mapp/dma-web-client.git
cd dma-web-client

# Run docker build directly
docker buildx bake -f .docker/docker-bake.hcl
```
This command builds the image from the context of the repository root folder, which is required to get all the required files for the Docker image creation. In order to do this make sure to have a Docker builder available that allows building Docker images with a Docker bake file.

## Development

For local development of the D&D Mapp Web Client, refer to the main repository's [`README.md`](https://github.com/dnd-mapp/dma-web-client/blob/main/README.md) for instructions on running the Angular application directly.

## Issues & Contributing

If you encounter any issues or have suggestions, please open an issue on the [GitHub repository](https://github.com/dnd-mapp/dma-web-client/issues).

Contributions are welcome! Please see our [CONTRIBUTING.md](https://github.com/dnd-mapp/dma-web-client/blob/main/CONTRIBUTING.md) for more details.

## License

This project is licensed under the [AGPL-3.0 License](https://github.com/dnd-mapp/dma-web-client/blob/main/LICENSE) - see the `LICENSE` file for details.
