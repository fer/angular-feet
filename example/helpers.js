function filterControllerFromApiItem(controllerName){
    var result = apiItems.filter(function(item){
        return item.ctrl === controllerName
    });

    return result.length !== 0 ? result[0] : false
}

function strToHyphenated(str){
    return str.replace(/ +/g, '-').toLowerCase()
}

function toCamelCase(str){
    var result = '';

    str.split(' ').forEach(function(word, i){
        result = (i === 0) ? word.toLowerCase() : result + word.charAt(0).toUpperCase() + word.slice(1)
    });

    return result
}

function getCurrentItemFromUrl(){
    return apiItems.filter(function(item) {
        return item.route == document.location.hash.replace('#/','')
    })[0]
}