const passport = require('passport');
const userController = require(__dirname+'/../../apps/csystem/controllers/user');


class authroutes
{
  constructor(app, passport)
  {
    /**
     * OAuth authentication routes. (Sign in)
     */
    let returnto = "/#"
    app.get('/familyfe/', (req, res)=>{res.send("is here...")});
    app.get('/familyfe/logout', userController.logout);
    app.post('/familyfe/signupinside/:type?', userController.postSignupinside);
    app.post('/familyfe/signininside', userController.postSignininside);
    app.post('/familyfe/unlink/:account', userController.postUnlink);
    app.post('/familyfe/drop/:uid', userController.postDeleteAccountInside);
    app.post('/familyfe/disable/:uid/:status', userController.postDisableAccountInside);
    app.post('/familyfe/password/:password/:confirmpassword/:oldpassword/:id?', userController.postUpdatePassword);

    // app.post('/familyfe/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);

    app.get('/familyfe/instagram', passport.authenticate('instagram'));
    app.get('/familyfe/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    app.get('/familyfe/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/github', passport.authenticate('github'));
    app.get('/familyfe/github/callback', passport.authenticate('github', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get('/familyfe/google/callback', passport.authenticate('google', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/twitter', passport.authenticate('twitter'));
    app.get('/familyfe/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
    app.get('/familyfe/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/familyfe/' }), (req, res) => {
      res.redirect(returnto || req.session.returnTo || '/familyfe/');
    });

    /**
     * OAuth authorization routes. (API examples)
     */
    app.get('/familyfe/foursquare', passport.authorize('foursquare'));
    app.get('/familyfe/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/familyfe/api' }), (req, res) => {
      res.redirect('/familyfe/api/foursquare');
    });
    app.get('/familyfe/tumblr', passport.authorize('tumblr'));
    app.get('/familyfe/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/familyfe/api' }), (req, res) => {
      res.redirect('/familyfe/api/tumblr');
    });
    app.get('/familyfe/steam', passport.authorize('openid', { state: 'SOME STATE' }));
    app.get('/familyfe/steam/callback', passport.authorize('openid', { failureRedirect: '/familyfe/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/familyfe/');
    });
    app.get('/familyfe/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
    app.get('/familyfe/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/familyfe/login' }), (req, res) => {
      res.redirect('/familyfe/api/pinterest');
    });
  }
}

module.exports = authroutes