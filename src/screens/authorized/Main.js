import React, {Component} from 'react';
import {
    View, Text, Dimensions,
    StyleSheet
} from 'react-native';
import Header from "../../components/Header";
import TabNav from '../../navigation/TabNav';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');


class Main extends Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.props.socket.emit('Initialize', this.props.user);
    }

    componentDidMount() {
        this.props.socket.on('incomingCall', () => {
            this.props.navigation.navigate('VideoCall', {
                type: 'callee',
            })
        })
    }

    render() {
        const {wrapper, header, container} = styles;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <Header/>
                </View>
                <View style={container}>
                    <TabNav
                        screenProps={{navigate: this.props.navigation.navigate, navigation: this.props.navigation}}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        height: height / 13
    },
    container: {
        height: height / 13 * 12
    }
});

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        target: state.authentication.target,
        socket: state.socket.socket,
    }
}

export default connect(mapStateToProps)(Main);
