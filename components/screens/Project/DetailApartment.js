import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    BackHandler
} from 'react-native';

import { Container, Content, Spinner } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

import icTitle from './../../../icons/ic_title.png';
import Header from '../Home/Header';
import getDetailApartment from './../../../api/getDetailApartment';
import { BASE_URL } from './../../../Globals';

const { width } = Dimensions.get('window');


export default class DetailApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isReady: false,
            index: 0,
            modal3D: false,
            modalPosition: false,
            apartment: null,
            image3d: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const apartmentId = navigation.getParam('apartmentId', null);
        if (apartmentId) {
            getDetailApartment(apartmentId)
                .then(resJson => {
                    if (resJson) {
                        this.setState({
                            apartment: resJson,
                            image3d: resJson.image_3d.map((item, index) => {
                                return { url: `${BASE_URL}${item}` };
                            }),
                            loaded: true
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    }
    onDisplayImage(type) {
        if (type === '3d') {
            this.setState({ modal3D: true });
        }
        if (type === 'position') {
            this.setState({ modalPosition: true });
        }
    }
    handleBackPress = () => { //eslint-disable-line
        console.log('ok');
        this.props.navigation.navigate('TablePackageScreen');
        return true;
    }
    render() {
        if (!this.state.loaded) {
            return (
                <Container>
                    <Content>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        const { apartment } = this.state;
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header navigation={this.props.navigation} title='Chi tiết căn hộ' />
                <ScrollView style={styles.wrapper}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Image source={icTitle} style={{ width: 2, height: 13 }} />
                        </View>
                        <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>CĂN HỘ {apartment.number} - {apartment.building.name} - {apartment.project.name} ({apartment.status.description})</Text>
                    </View>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Giá tiền: {apartment.price}</Text>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Diện tích: {apartment.area} m2</Text>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Hướng {apartment.direction.description}</Text>
                    {apartment.room.map(item => (
                        <Text key={item.area} style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>{item.type}: {item.area} m2</Text>
                    ))}
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Số phòng ngủ: {apartment.bedroom}</Text>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Diện tích tim tường: {apartment.build_area} m2</Text>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Diện tích thông thủy: {apartment.live_area} m2</Text>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Hướng ban công</Text>
                    {apartment.balcony.map(item => (
                        <Text key={item} style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>{item}</Text>
                    ))}
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Vị trí căn hộ</Text>
                    <TouchableOpacity onPress={this.onDisplayImage.bind(this, 'position')}>
                        <Image source={{ uri: `${BASE_URL}${apartment.position_apartment}` }} style={{ width: width - 10, height: ((width - 10) / 337) * 367 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '900', fontSize: 12, paddingLeft: 5 }}>Ảnh 3d</Text>

                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        {apartment.image_3d.map(image => (
                            <TouchableOpacity key={image} onPress={this.onDisplayImage.bind(this, '3d')}>
                                <Image source={{ uri: `${BASE_URL}${image}` }} style={{ width: width - 10, height: ((width - 10) / 337) * 367 }} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Modal
                        visible={this.state.modalPosition}
                        transparent
                        onRequestClose={() => {
                            this.setState({ modalPosition: false });
                        }}
                    >
                        <ImageViewer
                            imageUrls={[{ url: `${BASE_URL}${apartment.position_apartment}` }]}
                            index={this.state.index}
                            onSwipeDown={() => {
                                this.setState({ modalPosition: false });
                            }}
                            enableSwipeDown
                            backgroundColor='black'
                            enablePreload
                        />
                    </Modal>
                    <Modal
                        visible={this.state.modal3D}
                        transparent
                        onRequestClose={() => {
                            this.setState({ modal3D: false });
                        }}
                    >
                        <ImageViewer
                            imageUrls={this.state.image3d}
                            index={this.state.index}
                            onSwipeDown={() => {
                                this.setState({ modal3D: false });
                            }}
                            enableSwipeDown
                            backgroundColor='black'
                            enablePreload
                        />
                    </Modal>
                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
});
