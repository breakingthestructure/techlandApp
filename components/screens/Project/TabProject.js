import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, TabHeading, Icon, Content } from 'native-base';

import ActionProject from './ActionProject';
import SetCalendar from './SetCalendar';
import Header from '../Home/Header';
import imgDuan from './../../../images/duan.jpg';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import CalcDebt from './CalcDebt';
import AdvanceSearch from './AdvanceSearch';

const { height } = Dimensions.get('window');

export default class TabProject extends Component {
    render() {
        return (
            <Container>
                <Header navigation={this.props.navigation} title='DỰ ÁN' />
                <Image source={imgDuan} style={{ width: '100%', height: height / 6 }} />
                <Content>
                    <Tabs
                        tabBarUnderlineStyle={{ backgroundColor: '#4bc6b0' }}
                        tabBarBackgroundColor={'#000'}
                        renderTabBar={() => <ScrollableTab style={{ backgroundColor: '#F58319' }} />}
                        locked
                        tabBarPosition='top'
                    >
                        <Tab
                            heading="Tính lãi suất vay"
                            // heading={<TabHeading style={{ backgroundColor: '#F58319' }} ><Icon name="ios-calculator" /></TabHeading>}
                            tabStyle={{ backgroundColor: '#F58319' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: 'white' }}
                            activeTextStyle={{ color: '#000', fontWeight: '500' }}
                        >
                            <CalcDebt />
                        </Tab>
                        <Tab
                            heading="Đặt lịch"
                            // heading={<TabHeading style={{ backgroundColor: '#F58319' }} ><Icon name="ios-calendar" /></TabHeading>}
                            tabStyle={{ backgroundColor: '#F58319' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: 'white' }}
                            activeTextStyle={{ color: '#000', fontWeight: '500' }}
                        >
                            <SetCalendar />
                        </Tab>
                        <Tab
                            heading="Tiện ích dự án"
                            // heading={<TabHeading style={{ backgroundColor: '#F58319' }} ><Icon name="ios-bicycle" /></TabHeading>}
                            tabStyle={{ backgroundColor: '#F58319' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: 'white' }}
                            activeTextStyle={{ color: '#000', fontWeight: '500' }}
                        >
                            <ActionProject navigation={this.props.navigation} />
                        </Tab>
                        <Tab
                            heading="Hỗ trợ dự án"
                            // heading={<TabHeading style={{ backgroundColor: '#F58319' }} ><Icon name="ios-call" /></TabHeading>}
                            tabStyle={{ backgroundColor: '#F58319' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: 'white' }}
                            activeTextStyle={{ color: '#000', fontWeight: '500' }}
                        >
                            <SupportProject navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        );
    }
}
