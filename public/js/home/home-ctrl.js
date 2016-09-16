angular.module('home',[]).config(function($stateProvider){
	$stateProvider.state('home',{
		url: '/home',
		template: '<div>Home view</div>',
		controller: 'HomeCtrl'
	});
}).controller('HomeCtrl', function( $scope, $state ) {
	console.log("HomeCtrl");
	// $state.go( 'login' );
} );