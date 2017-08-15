import config from '../config/config';
// import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
// import {
//     AccessToken, LoginManager,
//     GraphRequest, GraphRequestManager
// } from 'react-native-fbsdk';

const loginLocal = (phone_number, password) => (
    fetch(config.host_domain + '/api/authen/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({phone_number, password})
        })
        .then(response => response.json())
);

// const loginWithFacebook = (cb) => {
//     LoginManager.logOut();
//     LoginManager.logInWithPublishPermissions(['publish_actions'])
//         .then((result, error) => {
//             if (error) {
//                 alert("login has error" + error);
//             }
//             if (result.isCancelled) {
//                 alert("login is cancelled.");
//             } else {
//                 AccessToken.getCurrentAccessToken().then(
//                     (data) => {
//                         const accessToken = data.accessToken;
//                         console.log(accessToken);
//                         const responseInfoCallback = (error, result) => {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log(result);
//                                 accessServer(result.email, result.name, result.id, result.picture.data.url)
//                                     .then(resJSON => cb(undefined, resJSON))
//                                     .catch(err => console.log(err));
//                             }
//                         };
//                         const infoRequest = new GraphRequest(
//                             '/me',
//                             {
//                                 accessToken: accessToken,
//                                 parameters: {
//                                     fields: {
//                                         string: 'email,name,picture'
//                                     }
//                                 }
//                             },
//                             responseInfoCallback
//                         );
//                         // Start the graph request.
//                         new GraphRequestManager().addRequest(infoRequest).start()
//                     }
//                 )
//             }
//         })
//         .catch(err => console.log(err));
// };
//
// const accessServer = (email, username, facebookID, avatar) => (
//     fetch('http:192.168.1.8:3000/api/authen/login-facebook',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({email, username, facebookID, avatar})
//         })
//         .then(response => response.json())
// );
//
// const loginWithGoogle = async (cb) => {
//
//     try {
//         await GoogleSignin.hasPlayServices({autoResolve: true})
//             .then(() => {
//                 // play services are available. can now configure library
//             })
//             .catch((err) => {
//                 console.log("Play services error", err.code, err.message);
//             });
//         await GoogleSignin.configure({
//             webClientId: '417776064520-jjtuu2innvoibpe6v5sejaegsit09mf0.apps.googleusercontent.com',
//         });
//         await GoogleSignin.signIn()
//             .then((user) => {
//                 fetch('http:192.168.1.8:3000/api/authen/login-google',
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             email: user.email,
//                             username: user.name,
//                             googleID: user.id,
//                             avatar: user.photo
//                         })
//                     })
//                     .then(response => response.json())
//                     .then(resJSON => cb(undefined, resJSON))
//                     .catch(err => cb(err, undefined));
//             })
//             .catch((err) => {
//                 cb(err, undefined);
//             })
//             .done();
//     } catch (e) {
//         cb(e);
//     }
// };


module.exports = {
    loginLocal,
    // loginWithFacebook,
    // loginWithGoogle
};