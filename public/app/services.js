var weegoinServices = angular.module('weegoinApp.services', []);

weegoinServices.factory("logService", 
	
	['$http',

	function($http) {

		var _this = this;
		var _public = {};

		_this.init = function(){
			return _public;
		}

		_this.text = function(t){

			// encapsulating console log
			console.log(t)
		};

		_public.info = function(msg, ctx) {

			if(ctx) {
				_this.text("[INFO] " + msg.toLowerCase() + ": " + ctx)
			}

			else {
				_this.text("[INFO] " + msg)
			}
		}

		_public.debug = function(msg, ctx) {

			if(ctx) {
				_this.text("[DEBUG] " + msg.toLowerCase() + ": " + ctx)
			}

			else {
				_this.text("[DEBUG] " + msg)	
			}
		}

		_public.error = function(msg, ctx) {

			if(ctx) {
				_this.text("[ERROR] " + msg.toLowerCase() + ": " + ctx)
			}

			else {
				_this.text("[ERROR] " + msg)	
			}
		}

		_public.fatal = function(msg, ctx) {

			if(ctx) {
				_this.text("[FATAL ERROR] " + msg.toLowerCase() + ": " + ctx)
			}

			else {
				_this.text("[FATAL ERROR] " + msg.toLowerCase())
			}
		}

		return _this.init();
	}
]);

weegoinServices.factory("storageService", 
	
	['$http', 'logService',

	function($http, $log) {

		var _this = this;
		var _public = {};

		_this.memoryCache = {};

		_this.storage = null;
		_this.html5Storage = false;

		_this.init = function(){

			$log.info("Storage", "Initializing...")

			try {

				if('localStorage' in window && window['localStorage'] !== null) {

					// html5 local storage
					_this.storage = window['localStorage'];
					_this.html5Storage = true;

					$log.info("Storage", "HTML5 Local Storage available, set as default.")
				}

				else {

					throw new Error("HTML5 Local Storage not available! Memory cache set as default.")
				}
			} 

			catch (e) {

				// memory cache storage
				_this.storage = null;
				_this.html5Storage = false;
				
				$log.error("Storage", e.message.toString())	
			}

			return _public;
		}

		_public.get = function(k) {

			if(!_this.storage || !_this.html5Storage) {
				return _this.memoryCache[k];
			}

			else {
				return _this.storage.getItem(k);
			}
		}

		_public.set = function(k, v) {

			if(!_this.storage || !_this.html5Storage) {
				_this.memoryCache[k] = v;
			}

			else {
				_this.storage.setItem(k, v);
			}

			return _public.get(k);
		}

		_public.clear = function(k) {

			if(!_this.storage || !_this.html5Storage) {
				_this.memoryCache = {};
			}

			else {
				_this.storage.clear();
			}
		}

		return _this.init();
	}
]);

weegoinServices.factory("device", 
	
	['$http', 'storageService', 'logService',

	function($http, $storage, $log) {

		var _this = this;
		var _public = {};

		_this.sharePlugin = null;

		_this.init = function(){

			if(!window["plugins"] || !window["plugins"]["socialsharing"]) {
				$log.error("share", "No sharing plugin available");
			}

			else {
				_this.sharePlugin = window.plugins.socialsharing
			}
			return _public;
		}

		_public.share = function(opts) {

			opts = opts || {};
			
			_this.sharePlugin.share(
				opts.message, 
				opts.subject, 
				opts.image, 
				opts.link
			);
		}


		// TODO: access alert boxes from cordova!
		
		// encapsulating alert boxes
		_public.alert = function(msg) {
			return window.alert(msg);
		}

		_public.confirm = function(msg) {
			return window.confirm(msg)
		};

		_public.prompt = function(msg) {
			return window.prompt(msg);
		}

		return _this.init();
	}
]);

weegoinServices.factory("user", 
	
	['$http', 'storageService', 'logService',

	function($http, $storage, $log) {

		var _this = this;
		var _public = {};

		// const
		_this.API_HOST = "http://api.weego.in/index.php/"

		_this.me = null;

		_this.init = function() {

			_this.me = $storage.get("user");

			window.fbAsyncInit = function() {

				FB.init({
					appId: '1446634675566039',
					status: true,
					useCachedDialogs: true
				});

				FB.getLoginStatus( function(response) {

					//console.log(response);
					if (response.status === 'connected') {

						var accessToken = response.authResponse.accessToken;
						var userID = response.authResponse.userID;

						return _this.performLogin(userID, accessToken, function(){});
					}

				}, true);
      		};

			(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			return _public;
		}

		_public.me = function(){
			return _this.me;
		}

		_public.login = function(fn) {

			fn = fn || function(){};

			FB.login(function(response) {

				if (response.authResponse) {

					var accessToken = response.authResponse.accessToken;
					var userID = response.authResponse.userID;

					return _this.performLogin(userID, accessToken, fn);

				} else {

					fn(new Error("User cancelled the login"), null);
				}

			}, {
				scope: "email" 
			});
		}

		_this.performLogin = function(userId, accessToken, fn) {

			fn = fn || function(){};

			$http({
				method: "GET",
				url: _this.API_HOST + "users/facebook_login/" + userId + "/" + accessToken
			})

			.success(function(data) {
				_this.me = data[0];
				fn(null, data)
			})

			.error(function(err) {
				fn(err, null);
			}) 
		}

		_public.logout = function() {

			_this.me = false;
			$storage.set("user", null);
		}

		return _this.init();
	}
]);

weegoinServices.factory("place", 
	
	['$http', 'storageService', 'logService',

	function($http, $storage, $log) {

		var _this = this;
		var _public = {};

		_this.me = null;

		_this.init = function() {

			_this.me = $storage.get("user");
			return _public;
		}

		return _this.init();
	} 
]);

weegoinServices.factory("event", 
	
	['$http', 'storageService', 'logService',

	function($http, $storage, $log) {

		var _this = this;
		var _public = {};

		_this.me = null;

		_this.init = function() {

			_this.me = $storage.get("user");
			return _public;
		}

		return _this.init();
	}
]);