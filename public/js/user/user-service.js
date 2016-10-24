angular.module('app').factory('UserService',  function($http){
	return {
		findUserById: function(id){
			console.log('id in  service :',id);
			return $http.post('/user/find-by-id/'+id);
		}
		
	};
});