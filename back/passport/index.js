import passport from "passport";
import local from "passport-local";
import kakao from "passport-kakao";
import {users} from "../models";

async function loginByThirdparty(info, done) {
    const user = await users.findOne({ where: { email: info.email, platform_type: info.plaform } });
    if (user) {
        done(null, user);
    } else {
        const new_user = await users.save({
            email: info.email,
            password: "null",
            name: info.name,
            platform_type: info.plaform,
        });
        done(null, new_user);
    }
    console.log("login By thirdparty");
    
}

const KakaoStrategy = kakao.Strategy;
passport.use(new kakao({
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_CB_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile._json);
            loginByThirdparty({
                email: "null",
                name: "null",
                plaform: "kakao",
            }, done);            
        } catch (err) {
            console.log(err);
            done(err);
        }

    }
));


const LocalStrategy = local.Strategy;
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try{  
            const user = await users.findOne({where: {email,  platform_type:"local"}});
            if (user) {
                const pass = await user.verify(password);
                if (pass) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        } catch (err) {
            console.log(err);
            done(err);
        }

    }
));
