import React, { PureComponent, Component } from 'react';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import MessPage from 'screen/Message';
import ManagerMess from 'screen/ManagerMess';
import GGMap from 'screen/GGMap';
import Bill from 'screen/Bill';
import Setting from 'screen/Setting';
import Screen2 from 'screen/Setting';
import InfoMapWorker from 'screen/InforMapWorker';
import ScreenTest from 'screen/test/screen2';
import CalenderDoing from 'screen/CalenderDoing'; 
import Momo from 'screen/test/momo';
import Login from '../screen/Login';
import Profile from '../screen/Profile';
import Regitster from '../screen/Register';
import Home from '../screen/Home';
import Search from '../screen/Search';
import InfoWorker from '../screen/InfoWorker';
import Calender from '../screen/Calender';
import Wallet  from 'screen/Wallet';
import TransactionPage from 'screen/Transaction';
import ChatBox from 'screen/ChatBox';
import QRScan from 'screen/Transaction/QRScan';
const scenes = ( key ) => {
  const transitionConfig = 0.5;
  return Actions.create(
    <Scene key="root" transitionConfig={transitionConfig} hideNavBar hideTabBar>
      <Scene key="login" component={Login} title="Đăng nhập" />
      <Scene key="profile" component={Profile} title="Thông tin cá nhân" />
      <Scene key="register" component={Regitster} title="Đăng ký" />
      <Scene key="home" component={Home} title="Trang chủ" />
      <Scene key="search" component={Search} title="Tìm kiếm thợ" />
      <Scene key="screen2" component={Screen2} title="Tìm kiếm thợ" />
      <Scene key="bill" component={Bill} title="Thông tin thợ" />
      <Scene key="infoWorker" component={InfoWorker} title="Thông tin thợ" />
      <Scene key="screen2" component={ScreenTest} title="Tìm kiếm thợ" />
      <Scene key="messPage" component={MessPage} title="Tìm kiếm thợ" />
      <Scene key="managerMess" component={ManagerMess} title="Tìm kiếm thợ" refresh/>
      <Scene key="ggMap" component={GGMap} title="Tìm kiếm thợ" />
      <Scene key="setting" component={Setting} title="Tìm kiếm thợ" />
      <Scene key="transactionNew" component={TransactionPage} title="Tìm kiếm thợ" />

      <Scene key="infoMapWorker" component={InfoMapWorker} title="Tìm kiếm thợ" />
      <Scene key="calender" component={Calender} title="Tìm kiếm thợ" />
      <Scene key="calenderDoing" component={CalenderDoing} title="Tìm kiếm thợ" />
      {/* <Scene key="user" component={User} title="Tìm kiếm thợ"initial /> */}
      <Scene key="wallet" component={Wallet} title="Tìm kiếm thợ"   />
      <Scene key="momo" component={Momo} title="Tìm kiếm thợ" />
      <Scene key="chatBox" component={ChatBox} title="Tìm kiếm thợ" />
      <Scene key="qrScan" component={QRScan} title="Tìm kiếm thợ" />

    </Scene>
  );
};
export default scenes;
