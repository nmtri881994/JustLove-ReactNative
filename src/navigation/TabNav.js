/**
 * Created by minhphan on 7/24/2017.
 */
import {Dimensions} from 'react-native';
import {TabNavigator, NavigationActions} from 'react-navigation';
import Home from '../screens/authorized/Home';
import ChatScreen from '../screens/authorized/ChatScreen';
import Chat from '../screens/authorized/Chat/Chat';
import Memories from '../screens/authorized/Memories';
import Location from '../screens/authorized/Location';

const {width, height} = Dimensions.get('window');


export default MainTabNav = TabNavigator({
        HomeScreen: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'My Love'
            }
        },
        ChatScreen: {
            screen: ChatScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Chat',
            }),

        },
        MemoriesScreen: {
            screen: Memories,
            navigationOptions: {
                tabBarLabel: 'Memories'
            }
        },
        LocationScreen: {
            screen: Location,
            navigationOptions: {
                tabBarLabel: 'Location'
            }
        }
    }, {
        tabBarOptions: {

            // onTabPress:() => {}
            style: {
                height: height / 20,
                backgroundColor: '#7E007E',
            },
            labelStyle: {
                marginTop: 0,
                fontSize: 12,
                fontWeight: 'bold'
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#AFEAF2',
            showLabel: true
        },
        swipeEnabled: true,
    }
);
