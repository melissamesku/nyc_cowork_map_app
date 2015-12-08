var app = angular.module('CoworkingSpaces', [])
app.directive('ngcoworkingspaces', function() {
	return {
		controllerAs: 'coworking',
		controller: ['$http', function SpaceCtrl($http) {
			this.$http = $http;
			var self = this;
			self.spaces = [];
			self.totalSpaces = 0;
			this.totalSpaces = function() {
				return self.spaces.length;
			}
			// -------------
			// get all spaces
			// -------------
			this.getSpaces = function() {
				console.log('getSpaces function invoked');
				self.$http.get('/spaces').then(function(response) {
					self.spaces = response.data
				});

								// ----------------
								// capitalize title
								// ----------------
								var title = document.getElementsByClassName("title");

								function capitalizeFirstLetter(title) {
								    return title.charAt(0).toUpperCase() + title.slice(1);
								}
								// title.capitalizeFirstLetter();

				return self.spaces;
			}
			// ---------------
			// id check button
			// ---------------
			this.testing = function(id) {
				console.log('Space id is: ' + id);
			}
			// Add Space
			this.addSpace = function() {
				self.$http.post('/spaces', {name: this.formSpaceName, address: this.formSpaceAddress, url: this.formSpaceURL}).then(function success(response) {
					self.spaces.push(response.data);
					self.formSpaceName = '';
					self.formSpaceAddress = '';
					self.formSpaceURL = '';
				}, function error() {
					console.log('error');
				});
			}
			this.populateForm = function(space) {
				// Lets populate the form
				self.formSpaceID = space._id;
				self.formSpaceName = space.name;
				self.formSpaceAddress = space.address;
				self.formSpaceURL = space.url;
			}
			this.editSpace = function() {
				// Now that it's populated
				var id = this.formSpaceId;
				self.$http.put('/spaces/' + id, {name: this.formSpaceName, address: this.formSpaceAddress, url: this.formSpaceURL}).then(function success (response) {
					console.log(response);
					self.getSpaces();
					// Empty form
					self.formSpaceName = '';
					self.formSpaceAddress = '';
					self.formSpaceURL = '';
				}, function error() {
					console.log('error');
				});
			}
			this.deleteSpace = function(space) {
                var id = space._id;
                console.log(id);

                self.$http.delete('/spaces/' + id).then(function success(response) {
                    self.getSpaces();
                }, function error() {
                    console.log('error');
                });
            }
		}]
	}
})



// app.filter('capitalize', function() {
//     return function(input, all) {
//       var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
//       return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
//     }
//     function Ctrl($scope) {
//   $scope.msg = 'hello, world.';
// }
// });