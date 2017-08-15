/**
 * Created by minhphan on 8/11/2017.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {chatScreenNav} from '../../actions/ChatNav';

class ChatScreen extends Component {

    constructor(props) {
        super(props);

        // this.props.screenProps.navigate('Chat')
    }

    // goChat() {
    //
    // }
    componentDidMount() {
        this.props.chatScreenNav('Chat')
    }

    render() {

        console.log(this.props.nav);

        return (
            <View>
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
