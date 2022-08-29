import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../models/auth";

const appPassportInstance = new passport.Passport();

appPassportInstance.use('login', new Strategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user: any = await users.findOne({ email: email });
        if (!user) {
          console.log("Invalid email/password. Please review and try again.")
          return done("Email and password did not match.", false);
        }
        const verified = bcrypt.compareSync(password, user.password);
        if (!verified) {
          console.log("Invalid email/password. Please review and try again.")
          return done("Email and password did not match.", false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err, false);
      }
    }
));

appPassportInstance.use("register",new Strategy({usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, 
      },
      async (req: any, email: string, password: string, done: Function) => {
        try {
          const { full_name } = req.body;
          const user: any = await users.findOne({ email });
          if (user) return done( "Email already in use, please login to your account.", false);

          const salt = await bcrypt.genSalt(10);
          const password = await bcrypt.hash(req.body.password, salt);
          const userCreate = { full_name, email, password };
  
          const registerUser = await users.create(userCreate);
          return done(null, registerUser);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

appPassportInstance.serializeUser((user: any, done) => {
    done(null, user._id);
});

appPassportInstance.deserializeUser(async (id, done) => {
  let user: any = await users.findById(id);
  if (user) done(null, user);
  else done(user, null);
});

export { appPassportInstance };