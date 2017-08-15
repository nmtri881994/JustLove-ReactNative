/**
 * Created by minhphan on 7/14/2017.
 */
import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity,
    Image, StyleSheet, Dimensions, Modal, TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import {AccessSocket} from '../../actions/Socket';

import background from '../../media/temp/home_background.jpg'
import heart from '../../media/temp/heart.png';
import AsyncStorageAccess from '../../api/AsyncStorageAccess';
import addFriend from '../../media/icons/user.png';
import addFriendWhite from '../../media/icons/addFriendWhite.png';


const {width, height} = Dimensions.get('window');
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFriendContent: '',
            targetId: '',
            modalVisible: false,
        }
    }

    // componentWillMount() {
    //     this.props.socket.emit('Initialize', this.props.user);
    // }

    componentDidMount() {
        this.props.socket.on('LoadRequestFriend', request => {
            console.log('request', request);
            if (request.length > 0) {
                this.setState({
                    requestFriendContent: request[0].content,
                    targetId: request[0].targetId
                });
                console.log(this.state.requestFriendContent);
            }
        })
    }


    logout() {
        const {navigate} = this.props.screenProps;
        AsyncStorageAccess.saveToStorage('@loginToken', '');
        navigate('UnauthenStackNav');
    };

    sendConfirmFriend() {
        console.log("ConfirmFriendRequest");
        this.props.socket.emit('ConfirmFriendRequest', this.state.targetId);
    }

    render() {
        const {user, target} = this.props;
        const {requestFriendContent} = this.state;
        const {navigate} = this.props.screenProps;
        const {wrapper, backgroundImage, row, avatar, status, btnModal, modalContent} = styles;
        const friendJSX = (
            <View>
                <Image source={{uri: target.avatar}} style={avatar}/>
                <Text>{target.displayName}</Text>
            </View>
        );

        const noFriendJSX = (
            <TouchableOpacity
                onPress={() => navigate('SearchFriend')}
            >
                <Image source={addFriend} style={avatar}/>
            </TouchableOpacity>
        );

        const hasRequestFriend = (
            <View>
                <TouchableOpacity
                    onPress={() => this.setState({modalVisible: true})}
                >
                    <Image source={addFriendWhite} style={avatar}/>
                </TouchableOpacity>
            </View>
        );

        const modal = (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={modalContent}>
                        <Text>{requestFriendContent}</Text>
                        <Text/>
                        <Text/>
                        <TouchableHighlight
                            style={btnModal}
                            onPress={this.sendConfirmFriend.bind(this)}>
                            <Text style={{color: '#fff'}}>Xác Nhận</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={btnModal}
                            onPress={() => this.setState({modalVisible: false})}>
                            <Text style={{color: '#fff'}}>Hủy</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );

        return (
            <View style={wrapper}>
                <Image source={background} style={backgroundImage}>
                    <View style={row}>
                        <View>
                            <Image source={user.avatar !== null ? {uri: user.avatar} : addFriend } style={avatar}/>
                            <Text>{user.displayName}</Text>
                        </View>
                        <Image source={heart} style={{width: width / 10, height: width / 10}}/>
                        {target.targetId !== null ? (target.status !== 'pending' ? friendJSX : hasRequestFriend) : noFriendJSX }

                    </View>
                    {modal}
                    <View style={{alignItems: 'center'}}>
                        <Text style={status}>We been together</Text>
                        <Text style={status}> 1 nam : 2 thang : 36 ngay</Text>
                        <Text style={status}> 12 gio : 23 phut : 34 giay</Text>
                        <Text style={status}>We will live together for life</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.logout.bind(this)}>
                        <Text> log out</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        target: state.authentication.target,
        socket: state.socket.socket,
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        width: width
    },
    row: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    avatar: {
        width: width / 5,
        height: width / 5,
        borderRadius: width / 10,
    },
    status: {
        color: '#fff',
        marginTop: 10,
        fontSize: 20,
    },
    btnModal: {
        backgroundColor: '#39A9D2',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 30,
        borderRadius: 10,
    },
    modalContent: {
        width: width - 50,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5
    }
});

export default connect(mapStateToProps, {AccessSocket})(Home);