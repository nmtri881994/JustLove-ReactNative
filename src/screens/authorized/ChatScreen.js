/**
 * Created by minhphan on 8/11/2017.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {chatScreenNav} from '../../actions/ChatNav';
class ChatScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        return (
            <View>
                <Text>Hello </Text>
                {/*{() => this.goChat.bind(this)}*/}
                {/*/!*<Text onPress={() => this.props.screenProps.navigate('Chat')}>Hell</Text>*!/*/}
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        target: state.authentication.target,
        nav: state.nav
    }
}

export default connect(mapStateToProps, {chatScreenNav})(ChatScreen);
