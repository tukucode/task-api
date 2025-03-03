# Simple CRUD Task API - Express.js & TypeScript

This is a simple CRUD API for managing tasks using Express.js and TypeScript.

## Features
- Create, Read, Update, and Delete (CRUD) operations for tasks.
- Built with Express.js and TypeScript.
- Uses `ts-node` for development and `tsc` for production build.

## Requirements
- Node.js (>=14.x)
- npm or yarn

## Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Scripts

The following scripts are available in the `package.json` file:

### Start the Application
```sh
npm start
# or
yarn start
```
This will run the application using `ts-node` from `src/index.ts`.

### Development Mode
```sh
npm run dev
# or
yarn dev
```
Runs the application in development mode with `nodemon`, which automatically restarts the server on file changes.

### Build the Application
```sh
npm run build
# or
yarn build
```
Compiles TypeScript files into JavaScript and places them in the `dist` directory.

### Serve the Compiled Code
```sh
npm run serve
# or
yarn serve
```
Runs the compiled JavaScript files from the `dist` directory using Node.js.

## Running the API

1. Start the development server:
   ```sh
   npm run dev
   ```
   The server should be running on `http://localhost:3001` (or your configured port).

2. Use an API client (such as Postman) or `curl` to test the endpoints.

## Folder Structure
```
├── src
│   ├── index.ts      # Entry point
│   ├── routes        # API routes
│   ├── controllers   # Request handlers
│   ├── db            # static database task
│   ├── lib           # Derectory global for utlis and constants
│   └── types         # Define type taks model
├── dist              # Compiled JavaScript (after running build)
├── package.json
├── tsconfig.json
└── README.md
```

## License
This project is licensed under the MIT License.

