import {Platform} from 'react-native';
import {
    MediaStreamTrack,
    getUserMedia,
} from 'react-native-webrtc';

const GetLocalStream = (isFront, qual, callback) => {

    let videoSourceId;
    // on android, you don't have to specify sourceId manually, just use facingMode
    // uncomment it if you want to specify
    if (Platform.OS === 'ios') {
        MediaStreamTrack.getSources(sourceInfos => {
            console.log("sourceInfos: ", sourceInfos);
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === "video" && sourceInfo.facing === (isFront ? "front" : "back")) {
                    videoSourceId = sourceInfo.id;
                }
            }
        });
    }

    let minWidth, minHeight, minFrameRate;
    if (qual === 'low') {
        minWidth = 640;
        minHeight = 360;
        minFrameRate = 30;
    }
    else {
        minWidth = 1080;
        minHeight = 720;
        minFrameRate = 50;
    }

    getUserMedia({
        audio: true,
        video: {
            mandatory: {
                minWidth: minWidth, // Provide your own width, height and frame rate here
                minHeight: minHeight,
                minFrameRate: minFrameRate,
            },
            facingMode: (isFront ? "user" : "environment"),
            optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
        }
    }, function (stream) {
        console.log('getUserMedia success', stream);
        callback(stream);
    }, logError);
};

function logError(error) {
    console.log("logError", error);
}


module.exports = {
    GetLocalStream,
    logError,
};