angular.module('refrontier.services', [])
.factory('User', function() {

  var o = {
    favorites: []
  }

   o.addApartmentToFavorites = function(apartment) {
    // make sure there's a song to add
    if (!apartment) return false;

    // add to favorites array
    o.favorites.unshift(apartment);
  }

  	o.removeApartmentFromFavorites = function(apartment, index){
  		if (!apartment) return false;

  		o.favorites.splice(index, 1);
  	}

  return o;
});

.factory('Recommendations', function($http, SERVER) {
	var o = {
		queue: []
	};

	o.getNextApartments = function(){
		return $http({
			method: 'GET',
			url: SERVER.url + '/recommendations'
		}).success(function(data) {
			o.queue = o.queue.concat(data);
		});
	}

	o.nextApartment = function(){
		//pop the index 0 off
		o.queue.shift();

		// low on the queue? lets fill it up
		if (o.queue.length <= 3){
			o.getNextApartments();
		}
	}

	return o;

});