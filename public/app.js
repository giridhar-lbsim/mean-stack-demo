			var myApp = angular.module('myApp', []);

			myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
				console.log("AppCtrl");


				var refresh = function(){
					$http.get('/contact').success(function(response){
						$scope.contactlist = response;
						$scope.contact = "";
					});

				}
				refresh();
				$scope.addContact = function(contact){
					if(contact){
						$http.post('/contact',contact).success(function(response){
							refresh();
						});

					}

				};
				$scope.removeContact = function(id){
					$http.delete('/contact/'+id).success(function(response){
						refresh();
					});

				};
				$scope.editContact = function(contact){
					if(contact){
						$scope.contact = angular.copy(contact);
					}
				};
				$scope.updateContact = function(contact){
					if(contact && contact._id){
						$http.put('/contact/'+contact._id, contact).success(function(response){
							refresh();
						});
					}


				};
			}]);