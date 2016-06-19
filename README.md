# angular-feet

AngularJS wrapper module for the [10,000ft API](https://www.10000ft.com/plans/reference/api-documentation/overview#top).

# Install 

```
bower install angular-feet --save
```

```
app.config(function(angularFeetProvider) {
    var config= {
        apiKey: '', 
        baseUrl: '',  
        perPage: 1234
    };
    angularFeetProvider.configure(config) 
});
```

## In the root folder:
```
http-server
```


# Building the project:

## Pre-requisites

* jspm
* jspm-bower-endpoint

## Install

```
npm install -g jspm
npm install -g jspm-bower-endpoint
jspm registry create bower jspm-bower-endpoint
jspm install
``

## Build
```
jspm bundle-sfx src/index dist/index.js
```
#### TODO include an automatic build process
