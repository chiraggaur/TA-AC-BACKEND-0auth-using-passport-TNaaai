var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var User = require("../models/user");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      var profileData = {
        name: profile._json.login,
        username: profile.username,
        profileUrl: profile.profileUrl,
        photo: profile._json.avatar_url,
      };

      try {
        const user = await User.findOne({ username: profileData.username });
        // console.log(user, "user");
        if (!user) {
          const newUser = await User.create(profileData);
          // console.log(newUser, "newUser");
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  // console.log(user.id);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    console.log(user, "from decerealize"); // issue in deserialize user
    if (user) {
      return cb(null, user);
    }
  } catch (err) {
    cb(err);
  }
});

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, {
//       _id: user._id,
//       username: user.username,
//     });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });
