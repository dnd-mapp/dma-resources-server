# D&D Mapp - Resources Server (Docker Image)

[![GitHub Container Registry](https://img.shields.io/badge/container%20registry-ghcr.io-2496ED?logo=github)](https://github.com/dnd-mapp/dma-resources-server/pkgs/container/dma-resources-server)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-resources-server/push-main.yml?branch=main)](https://github.com/dnd-mapp/dma-resources-server/actions/workflows/push-main.yml)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-red)

This repository provides a Docker image for the [**D&D Mapp - Resources Server**](https://github.com/dnd-mapp/dma-resources-server), a NestJS REST API that serves static game resources like Classes, Races, Backgrounds, Spells, and more, for the D&D Mapp platform.

## Table of Contents

-   [Description](#description)
-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Pulling the Image](#pulling-the-image)
    -   [Running the Container](#running-the-container)
    -   [Using Docker Compose](#using-docker-compose)
-   [Configuration](#configuration)
-   [Building the Image](#building-the-image)
-   [API Endpoints](#api-endpoints)
-   [License](#license)
-   [Support](#support)

## Description

The D&D Mapp - Resources Server is a dedicated REST API built with NestJS to provide static Dungeons & Dragons game resources. This Docker image encapsulates the application, offering a consistent and isolated environment for deployment, whether for local development, testing, or production environments. The application currently has no external dependencies beyond the runtime environment itself.

## Features

-   **Containerized NestJS REST API:** Runs the D&D Mapp Resources Server in an isolated Docker container.
-   **Lightweight Base Image:** Utilizes a lean `node:22-alpine` base image for a smaller footprint.
-   **Production Ready:** Optimized for performance and stability with a multi-stage build process.
-   **Easy Deployment:** Simple `docker run` or `docker compose up` commands to get started.
-   **Health Check:** Includes a Docker HEALTHCHECK command for robust liveness and readiness probes.

## Getting Started

These instructions will guide you through setting up and running the Dockerized D&D Mapp - Resources Server on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

-   [**Docker Engine**](https://docs.docker.com/get-docker/) (version 18.06 or higher)
-   [**Docker Compose**](https://docs.docker.com/compose/install/) (if you plan to use `docker-compose.yml`)

### Pulling the Image

The easiest way to get started is to pull the pre-built Docker image from GitHub Container Registry:

```bash
docker pull ghcr.io/dnd-mapp/dma-resources-server:latest
```

You can also specify a different tag if available (e.g., `1.0.0`).

### Running the Container

To run the application in a Docker container, use the `docker run` command:

```bash
docker run -d \
  -p 3000:3000 \
  --name dma-resources-server \
  -e DMA_PORT=3000 \
  ghcr.io/dnd-mapp/dma-resources-server:latest
```

**Explanation of parameters:**

-  `-d`: Runs the container in detached mode (in the background).
-  `-p 3000:3000`: Maps port `3000` of your host to port `3000` inside the container. **Adjust the host port if `3000` is already in use or if you change the `DMA_PORT` environment variable.**
-  `--name dma-resources-server`: Assigns a readable name to your container.
-  `-e DMA_PORT=3000`: Sets the `DMA_PORT` environment variable. While it defaults to `3000`, explicitly setting it ensures clarity and allows for easy modification.

After running, your application should be accessible at `http://localhost:3000`.

### Using Docker Compose

For a convenient setup, `docker compose` is recommended, especially for managing environment variables.

1.  Ensure you have a `.env` file in the same directory as your `docker-compose.yml` (or wherever you specify `env_file`). For example:

    ```env
    # ./.env
    # No custom environment variables needed by default,
    # but define them here if you want to override defaults.
    # DMA_PORT=3000
    ```

2.  Use the provided `docker-compose.yml` (located in `.docker/compose.yml` in the source repository):

    ```yaml
    # .docker/compose.yml
    services:
        dma-resources-server:
            image: ghcr.io/dnd-mapp/dma-resources-server
            container_name: dma-resources-server
            restart: unless-stopped
            ports:
                - "3000:3000"
            env_file:
                - ./.env
    ```

3.  Start the service:

    ```bash
    docker compose -f .docker/compose.yml up -d
    ```

    This command will pull the image (if not already present), create and start the container. The `-f .docker/compose.yml` flag is important if your `docker-compose.yml` is not in the current directory.

4.  To stop the service:

    ```bash
    docker compose -f .docker/compose.yml down
    ```

## Configuration

The D&D Mapp - Resources Server application can be configured using the following environment variables:

| Variable   | Description                                                                                                                                                                                                                                                                              | Default Value |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `DMA_HOST` | The host on which the application is available. For Docker images, this is internally set to `0.0.0.0` to ensure it's accessible from outside the container. **It is not recommended to overwrite this variable unless you fully understand the implications for container networking.** | `0.0.0.0`     |
| `DMA_PORT` | The port on which the NestJS application listens. If you change this, ensure the host port mapping (`-p`) in your `docker run` command or `docker-compose.yml` has the same value.                                                                                                       | `3000`        |

You can provide these variables:
-  Individually using the `-e` flag with `docker run`.
-  Collectively using a `.env` file referenced by `docker-compose.yml`.

## Building the Image

While a pre-built image is available, you might want to build the Docker image yourself for local development, custom changes, or specific architectural needs.

1.  **Clone the source repository:**

    ```bash
    git clone https://github.com/dnd-mapp/dma-resources-server.git
    cd dnd-mapp/dma-resources-server
    ```

2.  **Build using `npm run docker:build` (recommended, uses Docker Bake):**

    The project leverages Docker Bake for multi-platform builds and OCI annotations.
    ```bash
    npm run docker:build
    ```
    This command executes `docker buildx bake -f .docker/bake.hcl`, building the image locally.

3.  **Alternatively, build directly using `docker build`:**

    You can also build the image using the traditional `docker build` command, referencing the `Dockerfile` located in `.docker/Dockerfile`:

    ```bash
    docker build -t ghcr.io/dnd-mapp/dma-resources-server:local-build -f .docker/Dockerfile .
    ```

    -  `-t ghcr.io/dnd-mapp/dma-resources-server:local-build`: Tags the image with a custom name and version.
    -  `-f .docker/Dockerfile`: Specifies the path to your Dockerfile.
    -  `.`: Specifies the build context, which is the current directory (the project root).

## API Endpoints

The D&D Mapp - Resources Server currently exposes the following public API endpoint:

-   `GET /server/health`: A simple health check endpoint used to determine the server's liveness and readiness. This endpoint is also utilized by the Docker `HEALTHCHECK` command.

## License

This project is licensed as **"All Rights Reserved"** by [NoNamer777](https://github.com/NoNamer777). For full details regarding the terms and conditions, please refer to the [LICENSE](https://github.com/dnd-mapp/dma-resources-server/blob/main/LICENSE) in the repository.

## Support

If you encounter any issues, have questions, or wish to contribute, please refer to our [CONTRIBUTING.md](https://github.com/dnd-mapp/dma-resources-server/blob/main/CONTRIBUTING.md) or open an issue on the [GitHub repository](https://github.com/dnd-mapp/dma-resources-server/issues).
