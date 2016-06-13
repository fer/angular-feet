'use strict';

function _api(config, path, params, callback, $http){
    var parameters = {
        method: params ? params.method : 'GET',
        url: config.baseUrl + path
    };

    if (config.perPage) {
        if (parameters.method == 'GET') {
            parameters.url = parameters.url + '?per_page=' + config.perPage;
        }
    }

    angular.extend(parameters, params);

    $http(parameters).then(callback, function(response) {
        throw (response)
    })
}

angular.module('angularFeet', [])
    .provider('angularFeet', function($httpProvider){

        var config = {};

        this.configure = function(userConfig) {
            $httpProvider.defaults.headers.common.auth = config.apiKey;
            config = userConfig
        };

        this.$get = function($http) {

            return {
                leaveTypes: function(callback){
                    _api(config, '/leave_types', null, callback, $http)
                },
                project: {
                    all: function(callback){
                        _api(config, '/projects', null, callback, $http)
                    },
                    create: function(params, callback){
                        _api(config, '/projects', { method: 'POST', params: params }, callback, $http)
                    },
                    delete: function(id, callback) {
                        _api(config, '/projects/' + id, { method: 'DELETE'}, callback, $http)
                    },
                    get: function(id, callback) {
                        _api(config, '/projects/' + id, null, callback, $http)
                    },
                    timeEntries: function(id, callback) {
                        _api(config, '/projects/' + id + '/time_entries', null, callback, $http)
                    },
                    update: function(project, callback) {
                        var params = {
                            id: project.id,
                            name: project.name,
                            ends_at: project.ends_at
                        };
                        _api(config, '/projects/' + project.id, { method: 'PUT', params: params }, callback, $http)
                    },
                    users: function(id, callback) {
                        _api(config, '/projects/' + id + '/users', null, callback, $http)
                    }
                },

                // https://www.10000ft.com/plans/reference/api-documentation/users
                users: {
                    get: function(id, callback){
                        // TODO: optional parameters
                        _api(config, '/users/' + id , {method: 'GET', params: { fields: 'tags' } }, callback, $http)
                    },

                    all: function(callback){
                        // TODO: optional parameters
                        debugger;
                        _api(config, '/users', {method: 'GET', params: { fields: 'tags' } }, callback, $http)
                    },

                    create: function(user, callback) {
                        _api(config, '/users', { method: 'POST', params: user }, callback, $http)
                    },

                    // A user cannot be deleted by the API. A user can be archived by setting the optional parameter
                    // archived to true, it can also be unarchived by setting the optional parameter archived to false.
                    // You cannot archive the account owner.

                    //delete: function(id, callback) {
                    //    _api(config, '/users/' + id, { method: 'DELETE'}, callback, $http)
                    //},

                    archive: function(id, flag, callback) {
                        var params = {
                            archived: flag
                        };

                        _api(config, '/users/' + id, { method: 'PUT', params: params}, callback, $http)
                    },

                    update: function(id, params, callback) {
                        _api(config, '/users/' + id, { method: 'PUT', params: params }, callback, $http)
                    },

                    tags: {
                        // https://www.10000ft.com/plans/reference/api-documentation/user-tags#top
                        get: function(id, callback) {
                            _api(config, '/users/' + id + '/tags', {}, callback, $http)
                        },
                        create: function(id, val, callback) {
                            _api(config, '/users/' + id + '/tags', { method: 'POST', params: { value: val }}, callback, $http)
                        },
                        delete: function(itemId, tagId, callback) {
                            _api(config, '/users/' + itemId + '/tags/' + tagId, { method: 'DELETE' }, callback, $http)
                        }
                    },

                    assignments: function(id, callback) {
                        _api(config, '/users/' + id + '/assignments', {}, callback, $http)
                    }
                }
            }
        }
    });