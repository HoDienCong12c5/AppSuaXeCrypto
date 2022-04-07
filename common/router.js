import React, { PureComponent, Component } from 'react';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import MessPage from 'screen/Message/index';
import ManagerMess from 'screen/ManagerMess';
import GGMap from 'screen/GGMap/index';
import Bill from 'screen/Bill/index';
import Setting from 'screen/Setting/index';
import Screen2 from 'screen/Setting/index';
import InfoMapWorker from 'screen/InforMapWorker';
import ScreenTest from 'screen/test/screen2';
import CalenderDoing from 'screen/CalenderDoing/index';
import User from 'screen/test/user';
import Momo from 'screen/test/momo';
import Login from '../screen/Login/index';
import Profile from '../screen/Profile/index';
import Regitster from '../screen/Register/index';
import Home from '../screen/Home/index';
import Search from '../screen/Search/index';
import InfoWorker from '../screen/InfoWorker/index';
import Calender from '../screen/Calender/index';

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
      <Scene key="infoMapWorker" component={InfoMapWorker} title="Tìm kiếm thợ" />
      <Scene key="calender" component={Calender} title="Tìm kiếm thợ" />
      <Scene key="calenderDoing" component={CalenderDoing} title="Tìm kiếm thợ" />
      {/* <Scene key="user" component={User} title="Tìm kiếm thợ"initial /> */}
      <Scene key="momo" component={Momo} title="Tìm kiếm thợ" />
    </Scene>
  );
};
export default scenes;
