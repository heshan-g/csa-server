# Courier Service App - Server

The API that the Courier Service App (client) connects to.

## Getting started

1. Clone this project and `cd` into it.

    ```shell
    git clone https://github.com/heshan-g/csa-server

    cd csa-server
    ```

1. Install project dependencies.

    ```shell
    yarn
    ```

1. Create the JWT key pair. Run the following script and hit Enter when prompted (use empty passphrase).

    ```shell
    bash ./scripts/jwtRS256.sh
    ```

1. Create the `.env` file. Refer to the template at `.env.example`

1. Start server in watch mode.

    ```shell
    yarn dev
    ```

1. Check server health by making a GET request to `/health-check`

