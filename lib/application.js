// On both client/server
MAPBOX_ID = "splassh.ihf1lp30";

// Global Helper
SPLASSH = {};

SPLASSH.userName = function(user) {

return Meteor.user().username || Meteor.user().profile.name;

};

SPLASSH.userEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  return '' && null;
};

// Config accounts-ui meteor package
Accounts.config({
  sendVerificationEmail: true
});

SinglePageLogin.config({
  loginTitle: 'Login to SPLASSH',
  signupTitle: 'Sign up to SPLASSH',
  forgotPasswordTitle: 'Retrieve password',
  canRetrievePassword: true,
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  forbidClientAccountCreation: false,
  routeAfterLogin: '/mydash',
  routeAfterSignUp: '/mydash',
  forceLogin: false
});

