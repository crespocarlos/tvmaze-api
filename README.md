# TVMaze Api

### install packages
```
yarn install
```

### Run mongodb docker
```
docker build -t mongodb .
docker run -t -p 27017:27017 -p 28017:28017 --name mongodb mongodb mongod --bind_ip_all
```

### import data
```
yarn start:import
```

### start api
```
yarn start:server
```
## API
ex: http://localhost:3000/shows?page=1

## TODO
unit tests