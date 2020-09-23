# TypeScript Drag Physics

## Install

1. Build and start the `docker` environment: `docker-compose up -d --build`
2. Install `yarn` dependencies: `docker-compose exec node sh -c 'yarn install'`
3. Build `webpack` assets: `docker-compose exec node sh -c 'yarn webpack'`
4. Open `index.html` in your browser of choice

### Develop

`docker-compose exec node sh -c 'yarn webpack --mode=development --devtools=inline-source-map' --watch`

