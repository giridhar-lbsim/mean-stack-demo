angular.module('login',[]).config(function($stateProvider){
	$stateProvider.state('login',{
		url: '/login',
		templateUrl: 'js/home/home.html',
		controller: 'LoginCtrl'
	});
}).controller('LoginCtrl', function( $scope, $state ) {
	console.log("LoginCtrl");
	$state.go( 'home' );
} );