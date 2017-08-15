import React from 'react'
import styled from 'styled-components/native'
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
} from 'react-native'

import Gifs from '../../img/Gifs.js'

/* list of emoji's sourced from http://getemoji.com */

const TUZKI = ['tuzki1', 'tuzki2', 'tuzki3',
    'tuzki4', 'tuzki5', 'tuzki6',
    'tuzki7', 'tuzki8', 'tuzki9'];
const NUANIA = ['NuaNia1', 'NuaNia2', 'NuaNia3',
    'NuaNia4', 'NuaNia5', 'NuaNia6',
    'NuaNia7', 'NuaNia8', 'NuaNia9'];

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gifys: TUZKI,
            gifyCategory: 'TUZKI'
        }
    }

    static get propTypes() {
        return {
            onGifySelected: React.PropTypes.func.isRequired,
            visible: React.PropTypes.bool
        }
    }

    static get defaultProps() {
        return {
            visible: true,
        }
    }

    toggleGify(gify) {
        switch (gify) {
            case 'TUZKI':
                this.setState({gifys: TUZKI, gifyCategory: 'TUZKI'});
                break;
            case 'NUANIA':
                this.setState({gifys: NUANIA, gifyCategory: 'NUANIA'});
                break;
            default:
                this.setState({gifys: TUZKI, gifyCategory: 'TUZKI'})
        }
    }

    onGifySelect(gify) {
        this.props.onGifySelected(gify)
    }

    renderTabs() {
        const {gifyCategory} = this.state;

        return (
            <Tabs>
                <TouchableOpacity
                    selected={gifyCategory === 'TUZKI'}
                    onPress={() => {
                        this.toggleGify('TUZKI')
                    }}>
                    <Image
                        style={{width: 40, height: 40, marginBottom: 10, marginLeft: 10}}
                        source={require('../../img/sticker/tuzki-icon.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    selected={gifyCategory === 'NUANIA'}
                    onPress={() => {
                        this.toggleGify('NUANIA')
                    }}>
                    <Image
                        style={{width: 40, height: 40, marginBottom: 10, marginLeft: 10}}
                        source={require('../../img/sticker/NuaNia1.png')}
                    />
                </TouchableOpacity>

            </Tabs>
        )
    }

    render() {
        const {gifys} = this.state;
        const {visible} = this.props;
        return (
            <Wrapper visible={visible}>
                <View style={{flex: 0.3}}>
                    {this.renderTabs()}
                </View>

                <ScrollView>

                    <GifyWrapper>
                        {
                            gifys.map((gify, index) => (
                                <GifyHighlight
                                    key={index}
                                    onPress={() => {
                                        this.onGifySelect(gify)
                                    }}
                                >
                                    <Gify
                                        key={index}
                                        // source={require('../img/sticker/'+gify)}
                                        // source={{uri: '../img/sticker/'+gify}}
                                        source={Gifs[gify]}
                                    />
                                </GifyHighlight>
                            ))
                        }
                    </GifyWrapper>

                </ScrollView>
            </Wrapper>
        )
    }
}

const Wrapper = styled.View`
  opacity: ${props => props.visible ? 1 : 0};
`;

const GifyWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: stretch;
  flex-wrap: wrap;
  height: 200;
`;

const GifyHighlight = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Gify = styled.Image`
  height: 50;
  width: 50;
`;

const Tabs = styled.View`
  flex: 1;
  flex-direction: row;
  height: 40;
  flex-wrap: wrap;
  align-self: stretch;
`;
