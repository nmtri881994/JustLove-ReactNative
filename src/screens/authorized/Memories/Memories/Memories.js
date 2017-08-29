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
    FlatList,
    View
} from 'react-native';
import Hr from 'react-native-hr'
import moment from 'moment'

//import component
import Memory from './Memory'

export default class Memories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memories: []
        }
    }

    componentWillMount() {
        // let memories = this.props.memories.data;
        // memories.map(memory => {
        //     memory.user = this.props.user;
        //     memory.target = this.props.target;
        // })
        // this.setState({
        //     memories: memories
        // })
    }

    componentWillReceiveProps(nextProps) {
        let memories = nextProps.memories;
        memories.map(memory => {
            memory.user = nextProps.user;
            memory.target = nextProps.target;
        })
        this.setState({
            memories: memories
        })
    }

    _renderItem = ({item}) => (
        <Memory memory={item}/>
    );

    _keyExtractor = (item, index) => item._id;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.memories}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0.2}
                    onEndReached={({ distanceFromEnd })=>{
                        alert(distanceFromEnd)
                        console.log(distanceFromEnd);
                    }}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 65
    }
})