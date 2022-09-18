const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
//const GithubStrategy = require('./strategies/github.strategy');

passport.use(LocalStrategy);
