# FantasyStock

FantasyStock is made to have fun and easy to use, risk-free experience for our game’ifed version of the stock market.

## Install

Before installing, download and install the latest LTS Node.js, Mongodb, and Mongosh (Mongo Shell). You will also need to install nodemon through npm. (Downloading Node.js should install npm/npx, however, if it does not then run 'npm -g i nodemon').

Before installing, download and install the latest LTS Node.js, Mongodb, and Mongosh (Mongo Shell). You will also need to install nodemon through npm. (Downloading Node.js should install npm/npx, however, if it does not then download those as well). To install nodemon you will run 'npm -g i nodemon'.


If this is a new project, make sure to run npm install on both the frontend directory and the backend directory.

Now, you will need to create a '.env' file in the backend directory with all the environment varibles needed for this project. Additionally, make sure you can that this file has no extension to it, so it doesn't look like '.env.txt' and instead looks like '.env'.
The enviornment varibles needed include: 
- DB_HOST
- ALPHA_VANTAGE_KEY
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- PORT
- SESSION_SECERET

For development purposes:
- DB_HOST has to be mongodb://localhost:27017/fantasystock to be ran locally
- ALPHA_VANTAGE_KEY will be what is assigned after signing up to Alpha Vantage https://www.alphavantage.co/
- GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET will be what is assigned after signing up for Google API https://console.cloud.google.com/apis/credentials/oauthclient the Authorized redirect URIs google will ask for should be: http://localhost:5000/register/google/callback
- PORT has to be port 5000, because of the redirect URI given to google, You can change them both aslong as they match.
- SESSION_SECERET can be whatever you want.

Example:
- DB_HOST=mongodb://localhost:27017/fantasystock
- ALPHA_VANTAGE_KEY=aaaaaaaaaaaaaaaaaaaaaaaa
- GOOGLE_CLIENT_ID=aaaaaaaaaaaaaaaaaaaaaaaa
- GOOGLE_CLIENT_SECRET=aaaaaaaaaaaaaaaaaaaaaaaa
- PORT=5000
- SESSION_SECERET=aaaaaaaaaaaaaaaaaaaaaaaa

Now just run 'npm start' in both the backend directory and frontend directory.

## Features

- Users with a google login
- Leagues groups
- Game logic
- League shop
- Simple chat functionality

## People

- Project Manager: Jonah Lozano
- Frontend: Robert Mawhinney
- Backend: Luis Valencia
- Quality Assurance: Quan Nguyen
- UI/UX: Dustin Vang
- Tester: Jaspinder Singh
