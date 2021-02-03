let middleware = function (req, res, next) {
	next();
};

module.exports = function PersonRouterConstructor(router) {
	router.get(
		'/person',
		middleware,
		function (req, res, next) {
			res.send(200);
		},
		function (req, res, next) {}
	);

	router.get('/person/:personId', function (req, res, next) {});
};
