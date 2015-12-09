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
			// --------------
			// get all spaces
			// --------------
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

//----------------------------------------------
//Data
var cities = [
    {
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        long : -79.4000
    },
    {
        city : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 40.6700,
        long : -73.9400
    },
    {
        city : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];
//Angular App Module and Controller
var app2 = angular.module('mapsApp', [])
app2.controller('MapCtrl', function ($scope) {

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});


// app.filter('capitalize', function() {
//     return function(input, all) {
//       var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
//       return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
//     }
//     function Ctrl($scope) {
//   $scope.msg = 'hello, world.';
// }
// });