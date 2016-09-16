			var myApp = angular.module('myApp', ['ui.router','home']).config( function( $urlRouterProvider ) {
				$urlRouterProvider.otherwise( '/home' );
			} ).run(function(){
				console.log('agular app is running');
			});

			myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
				console.log("AppCtrl");


				var refresh = function(){
					$http.get('/contact').success(function(response){
						console.log('response of GET req:',response);
						$scope.contactlist = response;
						$scope.contact = "";
					});

				}
				refresh();
				$scope.addContact = function(contact){
					console.log('contact in ctrl',contact);
					if(contact){
						$http.post('/contact',contact).success(function(response){
							console.log("response of post req:",response);
							refresh();
						});

					}

				};
				$scope.removeContact = function(id){
					console.log("remove contact call");
					$http.delete('/contact/'+id).success(function(response){
						console.log('response of DELETE req:',response);
						refresh();
					});

				};
				$scope.editContact = function(contact){
					if(contact){
						$scope.contact = contact;
					}
				};
				$scope.updateContact = function(contact){
					console.log('ctrl: contact in PUT req:',contact);
					if(contact && contact._id){
						$http.put('/contact/'+contact._id, contact).success(function(response){
							console.log('response of PUT req',response);
							refresh();
						});
					}


				};
			}]);