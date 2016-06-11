'use strict';

angular.module('angularFeet', [])
    .provider('angularFeet', function($httpProvider){

        this.configure = function(config) {
            $httpProvider.defaults.headers.common['auth'] = config.apiKey;
            this.config = config
        };

        this.$get = function($http) {
            var self = this;

            function _api(path, params, callback){

                var parameters = {
                    method: params.method ? params.method : 'GET',
                    url: self.config.baseUrl + path
                };

                if (self.config.perPage) {
                    if (parameters.method == 'GET') {
                        parameters.url = parameters.url + '?per_page=' + self.config.perPage;
                    }
                }

                angular.extend(parameters, params);

                $http(parameters).then(callback, function(response) {
                    throw (response)
                })
            }

            return {
                leaveTypes: function(callback){
                    _api('/leave_types', null, callback)
                },

                // https://www.10000ft.com/plans/reference/api-documentation/projects
                // TODO: list projects with sorting
                // TODO: filter projects
                project: {
                    all: function(callback){
                        _api('/projects', null, callback)
                    },
                    create: function(params, callback){
                        _api('/projects', { method: 'POST', params: params }, callback)
                    },
                    delete: function(id, callback) {
                        _api('/projects/' + id, { method: 'DELETE'}, callback)
                    },
                    get: function(id, callback) {
                        _api('/projects/' + id, null, callback)
                    },
                    timeEntries: function(id, callback) {
                        _api('/projects/' + id + '/time_entries', null, callback)
                    },
                    update: function(project, callback) {
                        var params = {
                            id: project.id,
                            name: project.name,
                            ends_at: project.ends_at
                        };
                        _api('/projects/' + project.id, { method: 'PUT', params: params }, callback)
                    },
                    users: function(id, callback) {
                        _api('/projects/' + id + '/users', null, callback)
                    }
                },

                // https://www.10000ft.com/plans/reference/api-documentation/users
                users: {
                    get: function(id, callback){
                        // TODO: optional parameters
                        _api('/users/' + id , {method: 'GET', params: { fields: 'tags' } }, callback)
                    },

                    all: function(callback){
                        // TODO: optional parameters
                        _api('/users', {method: 'GET', params: { fields: 'tags' } }, callback)
                    },

                    create: function(user, callback) {
                        _api('/users', { method: 'POST', params: user }, callback)
                    },

                    // A user cannot be deleted by the API. A user can be archived by setting the optional parameter
                    // archived to true, it can also be unarchived by setting the optional parameter archived to false.
                    // You cannot archive the account owner.

                    //delete: function(id, callback) {
                    //    _api('/users/' + id, { method: 'DELETE'}, callback)
                    //},

                    archive: function(id, flag, callback) {
                        var params = {
                            archived: flag
                        };

                        _api('/users/' + id, { method: 'PUT', params: params}, callback)
                    },

                    update: function(id, params, callback) {
                        _api('/users/' + id, { method: 'PUT', params: params }, callback)
                    },

                    tags: {
                        // https://www.10000ft.com/plans/reference/api-documentation/user-tags#top
                        get: function(id, callback) {
                            _api('/users/' + id + '/tags', {}, callback)
                        },
                        create: function(id, val, callback) {
                            _api('/users/' + id + '/tags', { method: 'POST', params: { value: val }}, callback)
                        },
                        delete: function(itemId, tagId, callback) {
                            _api('/users/' + itemId + '/tags/' + tagId, { method: 'DELETE' }, callback)
                        }
                    },

                    assignments: function(id, callback) {
                        _api('/users/' + id + '/assignments', {}, callback)
                    }
                }
            }
        }
    });