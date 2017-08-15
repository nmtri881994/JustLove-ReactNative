/**
 * Created by minhphan on 7/14/2017.
 */
import React, {Component} from 'react';
import {
    View, Text, TextInput, Dimensions,
    TouchableOpacity, Image, StyleSheet,
    ScrollView, Picker,
}from 'react-native';
import EditProfileHandle  from '../../api/EditProfile';
import GetProfile from '../../api/GetProfile';
import AsyncStorageAccess from '../../api/AsyncStorageAccess';
import {CheckBox, Button} from 'react-native-elements';
import addAvatar from '../../media/icons/adduser.png';

import {connect} from 'react-redux';
const ImagePicker = require('react-native-image-picker');

const options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const {width} = Dimensions.get('window');

class EditProfile extends Component {

    static navigationOptions = {
        title: 'Edit Profile',
        headerStyle: {
            backgroundColor: '#A721B3',
        },
        headerTitleStyle: {
            color: '#fff',
        },
        // headerRight: (
        //     <TouchableOpacity
        //         style={{marginRight: 10}}
        //         onPress={() => {
        //             this.setState({
        //                 avatarSource: "hello",
        //             });
        //             console.log(this.state.avatarSource);
        //         }}
        //     >
        //         <Text>Save</Text>
        //     </TouchableOpacity>
        // )
    };

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
            isMaleChecked: false,
            isFemaleChecked: false,
            avatar: '',
            gender: '',
            birthday: '',
            lastName: '',
            firstName: '',
            email: ''
        };
    }

    componentDidMount() {
        AsyncStorageAccess.getFromStorage('@loginToken')
            .then(token => {
                if (token !== '') {
                    GetProfile(token)
                        .then(res => {
                            if (res.status) {
                                let user = res.user;
                                this.setState({
                                    lastName: user.lastName,
                                    firstName: user.firstName,
                                    email: user.email,
                                    gender: user.gender,
                                    avatar: user.avatar,
                                });
                                console.log('avatar.data', user.avatar);
                            }
                            else {
                                this.props.navigation.navigate('UnauthenStackNav');
                            }
                        });
                }
            });
    }

    saveProfile() {
        console.log("save profile");
        let {avatarSource, gender, lastName, firstName, birthday, email} = this.state;
        AsyncStorageAccess.getFromStorage('@loginToken')
            .then(token => {
                if (token !== '') {
                    EditProfileHandle(
                        token, avatarSource, lastName,
                        firstName, email, birthday, gender
                    )
                }
            });
    }

    selectAvatar() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = {uri: response.uri};

                // You can also display the image using data:
                let source = {uri: 'data:image/jpeg;base64,' + response.data};

                this.setState({
                    avatarSource: response.data
                });
                console.log('avatarSource', this.state.avatarSource);
            }
        });
    }


    // uploadAvatar() {
    //     AsyncStorageAccess.getFromStorage('@loginToken')
    //         .then(token => {
    //             RNFetchBlob.fetch('POST', 'http://192.168.1.7:3000/api/authen/users/update-profile', {
    //                 Authorization: "JWT " + token,
    //                 otherHeader: "foo",
    //                 'Content-Type': 'multipart/form-data',
    //             }, [
    //                 // element with property `filename` will be transformed into `file` in form data
    //                 {name: 'avatar', filename: 'avatar.png', data: this.state.avatarSource},
    //                 // // custom content type
    //                 // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
    //                 // // part file from storage
    //                 // { name : 'avatar-foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path_to_a_file)},
    //                 // // elements without property `filename` will be sent as plain text
    //                 // { name : 'name', data : 'user'},
    //             ])
    //         })
    //
    // }

    render() {
        const {
            wrapper, header, container, avatarStyle, text, pickerDate,
            row, textInputLarge, textInputSmall, checkBox, pickerStyle
        } = styles;
        const {isMaleChecked, isFemaleChecked, avatar, gender, lastName, firstName, birthday, email} = this.state;

        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity
                        onPress={this.selectAvatar.bind(this)}
                    >
                        {/*// <Image source={{uri: 'data:image/jpeg;base64,' + base64}} style={avatarStyle}/>*/}
                        <Image source={addAvatar} style={avatarStyle}/>
                    </TouchableOpacity>
                </View>
                <View style={container}>
                    <View style={row}>
                        <View>
                            <Text style={text}>Họ</Text>
                            <TextInput
                                style={textInputSmall}
                                underlineColorAndroid='transparent'
                                value={firstName}
                                onChangeText={text => this.setState({firstName: text})}
                            />
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text style={text}>Tên</Text>
                            <TextInput
                                style={textInputSmall}
                                underlineColorAndroid='transparent'
                                value={lastName}
                                onChangeText={text => this.setState({lastName: text})}
                            />
                        </View>
                    </View>

                    <Text style={text}>Email</Text>
                    <TextInput
                        style={textInputLarge}
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={text => this.setState({email: text})}
                    />
                    <View style={row}>
                        <View>
                            <Text style={text}>Ngày Sinh</Text>
                            <View style={row}>
                                <Picker
                                    style={pickerDate}
                                    mode={'dropdown'}
                                >
                                    {/*selectedValue={this.state.language}*/}
                                    {/*onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
                                    <Picker.Item label="1" value="java"/>
                                    <Picker.Item label="2" value="js"/>
                                </Picker>
                                <Picker
                                    style={pickerStyle}
                                    mode={'dropdown'}
                                >
                                    {/*selectedValue={this.state.language}*/}
                                    {/*onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
                                    <Picker.Item label="tháng 1" value="java"/>
                                    <Picker.Item label="tháng 2" value="js"/>
                                </Picker>
                                <Picker
                                    style={pickerStyle}
                                    mode={'dropdown'}
                                >
                                    {/*selectedValue={this.state.language}*/}
                                    {/*onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
                                    <Picker.Item label="1990" value="java"/>
                                    <Picker.Item label="1991" value="js"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={text}>Nam</Text>
                            <CheckBox
                                center
                                containerStyle={checkBox}
                                checkedColor={'#03A9F4'}
                                uncheckedColor={'gray'}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={isMaleChecked}
                                onPress={() => this.setState({
                                    isMaleChecked: true,
                                    isFemaleChecked: false,
                                    gender: 'male'
                                })}
                            />
                        </View>
                        <View>
                            <Text style={text}>Nữ</Text>
                            <CheckBox
                                center
                                containerStyle={checkBox}
                                checkedColor={'#03A9F4'}
                                uncheckedColor={'gray'}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={isFemaleChecked}
                                onPress={() => this.setState({
                                    isFemaleChecked: true,
                                    isMaleChecked: false,
                                    gender: 'female'
                                })}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginRight: 10, width: 50, height: 30,
                            backgroundColor: '#A721B3', alignItems: 'center', justifyContent: 'center'
                        }}
                        onPress={this.uploadAvatar.bind(this)}
                    >
                        < Text style={{color: '#fff'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: '#E9EBEE'
        },
        header: {
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#92AED5'
        },
        row: {
            marginBottom: 10,
            flexDirection: 'row',
            backgroundColor: '#E9EBEE',
            borderRadius: 5,
            borderColor: 'gray'
        },
        container: {
            flex: 6,
            marginHorizontal: 20,
            backgroundColor: '#E9EBEE',
            marginTop: 20,
        },
        text: {
            color: '#424242',
            fontWeight: 'bold'
        },
        textInputLarge: {
            alignContent: 'center',
            height: 40,
            borderRadius: 5,
            marginTop: 5,
            marginBottom: 10,
            borderWidth: 0.5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            paddingBottom: 2
        },
        textInputSmall: {
            alignContent: 'center',
            height: 40,
            width: width / 2 - 30,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            paddingBottom: 2
        },
        checkBox: {
            backgroundColor: '#E9EBEE',
            borderColor: '#E9EBEE',
            justifyContent: 'center',
            height: 30,
        },
        avatarStyle: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        pickerDate: {
            width: 50,
            height: 40
        },
        pickerStyle: {
            width: 90,
            height: 40,
        }
    });

function

mapStateToProps(state) {
    return {
        user: state.authentication.user,
    }
}

export default connect(mapStateToProps)(EditProfile);