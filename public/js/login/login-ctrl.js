angular.module('login',[]).config(function($stateProvider){
	$stateProvider.state('login',{
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	});
}).controller('LoginCtrl', function( $scope, $state, LoginService ) {
	$scope.loginCtrl = {
		loginDto: {}
	};
	$scope.login = function( loginDto ) {
		console.log("loginDto in controller",loginDto);
		LoginService.login( loginDto).success( function( response ) {
			// $scope.successMessage = response.messages[0];
			console.log('success response of login call: ',response);

			if(response && response._id){
				// toastr.success( $scope.successMessage );
				$state.go('user',{id:response._id});
				
			}else{
				$scope.loginCtrl.loginDto = "";
			}


		} ).error( function( response ) {
			toastr.error( $scope.errorMessage );
		} );
	};
	$scope.goToHomePage = function() {
		$state.go('signup');
	};
} );