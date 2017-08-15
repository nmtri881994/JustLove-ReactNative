import React, {Component} from 'react';
import {
    View, Text, InteractionManager, TouchableOpacity,
    Keyboard, Image
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import EmojiPicker from './emojiPicker'
import GifyPicker from './Gify'
import uuid from 'uuid';
import icon_videoCall from '../../../media/icons/icon_videoCall.png';
import icon_phoneCall from '../../../media/icons/icon_phoneCall.png';
import dot_white from '../../../media/icons/dot_white.png';
import ImagePicker from 'react-native-image-picker';

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
                        navigation.navigate('VideoCall', {type: 'caller', content: 'audioCall'})
                    }}
                >
                    <Image source={icon_phoneCall} style={{width: 22, height: 22, marginRight: 15}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.navigate('VideoCall', {type: 'caller', content: 'videoCall'})
                    }}
                >
                    <Image source={icon_videoCall} style={{width: 25, height: 25, marginRight: 20}}/>
                </TouchableOpacity>
            </View>
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
        // this.renderCustomActions = this.renderCustomActions.bind(this);
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
        this.socket.emit('isTyping', {
            isTyping: false,
        });
        Keyboard.dismiss();
        this.keyboardDidShowListener.remove();
        this.socket.removeListener('isTyping');
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

    // renderCustomActions(props) {
    //     const emoji = () => {
    //         Keyboard.dismiss();
    //         if (this.state.gify) {
    //             this.setState({gify: !this.state.gify});
    //         }
    //         this.setState({emoji: !this.state.emoji});
    //     };
    //     const gify = () => {
    //         Keyboard.dismiss();
    //         if (this.state.emoji) {
    //             this.setState({emoji: !this.state.emoji});
    //         }
    //         this.setState({gify: !this.state.gify});
    //     };
    //     return (
    //         <CustomActions
    //             {...props}
    //             emoji={emoji}
    //             gify={gify}
    //         />
    //     );
    // }

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
            this.socket.emit('isTyping', {
                isTyping: false,
            });
        }
    }

    renderFooter(props) {
        console.log('isTyping', this.state.isTyping);
        if (this.state.isTyping) {
            return (
                <View style={{marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 10, alignItems: 'center'}}>
                    <Text style={{fontSize: 14,}}>
                        Your love is typing . . .
                    </Text>
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
                    user={user}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    // renderActions={this.renderCustomActions}
                    onInputTextChanged={this.onInputTextChanged}
                    renderChatFooter={this.renderChatFooterCustom}
                    renderFooter={this.renderFooter}
                    renderBubble={this.renderBubble}
                    keyboardShouldPersistTaps={'never'}
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
