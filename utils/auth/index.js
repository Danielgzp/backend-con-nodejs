const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
//const GithubStrategy = require('./strategies/github.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
