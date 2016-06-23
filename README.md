# angular-feet

AngularJS wrapper module for the [10,000ft API](https://www.10000ft.com/plans/reference/api-documentation/overview#top).

## Quick start

- Install angular-feet with [bower](https://github.com/bower/bower):

```
$ bower install angular-feet --save
```

- Include the required libraries in your ```index.html```:

```
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-feet/angular-feet.js"></script>
```

- Inject ```angularFeetProvider``` provider in your app's config. Also add your 10kft API settings:

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

- In the root folder:

```
$ cd angular-feet/example
$ http-server
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
