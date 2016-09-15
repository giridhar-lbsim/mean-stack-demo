			var myApp = angular.module('myApp', []);

			myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
				console.log("AppCtrl");


				var refresh = function(){
					$http.get('/contactlist').success(function(response){
						console.log('response of GET req:',response);
						$scope.contactlist = response;
						$scope.contact = "";
					});

				}
				refresh();
				$scope.addContact = function(contact){
					console.log('contact in ctrl',contact);
					if(contact){
						$http.post('/contactlist',contact).success(function(response){
							console.log("response of post req:",response);
							refresh();
						});

					}

				};
				$scope.removeContact = function(id){
					console.log("remove contact call");
					$http.delete('/contactlist/'+id).success(function(response){
						console.log('response of DELETE req:',response);
						refresh();
					});

				};
				$scope.editContact = function(id){
					$http.get('/contactlist/'+id).success(function(response){
						$scope.contact = response;
					});

				};
				$scope.updateContact = function(contact){
					console.log('ctrl: contact in PUT req:',contact);
					if(contact && contact._id){
						$http.put('/contactlist/'+contact._id, contact).success(function(response){
							console.log('response of PUT req',response);
							refresh();
						});
					}


				};
			}]);