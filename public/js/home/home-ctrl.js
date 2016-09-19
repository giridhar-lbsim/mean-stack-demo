angular.module('home',[]).config(function($stateProvider){
	$stateProvider.state('home',{
		url: '/home',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl'
	});
}).controller('HomeCtrl', function( $scope, $state ) {
	console.log("HomeCtrl");
	// $state.go( 'login' );
} );