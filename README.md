# wltt

A command line script that scrapes the test website and returns a JSON array sorted by annual price,
most expensive first.

## Running the code locally

The code was developed and tested on Node v18.13.x (current LTS) - your milage may vary on earlier versions.

### Install the dependencies:
```
npm install
```

### Run the tests
```
npm run test
```

### Run the script:
```
node src/index.js [url]
```
where `[url]` is the address of the test website (optional - it defaults to the url provided in the spec)

### Show help:
```
node src/index.js --help
```

## Running the script via Docker

The code includes a [Dockerfile](Dockerfile) allowing the script to be run inside a container.

### Build the Docker image
```
docker build -t wltt .
```

### Run the scraper
```
docker run --rm wltt
```

### Run the tests

Open an interactive shell:
```
docker run --rm -it wltt sh

```

Run the tests:
```
npm run test
```
