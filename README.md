# Blamegame
Git hooks based game with a socket server chat frontend

## What does it do?
A slack inspired chat app built in react that connects to a server driving git hooks game features.
All of the expected features of a real-time chat app with the addition of 'game' features. When a git hook is triggered from a participating repo, the frontend will consume the socket message and emit a notification to all those participating in that game. From the git hook server message, the targetted user can perform the corresponding consequence and claim points. Each game is configurable based on the ruleset mapping between git hook <-> consequence.

## How is it built?
The frontend is based on create-react-app and all components are pure react functions. Any interaction with the backend express server is handled from the `axios` package.

## Instalation
From a fresh `git clone`...
  - Ensure you are on the proper node version [n](https://github.com/tj/n#installation) or [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is reccomended to manage your node versions
    - Current targetted node version is [here](https://github.com/Original-heapsters/blamegame/blob/main/.nvmrc)
  - `npm install`
  - Make sure `REACT_APP_API_SERVER` env var is set to `https://blame-game-api.onrender.com`
    - When you get setup with docker and the backend server you can switch to the local development
  - `npm start`

## How to contribute
See [CONTRIBUTING](https://github.com/Original-heapsters/blamegame/blob/main/.github/contributing.md) for the most up to date guidelines for contributing
