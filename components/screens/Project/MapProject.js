import React from 'react';
import {
    View,
    BackHandler,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    Keyboard,
    FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Spinner, Item, Icon, Input } from 'native-base';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import AdvanceSearch from './AdvanceSearch';

import icPin from './../../../icons/pin-building.png';
import getProject from './../../../api/getProject';
import GLOBAL from './../../../Globals';


const { width, height } = Dimensions.get('window');
let isHidden = true;
let isHiddenPopup = true;
const heightPopup = 220;

export default class MapProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtAddress: '',
            type: '',
            kind: '',
            loaded: false,
            location: null,
            errorMessage: null,
            currentLocation: {
                latitude: 21.027763,
                longitude: 105.834160
            },
            text: '',
            listProject: null,
            modalProject: false,
            modalPreview: false,
            modalAdvanceSearch: false,
            detailProject: null,
            bounceValue: new Animated.Value(height), //This is the initial position of the subview
            popupValue: new Animated.Value(heightPopup)
        };
        this.arrayProject = [];
        this.test = [];
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        getProject()
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }
    onSearch() {
        fetch(GLOBAL.GOOGLE_API + this.state.txtAddress, //eslint-disable-line
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.results.length > 0) {
                    this.setState({
                        currentLocation: {
                            latitude: resJson.results[0].geometry.location.lat,
                            longitude: resJson.results[0].geometry.location.lng
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    handleBackPress = () => { //eslint-disable-line
        if (!isHidden) {
            this.toggleAdvanceSearch();
        } else {
            this.props.navigation.navigate('HomeScreen');
        }
        return true;
    }
    toggleAdvanceSearch() {
        Keyboard.dismiss();
        let toValue = height;
        if (isHidden) {
            toValue = 0;
            this.setState({ modalAdvanceSearch: true });
        }
        //This will animate the transalteY of the subview between 0 & 100 depending on its current state//eslint-disable-line
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(
            this.state.bounceValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        isHidden = !isHidden;
    }
    togglePopup(wantHide, projectId) {
        let toValue = heightPopup;
        if (isHiddenPopup) {
            toValue = 0;
        }
        if (wantHide) {
            toValue = heightPopup;
        } else {
            toValue = 0;
            const project = this.state.listProject.filter(e => e.id === projectId);
            if (project[0]) {
                this.setState({
                    modalPreview: true,
                    currentLocation: {
                        latitude: parseFloat(project[0].latitude),
                        longitude: parseFloat(project[0].longitude)
                    },
                    detailProject: project[0]
                });
            }
        }
        Animated.spring(
            this.state.popupValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        isHiddenPopup = !isHiddenPopup;
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return (
                <Container>
                    <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                    <Content>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ width, flex: 1 }}
                        region={{
                            latitude: this.state.currentLocation.latitude,
                            longitude: this.state.currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // mapType="standard"
                        // followsUserLocation
                        // showsUserLocation
                        // showsMyLocationButton
                        moveOnMarkerPress
                        onPress={() => {
                            this.togglePopup(true);
                        }}
                        ref={(ref) => { this.mapView = ref; }}
                    >
                        {this.state.listProject.map(project => (
                            <Marker
                                key={project.id}
                                coordinate={{
                                    latitude: parseFloat(project.latitude),
                                    longitude: parseFloat(project.longitude),
                                }}
                                title={project.name}
                                description={project.address}
                                image={icPin}
                                onPress={() => {
                                    this.togglePopup(false, project.id);
                                }}
                                // ref={ref => { this[`marker${project.id}`] = ref; }}
                            // ref={ref => { this.test[project.id] = ref; }}
                            // ref={`marker${project.jd}`}
                            />
                        ))}
                    </MapView>
                    <View style={{ position: 'absolute', bottom: 0, width, padding: 5 }}>
                        <View style={{ backgroundColor: 'white', padding: 5, margin: 10, borderRadius: 5 }}>
                            <Content>
                                <Item
                                    style={{
                                        paddingTop: 5,
                                        backgroundColor: 'white',
                                        height: 40,
                                        borderRadius: 5,
                                        borderColor: '#33563743',
                                    }}
                                    regular
                                >
                                    <Icon active name='ios-search' style={{ color: 'orange' }} />
                                    <Input
                                        style={{ fontSize: 13 }}
                                        placeholder='Tìm kiếm dự án...'
                                        placeholderTextColor='#999999'
                                        onEndEditing={this.onSearch.bind(this)}
                                        onFocus={this.toggleAdvanceSearch.bind(this)}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ text })}
                                        value={this.state.text}
                                        returnKeyType='done'
                                    />
                                </Item>
                            </Content>
                            <ScrollView horizontal>
                                <FlatList
                                    horizontal
                                    // contentContainerStyle={styles.wrapper}
                                    data={this.state.listProject}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.btnProject}
                                            onPress={() => {
                                                this.togglePopup(false, item.id);
                                            }}
                                        >
                                            <Text style={styles.txtBtnProject}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <Animated.View
                    style={[styles.subView,
                    { transform: [{ translateY: this.state.bounceValue }] }]}
                >
                    {this.state.modalAdvanceSearch && <AdvanceSearch listProject={this.state.listProject} navigation={this.props.navigation} />}
                </Animated.View>
                <Animated.View
                    style={[styles.popupProject,
                    { transform: [{ translateY: this.state.popupValue }] }]}
                >
                    {this.state.modalPreview && <PreviewProject project={this.state.detailProject} navigation={this.props.navigation} />}
                </Animated.View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        // margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    actionContainer: {
        justifyContent: 'flex-end',
        padding: 10,
        // flex: 1,
        // backgroundColor: '#FFF',
        // margin: 10,
        // marginTop: 0,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    subView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#EAF0F3',
        height
    },
    popupProject: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: heightPopup
    },
    iconStyle: { width: 20, height: 20 },
    // btnDetail: {
    //     height: 30,
    //     borderColor: '#959595',
    //     borderRadius: 5,
    //     backgroundColor: 'white',
    //     justifyContent: 'center',
    //     borderWidth: 1
    // },
    // btnTable: {
    //     height: 30,
    //     borderColor: '#959595',
    //     borderRadius: 5,
    //     backgroundColor: '#F4AF47',
    //     justifyContent: 'center'
    // },
    btnProject: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        marginTop: 5,
        marginRight: 5,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#33563743'
    },
    txtBtnProject: { fontWeight: '400', marginHorizontal: 15, fontSize: 12, color: 'black' },
    // thumbProject: { width: 120, height: 120, marginRight: 5 }
});
