# Project: Evaluate article news with NLP

## Introduction

This project is a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.

We make use of an external API called MeaningCloud to interact with their NLP system. This tool helps classify the information available in the article, such as whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

## Architecture

The application adopts a client-server architecture model facilitated by Express, a web application framework for Node.js. Express helps in setting up the server side of the application which involves listening to requests and sending responses.

On the client-side, the application utilizes Webpack as a static module bundler for modern JavaScript applications. Webpack takes care of bundling the JavaScript files and other assets like CSS, images, and converts them into a format that’s suitable for the browser to process. We have separate configurations for development (`webpack.dev.js`) and production (`webpack.prod.js`) environments, each tailored with its specific set of plugins and configuration settings.


## Installation

1. Clone the project to your local system
2. Run `npm install` to install all the dependencies
3. Create a `.env` file in the root of your project
4. Inside the `.env` file, set up your API key from MeaningCloud like so: `API_KEY=XXXXX`. Replace `XXXXX` with your actual key.

## Usage

To start the application server, use `npm start`.

To build the application for development and open it in a web browser, use `npm run build-dev`.

To build the application for production, use `npm run build-prod`.

## Testing

To run the test suite, use `npm run test`.
