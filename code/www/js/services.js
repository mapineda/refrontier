angular.module('refrontier.services', [])

.factory('User', function() {
	var o = {
		favorites: []
	}

	o.addApartmentToFavorites = function(apartment) {
		if (!apartment) return false;

		o.favorites.unshift(apartment);

	}

	o.removeApartmentFromFavorites = function(apartment, index) {
		if (!apartment) return false;

		o.favorites.splice(index, 1);

	}

	return o;
})

.factory('Recommendations', function($http, SERVER) {
	var o = {
		queue: []
	};

	o.getNextApartments = function() {
		return $http({
			method: 'GET',
			url: SERVER.url + '/recommendations'
		}).success(function(data) {
			// merge data into queue
			o.queue = o.queue.concat(data);
		});
	}

	o.nextApartment = function() {
		o.queue.shift();

		if (o.queue.length <= 3) {
			o.getNextApartments();
		}
	}

	return o;

});