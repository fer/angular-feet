'use strict';

var deps = [
    'angularFeet',
    'ngRoute'
];

apiItems.forEach(function(item){
    deps.push(item.modCtrl)
});

angular
    .module('demo', deps)
    .config(function (angularFeetProvider, $routeProvider) {
        angularFeetProvider.configure(config10Kft);

        apiItems.forEach(function(item){
            $routeProvider.when('/' + item.route,  {
                templateUrl: item.tplUrl,
                controller: item.ctrl
            })
        });

        $routeProvider.otherwise('/' + apiItems[0].route)
    })
    .controller('MainCtrl', function ($rootScope) {
        $rootScope.menuItems = apiItems;
        $rootScope.section = getCurrentItemFromUrl()
    });

var myFunc = function($rootScope){
    $rootScope.section = getCurrentItemFromUrl()
};

function phasesController($scope, angularFeet, $rootScope){
    $rootScope.section = getCurrentItemFromUrl();

    $scope.$on('all', function(){
        angularFeet.project.all(function(data){
            $scope.projects = data.data.data;
            if (!$scope.$$phase) $scope.$apply()
        })
    });

    $scope.$broadcast('all');

    $scope.selectProject = function(project) {
        angularFeet.project.phases(project.id, function(users) {
            $scope.users = users.data;
            $scope.selectedProject = project;
            console.log(Object.keys(project))
        })
    }
}

function userPerProjectController($scope, $log, angularFeet) {    
    angularFeet.project.all(function(data){
        $scope.projects = data.data.data;
        if (!$scope.$$phase) $scope.$apply()
    })

    $scope.getUsersPerProject = function(project) {        
        angularFeet.project.users(project.id, function(data){

            $log.info('Users: ', data);
            $scope.users = data.data.data;
        });
    }
}

function projectsController($scope, $log, angularFeet, $rootScope){
    $rootScope.section = getCurrentItemFromUrl();

    $scope.$on('all', function(){
        angularFeet.project.all(function(data){
            $scope.projects = data.data.data;
            if (!$scope.$$phase) $scope.$apply()
        });
    });

    $scope.$broadcast('all');

    $scope.deleteProject = function(project) {
        angularFeet.project.delete(project.id);
        $scope.$broadcast('all')
    };

    $scope.selectProject = function(project) {
        angularFeet.project.users(project.id, function(users) {
            $scope.users = users.data;
            $scope.selectedProject = project;
            console.log(Object.keys(project))
        })
    };

    $scope.updateProject = function(project){
        angularFeet.project.update(project)
    };

    $scope.createProject = function() {
        angularFeet.project.create({
            name: 'My Project',
            starts_at: '2015-03-01',
            ends_at: '2015-06-01'
        })
    };

    angularFeet.leaveTypes(function(data){
        $scope.leaveTypes = data.data.data
    });
}


function assignmentsController($scope, $rootScope, angularFeet, $log) {
    $rootScope.section = getCurrentItemFromUrl();    
    
    angularFeet.users.all(function(users){
        $scope.users = users.data.data;
        $log.info($scope.users);
    });

    $scope.selectAssignment = function(assignment) {        
        $scope.selectedAssignment = assignment;
    };

    $scope.getAssignmentPerUser = function(user) {
        angularFeet.users.assignments.all(user.id, function(data){
            $scope.assignments = data.data.data
        });

        angularFeet.project.all(function(projects){
            angularFeet.users.projects(user.id, projects.data.data, function(data){
                $scope.projects = data
            })
        })
    }
}

function usersController($scope, $log, angularFeet, $rootScope) {

    $rootScope.section = getCurrentItemFromUrl();

    $scope.$on('all', function(){
        angularFeet.users.all(function(users){
            $scope.users = users.data.data;
            $log.info($scope.users);
            if (!$scope.$$phase) $scope.$apply()
        })
    });

    $scope.$broadcast('all');

    $scope.getTags = function(user) {
        angularFeet.users.tags.get(user.id, function(resp) {
            $log.info(resp.data.data)
        })
    };

    $scope.createTag = function(user){
        angularFeet.users.tags.create(user.id, 'valor', function(resp) {
            console.log(resp)
        })
    };

    $scope.deleteTag = function(userId, tagId) {
        angularFeet.users.tags.delete(userId, tagId, function(resp){
            $log.info(resp)
        })
    };

    $scope.selectUser = function(user){
        angularFeet.users.get(user.id, function(user){
            $scope.selectedUser = user.data;
            angularFeet.users.tags.get($scope.selectedUser.id, function(tags){
                $log.info(tags)
            })
        })
    };

    $scope.createAll = function(){
        usuarios.forEach(function(usuario){
            angularFeet.users.create(usuario, function(newUser){
                $log.info(newUser)
            })
        })
    };

    $scope.archiveAll = function(){
        angularFeet.users.all(function(users) {
            users.data.data.forEach(function(user){
                angularFeet.users.archive(user.id, true, function (result) {
                    $log.info(result)
                })
            })
        })
    };

    $scope.archiveUser = function(user){
        angularFeet.users.archive(user.id, true, function(result){
            $log.info(result);
            $scope.$broadcast('all')
        })
    }
}

// ######################################################################
// Module instantiation
// ######################################################################

apiItems.forEach(function(item){
    try {
        angular.module(item.modCtrl, []).controller(item.ctrl, eval(item.ctrl));
        console.info('Loaded ', item.ctrl)
    } catch(e) {
        angular.module(item.modCtrl, []).controller(item.ctrl, myFunc)
    }
});