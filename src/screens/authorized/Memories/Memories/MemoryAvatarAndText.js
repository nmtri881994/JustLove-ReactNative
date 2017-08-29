/**
 * Created by XuanVinh on 8/13/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import moment from 'moment'

export default class MemoryAvatarAndText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personPost: {
                id: 0,
                firstName: "",
                lastName: "",
                avatar: ""
            },
            memory: {}
        }
    }

    componentWillMount() {
        let personPost;
        let memory = this.props.memory;
        // const createdDate = memory.created_at;
        // memory.created_at = moment(createdDate, "D")
        if (memory.userId == memory.user.id) {
            this.setState({
                personPost: memory.user,
                memory: memory
            })
        } else {
            this.setState({
                personPost: memory.target,
                memory: memory
            })
        }
    }

    render() {
        const personPost = this.state.personPost;
        const memory = this.state.memory;
        return (<View style={styles.container}>
            <View style={styles.personPost}>
                <Image
                    source={{uri: personPost.avatar}}
                    style={styles.avatar}
                />
                <View style={styles.nameAndTime}>
                    <Text style={styles.name}>{personPost.displayName}</Text>
                    <Text>{memory.created_at}</Text>
                </View>
            </View>
            <View>
                <Text>{memory.text}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    personPost: {
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar:{
        height: 50,
        width: 50
    },
    nameAndTime:{
        justifyContent: 'center',
        flexDirection: "column",
        marginLeft: 5
    },
    name:{
        fontWeight: 'bold'
    }
})