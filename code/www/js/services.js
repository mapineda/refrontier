angular.module('refrontier.services', [])
.factory('User', function() {

  var o = {
    favorites: [],
    newFavorites: 0
  }

   o.addApartmentToFavorites = function(apartment) {
    // make sure there's a song to add
    if (!apartment) return false;

    // add to favorites array
    o.favorites.unshift(apartment);
    o.newFavorites++;
  }

  	o.removeApartmentFromFavorites = function(apartment, index){
  		if (!apartment) return false;

  		o.favorites.splice(index, 1);
  	}

  	o.favoriteCount = function() {
  		return o.newFavorites;
  	}

  return o;
})

.factory('Recommendations', function($http, $q, SERVER) {
	var o = {
		queue: []
	};

	var media;

	o.init = function() {
		if (o.queue.length === 0) {
			return o.getNextApartments;
		} else {
			return o.playCurrentApartment();
		}
	}

	o.getNextApartments = function() {
		return $http({
			method: 'GET',
			url: SERVER.url + '/recommendations'
		}).success(function(data) {
			o.queue = o.queue.concat(data);
		});
	}

	o.nextApartment = function() {
		//pop index @ 0 
		o.queue.shift();

		o.haltAudio();

		// low on the queue? lets fill it up
		if (o.queue.length <= 3) {
			o.getNextApartments();
		}
	}

	o.playCurrentApartment = function() {
		var defer = q.defer();

		media = new Audio(o.queue[0].preview_url);

		media.addEventListener("loadeddata", function() {
			defer.resolve();
		});

		media.play();

		return defer.promise; 
	}

	o.haltAudio = function() {
		if (media) media.pause();
	}

	return o;

});