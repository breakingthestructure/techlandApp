import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import { Container, Content, Item, Input, Icon, Spinner } from 'native-base';
import login from './../../../api/login';
import saveToken from './../../../api/saveToken';
import saveUser from './../../../api/saveUser';
import GLOBAL from './../../../Globals';

import bgImg from './../../../icons/bg.png';
import icDevelop from './../../../icons/develop.png';
import icLogo from './../../../icons/logofull.png';
import icPartner from './../../../icons/partner.png';
import icSale from './../../../icons/sale.png';
import icInvestor from './../../../icons/investor.png';
import icCustomer from './../../../icons/customer.png';

const { width } = Dimensions.get('window');

export default class Intro extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }
    postLogin() {
        this.setState({ loaded: false });
        const { email, password } = this.state;
        login(email, password)
            .then(resJson => {
                console.log(resJson);
                if (resJson.access_token) {
                    GLOBAL.user = resJson;
                    saveUser(resJson);
                    saveToken(resJson.access_token);
                    this.setState({ loaded: true });
                    Alert.alert(
                        'Thông báo',
                        'Đăng nhập thành công',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen') },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        'Thông báo',
                        'Đăng nhập thất bại',
                        [
                            { text: 'OK', onPress: () => console.log(password) },
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.state.loaded) {
            return (
                <View style={styles.wrapper}>
                    <View style={{ alignItems: 'center', paddingTop: 10 }}>

                        <View style={{ paddingTop: 20 }}>
                            <Image source={icLogo} style={{ width: width - 200, height: ((width - 200) / 935) * 152 }} />
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#cccccc',
                                borderBottomWidth: 1,
                                width: width / 1.5,
                                paddingTop: 20
                            }}
                        />
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>TRUY CẬP NHANH</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 30, width: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icDevelop} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center', padding: 2 }}>
                                    <Text style={styles.btnTextAction}>ĐƠN VỊ PHÁT TRIỂN</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icPartner} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>ĐỐI TÁC HỢP TÁC</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icCustomer} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>KHÁCH HÀNG BẤT ĐỘNG SẢN</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icSale} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>CHUYÊN VIÊN TƯ VẤN</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icInvestor} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>NHÀ ĐẦU TƯ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333333' }}>ĐĂNG NHẬP NGAY</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 30 }}>
                            <Content>
                                <Item
                                    style={{
                                        borderColor: '#33563743',
                                        // borderWidth: 1,
                                        height: 50,
                                        // borderRadius: 2,
                                        marginLeft: 0,
                                        width: '100%',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        borderWidth: 1,
                                    }}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12, paddingLeft: 30 }}
                                        placeholder='E-mail'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                    />
                                    <Icon active name='ios-mail' style={{ color: 'gray', marginRight: 15 }} />
                                </Item>
                            </Content>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 30 }}>
                            <Content>
                                <Item
                                    style={{
                                        borderColor: '#33563743',
                                        height: 50,
                                        marginLeft: 0,
                                        width: '100%',
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderWidth: 1,
                                    }}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12, paddingLeft: 30 }}
                                        placeholder='Mật khẩu'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ password: text })}
                                        value={this.state.password}
                                        secureTextEntry
                                    />
                                    <Icon active name='ios-lock' style={{ color: 'gray', marginRight: 15 }} />
                                </Item>
                            </Content>
                        </View>
                        <View style={{ width: '100%', paddingTop: 10, paddingHorizontal: 30 }}>
                            <TouchableOpacity onPress={this.postLogin.bind(this)} style={styles.bigBtn}>
                                <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: 30 }}>
                            <View style={styles.labelAction}>
                                <Text style={{ color: '#000', fontSize: 12 }}>ĐĂNG KÝ</Text>
                                <Text style={{ color: '#000', fontSize: 12 }}>QUÊN MẬT KHẨU ?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <Image source={bgImg} style={{ width, height: (width / 1440) * 550 }} />
                    </View>
                </View >

            );
        }
        return (
            <Container>
                <Content >
                    <Spinner />
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width
    },
    btnAction: {
        width: '18%',
        height: 70,
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        margin: 2,
        borderRadius: 5
    },
    inputStyle: {
        height: 50,
        paddingVertical: 0,
        borderWidth: 1
    },
    btnTextAction: {
        fontSize: 8,
        fontWeight: '500',
        textAlign: 'center'
    },
    bigBtn: {
        height: 50,
        borderRadius: 5,
        // borderWidth: 1,
        backgroundColor: '#f4ad49',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 0,
        paddingEnd: 0,
        marginBottom: 0,
    },
    btnText: {
        color: '#fff'
    },
    labelAction: {
        justifyContent: 'space-between', flexDirection: 'row', padding: 10, backgroundColor: 'transparent'
    }
});
