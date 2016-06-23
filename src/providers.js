function getAPI(config, $http) {
  return function (path, callback, params) {
    var parameters = {
      method: params ? params.method : 'GET',
      url: config.baseUrl + path
    };
    callback = callback || function () {
        };

    if (config.perPage) {
      if (parameters.method == 'GET') {
        parameters.url = parameters.url + '?per_page=' + config.perPage + '&auth=' + config.apiKey;
      }
    }

    angular.extend(parameters, params || {});

    return $http(parameters)
        .then(callback, function (response) {
          throw (response);
        });
  }
}

function indexOfProperty(accum, current) {
    for (var i = 0; i < accum.length; i++) {
        if (accum[i].assignable_id == current.assignable_id) {
            return i;
        }
    }
    return -1;
}

function angularFeetProvider($httpProvider) {

  var config = {};

  this.configure = function (userConfig) {
    $httpProvider.defaults.headers.common['auth'] = config.apiKey;
    config = userConfig
  };

  this.$get = function ($http) {

    var api = getAPI(config, $http);

    return {
      leaveTypes: function (callback) {
        return api('/leave_types', callback);
      },

      projects: function (userId, callback) {
        return api('/users/' + userId + '/assignments/', callback);
      },

      project: {
        all: function (callback) {
          return api('/projects', callback);
        },
        create: function (params, callback) {
          return api('/projects', callback, {method: 'POST', params: params});
        },
        delete: function (id, callback) {
          return api('/projects/' + id, callback, {method: 'DELETE'});
        },
        get: function (id, callback) {
          return api('/projects/' + id, callback);
        },
        timeEntries: function (id, callback) {
          return api('/projects/' + id + '/time_entries', callback);
        },
        update: function (project, callback) {
          var params = {
            id: project.id,
            name: project.name,
            ends_at: project.ends_at
          };
          return api('/projects/' + project.id, callback, {method: 'PUT', params: params});
        },
        users: function (id, callback) {
          return api('/projects/' + id + '/users', callback);
        }
      },

      // https://www.10000ft.com/plans/reference/api-documentation/users
      users: {
        get: function (id, callback) {
          // TODO: optional parameters
          return api('/users/' + id, callback, {method: 'GET', params: {fields: 'tags'}});
        },

        all: function (callback) {
          // TODO: optional parameters
          return api('/users', callback, {method: 'GET', params: {fields: 'tags'}});
        },

        create: function (user, callback) {
          return api('/users', callback, {method: 'POST', params: user});
        },

        // A user cannot be deleted by the API. A user can be archived by setting the optional parameter
        // archived to true, it can also be unarchived by setting the optional parameter archived to false.
        // You cannot archive the account owner.

        //delete: function(id, callback) {
        //    _api('/users/' + id, { method: 'DELETE'}, callback)
        //},

        archive: function (id, flag, callback) {
          return api('/users/' + id, callback, {method: 'PUT', params: {archived: flag}});
        },

        update: function (id, params, callback) {
          return api('/users/' + id, callback, {method: 'PUT', params: params});
        },

        tags: {
          // https://www.10000ft.com/plans/reference/api-documentation/user-tags#top
          get: function (id, callback) {
            return api('/users/' + id + '/tags', callback);
          },
          create: function (id, val, callback) {
            return api('/users/' + id + '/tags', callback, {method: 'POST', params: {value: val}});
          },
          delete: function (itemId, tagId, callback) {
            return api('/users/' + itemId + '/tags/' + tagId, callback, {method: 'DELETE'});
          }
        },

        projects: function (userId, loadedProjects, callback) {
          return api('/users/' + userId + '/assignments', function(data){
            var userProjects = [],
                uniqAssignment = data.data.data.reduce(function(accum, current){
                  if (indexOfProperty(accum,current) < 0 ) accum.push(current);
                  return accum;
                },[]);

            uniqAssignment.forEach(function(assignment){
              loadedProjects.forEach(function(loadedProject){
                if (assignment.assignable_id === loadedProject.id) {
                  userProjects.push(loadedProject);
                }
              })
            });

            callback(userProjects)
          })

        },

        assignments: {
          // TODO: optional parameters: from and to
          get: function (userId, assignmentId, callback) {
            return api('/users/' + userId + '/assignments/' + assignmentId, callback);
          },
          // TODO: optional parameters: from and to
          all: function (userId, callback) {
            return api('/users/' + userId + '/assignments', callback);
          },
          create: function (userId, val, callback) {
            return api('/users/' + userId + '/assignments', callback, {
              method: 'POST',
              params: {value: val}
            });
          },
          delete: function (userId, assignmentId, callback) {
            return api('/users/' + userId + '/assignments/' + assignmentId, callback, {method: 'DELETE'});
          }

        }
      }
    }
  };
  
  this.$get.$inject = ['$http'];
}

angularFeetProvider.$inject = ['$httpProvider'];

exports.angularFeet = angularFeetProvider;
