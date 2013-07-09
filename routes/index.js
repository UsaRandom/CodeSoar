
/*
 * GET home page.
 */

exports.home = function(req, res){
	res.render('home', { page: 'home', title: 'CodeSoar'});
};

exports.about = function(req, res) {
	res.render('about', {page:'about', title: 'CodeSoar About'});
};

exports.help = function(req, res) {
	res.render('help', {page:'help', title: 'CodeSoar Help'});
};

exports.fourOhFour = function(req, res) {
	res.render('404', {title: '404'});
};