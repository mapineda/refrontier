angular.module('refrontier.services', ['ionic.utils'])
.factory('User', function($http, $q, $localstorage, SERVER) {

  var o = {
  	username: false,
  	session_id: false, //should expire after x amount of days
    favorites: [],
    newFavorites: 0
  }

  	o.auth = function(username, signingUp) {
  		var authRoute;

  		if (signingUp) {
  			authRoute = 'signup';
  		} else {
  			authRoute = 'login';
  		}

  		return $http.post(SERVER.url + '/' + authRoute, { username: username })
  			.success(function(data) {
  				o.setSession(data.username, data.session_id, data.favorites);
  			});
  	}

  	o.setSession = function(username, session_id, favorites) {
  		if (username) o.username = username;
  		if (session_id) o.session_id = session_id;
  		if (favorites) o.favorites = favorites;

  		$localstorage.setObject('user', {username: username, session_id: session_id});
  	}

  	o.checkSession = function() {
  		var defer = $q.defer();

  		if(o.session_id) {
  			defer.resolve(true);
  		} else {
  			var user = $localstorage.getObject('user');

  			if(user.username) {
  				o.setSession(user.username, user.session_id);
  				o.populateFavorites().then(function() {
  					defer.resolve(true);
  				});
  			} else {
  				defer.resolve(false);
  			}
  		}

  		return defer.promise;
  	}

  	o.destroySession = function() {
  		$localstorage.setObject('user', {});
  		o.username = false;
  		o.session_id = false;
  		o.favorites = [];
  		o.newFavorites = 0;
  	}

   	o.addApartmentToFavorites = function(apartment) {
    // make sure there's a song to add
    	if (!apartment) return false;

    // add to favorites array
    	o.favorites.unshift(apartment);
   		o.newFavorites++;

    	return $http.post(SERVER.url + '/favorites', {session_id: o.session_id, song_id: apartment.song_id});
  }

  	o.removeApartmentFromFavorites = function(apartment, index){
  		if (!apartment) return false;

  		o.favorites.splice(index, 1);

  		return $http({
  			method: 'DELETE',
  			url: SERVER.url + '/favorites',
  			params: {session_id: o.session_id, song_id: apartment.song_id}
  		})


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