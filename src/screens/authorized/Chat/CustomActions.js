import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';

export default class CustomActions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.image();
                    }}
                >
                    <Image
                        style={{width: 26, height: 26, marginBottom: 10, marginLeft: 10}}
                        source={require('../../../media/icons/icon_camera.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.emoji();
                    }}
                >
                    <Image
                        style={{width: 26, height: 26, marginBottom: 10, marginLeft: 15}}
                        source={require('../../../media/icons/icon_emoij.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.gify();
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
