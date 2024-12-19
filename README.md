# Greek Gods Arena

## Local Development

Fill the requested environment variables in **./api/.env** and **./client/.env**

### With Docker

**Docker** Must be installed on your computer.

Install the **Dev Container** VSCode extension.

In the command palette of VSCode, choose : Dev Containers : Open folder in container

VSCode reopens the folder in the container configured in .devcontainer folder and install all the dependencies.

```sh
cd api/
npm run dev
```

```sh
cd client/
npm run dev
```

### Without Docker

You will need to install on your machine :

- Python
- Node
- node-modules
- mongodb (or create a database in mongo cloud atlas)

An then :

```sh
cd api/
npm run dev
```

```sh
cd client/
npm run dev
```
