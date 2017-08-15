import PropTypes from 'prop-types';
import React from 'react';
import {
    TouchableOpacity, View, Image
} from 'react-native';
import uuid from 'uuid';

import ImagePicker from 'react-native-image-picker';

export default class CustomActions extends React.Component {
    constructor(props) {
        super(props);
        con = this;
        console.log(props);
        console.log('props');
    }

    // selectPhotoTapped(cb) {
    //     const options = {
    //         quality: 1.0,
    //         maxWidth: 500,
    //         maxHeight: 500,
    //         storageOptions: {
    //             skipBackup: true
    //         }
    //     };
    //
    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);
    //
    //         if (response.didCancel) {
    //             console.log('User cancelled photo picker');
    //         }
    //         else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {
    //             cb(response);
    //         }
    //     });
    // }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        con.props.image();
                        // con.selectPhotoTapped((image) => {
                        //     con.props.onSend([{
                        //         image: {
                        //             type: 'uri',
                        //             content: image.uri,
                        //         },
                        //         imageData: image.data,
                        //         // user: {
                        //         //     _id: 'dfsdd',
                        //         // },
                        //         createdAt: new Date(),
                        //         _id: uuid.v4(),
                        //     }]);
                        // });

                    }}
                >
                    <Image
                        style={{width: 26, height: 26, marginBottom: 10, marginLeft: 10}}
                        source={require('../../../media/icons/icon_camera.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        con.props.emoji();
                    }}
                >
                    <Image
                        style={{width: 26, height: 26, marginBottom: 10, marginLeft: 15}}
                        source={require('../../../media/icons/icon_emoij.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        con.props.gify();
                    }}
                >
                    <Image
                        style={{width: 26, height: 26, marginBottom: 10, marginLeft: 15}}
                        source={require('../../../media/icons/gif-icon.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

CustomActions.defaultProps = {
    image: () => {
    },
    emoji: () => {
    },
    gify: () => {
    },
};

CustomActions.propTypes = {
    image: PropTypes.func,
    emoji: PropTypes.func,
    gify: PropTypes.func,
};
