'use strict';
(function () {
    angular.module('chordsApp').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/chords');

        $stateProvider
            .state('chords', {
                url: '/chords',
                templateUrl: 'app/chords/chords.html',
                controller: 'ChordsCtrl as vm'
            })
    });

})();
