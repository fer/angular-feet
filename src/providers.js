function getApi($http, config) {
  return function(path, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }
    let parameters = {
      method: params.method || 'GET',
      url: config.baseUrl + path
    };

    if (config.perPage && parameters.method === 'GET') {
      parameters.url += '?per_page=' + config.perPage;
    }

    parameters = angular.extend(parameters, params);

    $http(parameters)
      .then(
        callback,
        response=> {
          throw (response)
        }
      );
  };
}

function angularFeetProvider($httpProvider) {
  var config;

  this.configure = function(configuration) {
    config = configuration;
    $httpProvider.defaults.headers.common['auth'] = config.apiKey;
  };

  this.$get = function($http) {
    var api = getApi($http, config);

    return {
      leaveTypes: function(callback) {
        return api('/leave_types', callback);
      },

      // https://www.10000ft.com/plans/reference/api-documentation/projects
      // TODO: list projects with sorting
      // TODO: filter projects
      project: {
        all: function(callback) {
          return api('/projects', callback);
        },
        create: function(params, callback) {
          return api('/projects', {method: 'POST', params: params}, callback);
        },
        delete: function(id, callback) {
          const url = '/projects/' + id;
          return api(url, {method: 'DELETE'}, callback);
        },
        get: function(id, callback) {
          const url = '/projects/' + id;
          return api(url, callback);
        },
        timeEntries: function(id, callback) {
          const url = '/projects/' + id + '/time_entries';
          return api(url, callback);
        },
        update: function(project, callback) {
          const url = '/projects/' + project.id;
          return api(url, {method: 'PUT', params: project}, callback);
        },
        users: function(id, callback) {
          const url = '/projects/' + id + '/users';
          return api(url, callback);
        }
      },

      // https://www.10000ft.com/plans/reference/api-documentation/users
      users: {
        get: function(id, callback) {
          const url = '/users/' + id;
          return api(url, {method: 'GET', params: {fields: 'tags'}}, callback);
        },

        all: function(callback) {
          return api('/users', {method: 'GET', params: {fields: 'tags'}}, callback)
        },

        create: function(user, callback) {
          return api('/users', {method: 'POST', params: user}, callback)
        },

        // A user cannot be deleted by the API. A user can be archived by setting the optional parameter
        // archived to true, it can also be unarchived by setting the optional parameter archived to false.
        // You cannot archive the account owner.

        //delete: function(id, callback) {
        //    _api('/users/' + id, { method: 'DELETE'}, callback)
        //},

        archive: function(id, flag, callback) {
          const url = '/users/' + id;
          return api(url, {method: 'PUT', params: {archived: flag}}, callback)
        },

        update: function(id, params, callback) {
          const url = '/users/' + id;
          return api(url, {method: 'PUT', params: params}, callback)
        },

        tags: {
          // https://www.10000ft.com/plans/reference/api-documentation/user-tags#top
          get: function(id, callback) {
            const url = '/users/' + id + '/tags';
            return api(url, callback);
          },
          create: function(id, value, callback) {
            const url = '/users/' + id + '/tags';
            return api(url, {method: 'POST',params: {value: value}}, callback);
          },
          delete: function(itemId, tagId, callback) {
            const url = '/users/' + itemId + '/tags/' + tagId;
            return api(url, {method: 'DELETE'}, callback);
          }
        },

        assignments: function(id, callback) {
          const url = '/users/' + id + '/assignments';
          return api(url, callback);
        }
      }
    }
  };

  this.$get.$inject = ['$http'];
}

angularFeetProvider.$inject = ['$httpProvider'];

exports.angularFeet = angularFeetProvider;
