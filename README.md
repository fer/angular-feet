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

In the root folder:
```
http-server
```