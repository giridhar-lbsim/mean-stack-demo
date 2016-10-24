angular.module('user',[]).config(function($stateProvider){
	$stateProvider.state('user',{
		url: '/user/:id',
		templateUrl: 'js/user/user.html',
		controller: 'UserCtrl',
		resolve:{
			user: function($stateParams, UserService){
				console.log('id in resolve: ',$stateParams.id);
				return UserService.findUserById($stateParams.id);
			}
		}
	});
}).controller('UserCtrl',function($scope, $state, user){
	$scope.userCtrl = {
		user:user.data
	};
});