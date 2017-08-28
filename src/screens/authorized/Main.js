import React, {Component} from 'react';
import {
    View, Text, Dimensions,
    StyleSheet, AppState
} from 'react-native';
import Header from "../../components/Header";
import TabNav from '../../navigation/TabNav';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation'
const {width, height} = Dimensions.get('window');


class Main extends Component {
    static navigationOptions = {
        header: null,
        drawer: null
    };

    componentWillMount() {
        this.props.socket.emit('Initialize', this.props.user);
    }

    componentDidMount() {
        PushNotification.configure({
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: false,
            requestPermissions: true,
        });

        this.props.socket.on('incomingCall', (data) => {
            if (data.type === 'videoCall') {
                this.props.navigation.navigate('VideoCall', {
                    type: 'callee',
                    content: 'videoCall',
                })
            }
            else if (data.type === 'audioCall') {
                this.props.navigation.navigate('VideoCall', {
                    type: 'callee',
                    content: 'audioCall',
                })
            }
<<<<<<< HEAD
            if(AppState.currentState === 'background') {
                PushNotification.localNotification({
                    subText: this.props.target,
                    message: 'Incoming Call',
                    autoCancel: false,
                });
            }
        })

        this.props.socket.on('message', (data) => {
            if(AppState.currentState === 'background') {
                if(this.props.screen !== 'ChatScreen') {
                    this.props.navigation.navigate('ChatScreen');
                }
                PushNotification.localNotification({
                    subText: this.props.target,
                    message: data.text,
                    autoCancel: false,
                });
            }
            else if (AppState.currentState === 'active') {
                console.log(this.props.user, 'new message from', this.props.target);
            }
        });
=======
        });

        this.props.socket.on('test-socket', (data) => {
            console.log(data);
            this.props.socket.emit('Test-Socket', {
                content: 'hello',
            });
        })

>>>>>>> 492837ff998fc44078b42adc9a71ec17e7d06143
    }

    render() {
        const {wrapper, header, container} = styles;
        // setInterval(() => {
        //     console.log('send request');
        //     this.props.socket.emit('Test-Socket', {
        //         content: 'hello',
        //     });
        // }, 5000);
        return (
            <View style={wrapper}>
                <View style={header}>
                    <Header navigation={this.props.navigation}/>
                </View>
                <View style={container}>
                    <TabNav
                        screenProps={{navigate: this.props.navigation.navigate}}
                        onNavigationStateChange={(prevState, nextState) => {
                            if (nextState.index === 1) {
                                this.props.navigation.navigate('ChatScreen', {lastScreenIndex: prevState.index})
                            }
                        }}
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
        screen: state.navigation.screen,
    }
}

export default connect(mapStateToProps)(Main);
