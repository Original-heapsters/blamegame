# Welcome to blame game contributing guide!

## How to contribute
This repository uses the git feature branch flow for development and github actions for CI/CD. In order to best contribute, you should visit the [issues](https://github.com/Original-heapsters/blamegame/issues) or [project](https://github.com/orgs/Original-heapsters/projects/2/views/1) pages to see what is available to be worked on.

## Github project
The github [project](https://github.com/orgs/Original-heapsters/projects/2/views/1) represents our AGILE board aka (JIRA, trello, sprint board). [Info on what AGILE is](https://www.atlassian.com/agile)

## Git feature branch flow
This project uses git feature branches to get code merged to 'main'. For some in depth background, reference [this](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

A TLDR example of how work should be started from a fresh clone would look like this:
  - git fetch --all
  - git checkout main
  - git pull origin main
  - git checkout -b 15-myFeature
  - *Do work*
  - git add -A
  - git commit -m "Added my feature **fixes #15**"
  - git push origin 15-myFeature
  - *visit the [PR page](https://github.com/Original-heapsters/blamegame/pulls) and open one against your branch*
  - Finally, repeat endlessly
In this instance the developer has worked on issue #15. The branch name will be prefixed by the issue number. The other component is the smart commit message, it should include the phrase "fixes #15" to connect it to the issue being worked on.

## Git commit <-> issue connection
Using github commit linking a developer can connect their work to a specific issue. The most important piece to include in commit messages is **fixes #[your issue number]** (ie. **fixes #15**)
For detailed info, see [this page](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

## Developer Environment
The project is built using [create-react-app](https://create-react-app.dev)(CRA) and connects to an external express backend. To start development, make sure you are on node 18+ and npm install.
CRA comes with built in environment variable management. At the moment, there is `REACT_APP_API_SERVER` to connect to the backend. You can replace this assignment with the value at `LOCAL_REACT_APP_API_SERVER` if you have the backend running locally. Otherwise, use the value `PROD_REACT_APP_API_SERVER` to develop against the live backend.

## Github actions
Github actions is responsible for the continuous integration and continuous deployment cycle of blamegame. When you create a pull request, there will be a linting action kicked off to enforce code style. Details [here](https://github.com/Original-heapsters/blamegame/blob/main/.github/workflows/install_and_lint.yaml)
Once your PR has been merged, there will be another action kicked off to deploy the frontend to github pages. Details [here](https://github.com/Original-heapsters/blamegame/blob/main/.github/workflows/deploy.yaml)

## Automatic deployments
Blamegame is deployed to github pages [here](https://original-heapsters.github.io/blamegame/) and talks to the backend service [here](https://blame-game-api.onrender.com/alive)
