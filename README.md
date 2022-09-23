# FantasyStock

FantasyStock is made to have fun and easy to use, risk-free experience for our game’ifed version of the stock market.

## Install

Before installing, download and install the latest LTS Node.js and Mongodb. You will also need to install nodemon through npx. (Downloading Node.js should install npm/npx, however, if it does not then download those as well)

If this is a new project, make sure to run npm install on both the frontend directory and the backend directory.

You will need to create a '.env' file in the backend directory with all the environment varibles needed for this project.
These include: 
DB_HOST
ALPHA_VANTAGE_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
PORT
SESSION_SECERET

For development purposes:
- DB_HOST has to be mongodb://localhost:27017/fantasystock to be ran locally
- ALPHA_VANTAGE_KEY will be what is assigned after signing up to Alpha Vantage
- GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET will be what is assigned after signing up for Google API https://console.cloud.google.com/apis/credentials/oauthclient the Authorized redirect URIs google will ask for should be: http://localhost:5000/register/google/callback
- PORT has to be port 5000, because of the redirect URI given to google, You can change them both aslong as they match.
- SESSION_SECERET can be whatever you want.

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
