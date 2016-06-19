import angular from 'angular';
import angularRoute from 'angular-route';
import providers from './providers';

const deps = [];

angular
  .module('angularFeet', deps)
  .provider(providers);
