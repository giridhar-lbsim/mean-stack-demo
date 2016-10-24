angular.module( 'app' ).factory( 'LoginService', function( $http ) {
	return {
		login: function( loginDto ) {
			console.log("loginDto in service",loginDto);
			return $http.post('login',loginDto);
		}
	};
} );
