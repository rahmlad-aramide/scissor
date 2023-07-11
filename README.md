# Project Scissor

A url shortening application, still in progress...

## Table of Contents

- [Scissor](#scissor)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Backend API](#backend-api)
  - [Dependencies](#dependencies)
  - [Other Activities](#other-activities)

## About

Brief is the new black, this is what inspires the team at Scissor. In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. From music, speeches, to wedding receptions, brief is the new black. Scissor is a simple tool which makes URLs as short as possible.

## Features

- URL Shortening:
Scissor allows users to shorten URLs by pasting a long URL into the Scissor platform and a shorter URL gets automatically generated. The shortened URL is designed to be as short as possible, making it easy to share on social media or through other channels.
- Custom URLs:
Scissor also allows users to customize their shortened URLs. Users can choose their own custom domain name and customize the URL to reflect their brand or content. This feature is particularly useful for individuals or small businesses who want to create branded links for their 
- QR Code Generation:
Scissor allows users to also generate QR codes for the shortened URLs. Users can download the QR code image and use it in their promotional materials or/and on their website. This feature will be implemented using a third-party QR code generator API, which can be integrated into the Scissor platform.
- Analytics:
Scissor provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and where the clicks are coming from.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org) (version 19.7.0)
- [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) (preferred)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahmlad-aramide/scissor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd scissor
   ```

3. Install the dependencies:

   ```bash
   yarn install
   # or 
   npm install
   ```

### Usage

1. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173/` to see the application running.

3. Start coding and modify the project as per your requirements.

### Building for Production

To create a production-ready build of your project, run the following command:

```bash
yarn build
#or 
npm run build
```

This will generate an optimized build in the `dist` directory, ready for deployment.

## Backend API 

The backend api used: `http://cutly.onrender.com` and its documentation can be accessed on `http://cutly.onrender.com/docs`

## Dependencies

These are the main dependencies and their versions used in the project.

- [React](https://reactjs.org) (version 18.2.0)
- [React Router Dom](https://reactrouter.com) (version 6.11.2)
- [React Router Hashlink](https://github.com/rafgraph/react-router-hash-link) (version 2.4.3)
- [Firebase](https://firebase.google.com) (version 9.22.1)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) (version 9.1.3)
- [Clipboard Copy](https://www.npmjs.com/package/clipboard-copy) (version 4.0.1)

## Other Activities

- Wrote component tests for: 
  - `App Component`
  - `Button Component`
  - `Input Component`
##
- Wrote unit tests for: 
  - `WhyScissor Component`
  - `Revolutionize Component`