import React, {Component} from 'react';
import {
    View, Text, InteractionManager, TouchableOpacity,
    Keyboard, Image
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import ImagePicker from 'react-native-image-picker';
import EmojiPicker from './emojiPicker'
import GifyPicker from './Gify'
import uuid from 'uuid';

import icon_videoCall from '../../../media/icons/icon_videoCall.png';
import icon_phoneCall from '../../../media/icons/icon_phoneCall.png';
import dot_white from '../../../media/icons/dot_white.png';
import icon_Typing from '../../../media/icons/typing.gif';
import icon_back from '../../../media/icons/icon_back_black.png';


class Chat extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Chat",
        headerStyle: {
            backgroundColor: '#C13BCE',
        },
        headerRight: (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={dot_white} style={{width: 10, height: 10, marginRight: 15}}/>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.navigate('VideoCall', {type: 'caller'})
                    }}
                >
                    <Image source={icon_phoneCall} style={{width: 22, height: 22, marginRight: 15}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.navigate('VideoCall', {type: 'caller'})
                    }}
                >
                    <Image source={icon_videoCall} style={{width: 25, height: 25, marginRight: 20}}/>
                </TouchableOpacity>
            </View>
        ),
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate('AuthenStackNav')}
            >
                <Image source={icon_back} style={{height: 20, width: 20, marginLeft: 15}}/>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            isLoadingEarlier: false,
            isTyping: false,
            text: null,
            emoji: false,
            gify: false,
        };
        this.socket = this.props.socket;
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this.storeMessages = this.storeMessages.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.renderChatFooterCustom = this.renderChatFooterCustom.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.socket.removeListener('ReceiveMessage');
        this.socket.removeListener('LoadMessages');
        this.socket.on('ReceiveMessage', this.onReceivedMessage);
        this.socket.on('LoadMessages', this.LoadMessages);
        this._isMounted = false;
        this.messagesPage = 1;
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentDidMount() {
        this.socket.emit('LoadMessages', {
            messagesPage: this.messagesPage,
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({emoji: false, gify: false});
        });
        this.socket.on('IsTyping', (isTyping) => {
            if (this._isMounted) {
                this.setState((previousState) => {
                    return {
                        isTyping
                    }
                });
            }
        });
        this.socket.on('LoadMessages', this.LoadMessages.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.socket.emit('IsTyping', {
            isTyping: false,
        });
        Keyboard.dismiss();
        this.keyboardDidShowListener.remove();
        this.socket.removeListener('IsTyping');
        //   this.props.navigation.navigate('AuthenStackNav')
    }

    LoadMessages(existingMessages) {
        console.log('existingMessages', existingMessages);
        if (existingMessages.length < 20) {
            this.setState({loadEarlier: false});
        }
        if (this._isMounted === true) {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages, existingMessages),
                    isLoadingEarlier: false,
                };
            });
        }
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });
        this.messagesPage++;
        this.socket.emit('LoadMessages', {
            messagesPage: this.messagesPage,
        });
    }

    onReceivedMessage(messages) {
        console.log("message", messages);
        if (this._isMounted === true) {
            this.storeMessages(messages);
        }
    }

    onSend(messages = []) {
        this.socket.emit('SendMessage', messages[0]);
        this.storeMessages(messages[0]);
        this.setState({text: ''});
    }

    onInputTextChanged(txt) {
        this.setState({text: txt});
        if (txt !== '' && !this.isTypingState) {
            this.isTypingState = true;
            this.socket.emit('IsTyping', {
                isTyping: true,
            });
        }
        if (txt === '') {
            this.isTypingState = false;
            this.socket.emit('IsTyping', {
                isTyping: false,
            });
        }
    }

    renderFooter(props) {
        console.log('isTyping', this.state.isTyping);
        if (this.state.isTyping) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={{
                            marginHorizontal: 8,
                            marginBottom: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 20
                        }}
                        source={{uri: this.props.target.avatar}}
                    />
                    <Image source={icon_Typing} style={{height: 40, width: 60}}/>
                </View>
            );
        }
        return null;
    }

    storeMessages(messages) {
        InteractionManager.runAfterInteractions(() => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, messages),
                };
            });
        });

    }

    logEmoji(emoji) {
        this.setState({text: this.state.text.concat(emoji)});
    }

    logGify(gify) {
        console.log(gify);
        let msg = {
            image: {
                type: 'require',
                content: gify,
            },
            user: this.props.user,
            createdAt: new Date(),
            _id: uuid.v4(),
        };
        this.onSend([msg]);
    }

    selectPhotoTapped(cb) {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                cb(response);
            }
        });
    }


    sendImage() {
        this.selectPhotoTapped(image => {
            let msg = {
                image: {
                    type: 'uri',
                    content: image.uri,
                },
                imageData: image.data,
                user: this.props.user,
                createdAt: new Date(),
                _id: uuid.v4(),
            };
            this.onSend([msg]);
        });
    }

    renderChatFooterCustom(props) {
        const emoji = () => {
            Keyboard.dismiss();
            if (this.state.gify) {
                this.setState({gify: !this.state.gify});
            }
            this.setState({emoji: !this.state.emoji});
        };
        const gify = () => {
            Keyboard.dismiss();
            if (this.state.emoji) {
                this.setState({emoji: !this.state.emoji});
            }
            this.setState({gify: !this.state.gify});
        };
        // const image = () => this.sendImage.bind(this);
        return (
            <CustomActions
                image={ this.sendImage.bind(this)}
                emoji={emoji}
                gify={gify}
            />
        );
    }


    render() {

        const {user} = this.props;
        let userChat = {
            _id: user._id,
            name: user.displayName,
            avatar: user.avatar
        };

        let displayemoji = this.state.emoji ?
            <EmojiPicker
                onEmojiSelected={this.logEmoji.bind(this)}
                visible={true}
            />
            : null;

        let displaygify = this.state.gify ?
            <GifyPicker
                onGifySelected={this.logGify.bind(this)}
                visible={true}
            />
            : null;

        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    text={this.state.text}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={userChat}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    onInputTextChanged={this.onInputTextChanged}
                    renderChatFooter={this.renderChatFooterCustom}
                    renderFooter={this.renderFooter}
                    keyboardShouldPersistTaps={'never'}
                    showUserAvatar={true}
                />
                {displayemoji}
                {displaygify}
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

export default connect(mapStateToProps)(Chat);
// export default Chat;
