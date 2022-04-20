import React from 'react';

export const MENU = {
  SET_MENU_FOOTER: 'SET_MENU_FOOTER',
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  SEARCH: 'SEARCH',
  MESSAGE: 'MESSAGE',
  USER: 'USER'
};
export const KEY_PAGE = {
  SET_LIST_WORKER: 'SET_LIST_WORKER',
  SET_LIST_QUALITY_WORKER: 'SET_LIST_QUALITY_WORKER',
  SET_LIST_NEAR: 'SET_LIST_NEAR',
  SET_CALENDER: 'SET_CALENDER',
  SET_CALENDER_DOING: 'SET_CALENDER_DOING',
  MESSAGE: 'MESSAGE',
  WALLET: 'WALLET',
  TOKEN : 'TOKEN'
};

export default Title = {
  User: {
    password: 'Mật khẩu',
    numberPhone: 'Số điện thoại',
    name: 'Họ tên',
    address: 'Địa chỉ ',
    password2: 'Mời bạn nhập lại mật khẩu',
    numberView: 'Lượt xem',
    fixedAddress: 'Địa chỉ cố định',
    numberWorker: 'Số điện thoại thợ',
    numberCustomer: 'SDT khách hàng',
    busy: 'Đang làm'
  },
  Error: {
    noLogin: 'Sai tài khoản hoặc mật khẩu'
  },
  War: {
    warningDelete: 'Bạn có chắc chắn xóa ?',
    warningLocation: 'Bạn chưa bật GPS',
    passwordFail: 'Mật khẩu chưa đủ tiêu chuẩn !',
    numberPhoneFail: 'Số điện thoại chỉ 10 đến 11 số !',
    password2Fail: 'Mật khẩu nhập lại chưa đúng !',
    callFail: 'Thợ đang bận !'
  },
  TitleBtn: {
    submit: 'Xác nhận',
    close: 'Thoát',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    keepLogin: 'Giữ đăng nhập',
    good: 'Rất tốt',
    bad: 'Chưa tốt lém',
    call: 'Gọi ngay',
    maintenance: 'Bảo trì',
    history: 'Xem lại hóa đơn',
    logOut: 'Đăng xuất',
    setUpCalendar: 'Đặt lịch bảo trì',
    calender: 'Lịch bảo trì',
    callNow: 'Yêu cầu tới thợ tới liền',
    viewMap: 'xem bản đồ',
    callLive: 'Gọi trực tiếp',
    callWifi: 'Gọi trực tuyến'
  },
  List: {
    listSearch: 'Danh sách thợ',
    listQuality: 'Danh sách nhiều người xem nhất',
    listNearWorkerr: 'Danh sách thợ gần nhất',
    listNumberCall: 'Danh sách thợ được gọi nhiều nhất'
  },
  Notification: {
    buildSucess: 'Hóa đơn hoàn thành',
    buildFail: 'Hóa đơn chưa hoàn thành',
    setupBuild: 'Có khách đang gọi thợ',
    messageNew: 'Bạn có tin nhắn mới',
    successMessage: 'Lưu thành công',
    submitCalender: 'Xác nhận lịch hẹn',
    unSubmitCalender: 'Xác nhận hủy lịch hẹn bảo trì '
  },
  Options: {
    near: 'Gần nhất',
    placeYourLive: 'Gần nơi bạn đang sống',
    quality: 'Xem nhiều',
    option: 'Chức năng'
  },
  NormalTitle: {
    addressNew: 'Địa chỉ mặc định khi không bật GPS',
    titleAccount: 'Bạn đã có tài khoản ?',
    questionAccount: 'Bạn có tài khoản chưa ?',
    passwordOld: 'Mật khẩu cũ',
    book: 'Đặt lịch',
    date: 'Ngày',
    option: 'Mời bạn chọn',
    profile: 'Trang cá nhân',
    home: 'Trang chủ',
    message: 'Tin nhắn',
    feeback: 'Đánh giá',
    edit: 'Chỉnh sửa',
    new: 'Mới',
    questionWorker: 'Bạn có phải là thợ không ?',
    totalMoney: 'Tổng tiền',
    note: 'Nội dung ',
    titleInforWord: 'Thông tin thợ',
    titleAccountUser: 'Thông tin cá nhân',
    all: 'Tất cả',
    brokenCar: 'Xe hư',
    statusWork: 'Tình trạng',
    dateCall: 'Ngày gọi',
    dateSetUp: 'Ngày hẹn',
    success: ' Hoàn thành',
    doing: ' Đang làm',
    searchNumberPhone: 'Tìm kiếm số điện thoại',
    ggMap: 'Bản đồ',
    calenderDoing: 'Lịch hẹn đang làm',
    statistical: 'Thống kê doanh thu',
    historyWe3: 'Lịch sử giao dịch'
  },
  Menu: {
    HOME: 'HOME',
    PRO_FILE: 'PROFILE',
    SEARCH: 'SEARCH',
    MESSAGE: 'MESSAGE'
  },
  NameScreen: {
    bill: 'Quản lý hóa đơn',
    account: 'Quản lý tài khoản',
    message: 'Quản lý tin nhắn',
    calender: 'Quản lý lịch bảo trì',
    setUpCalendar: 'Đặt lịch bảo trì',
    messageNew: 'Tin nhắn mới',
    setting: 'Cài đặt',
    infoMapWorker: 'Thông tin vị trí thợ',
    calenderDoing: 'Lịch hẹn đang làm',
    wallet: 'Quản lý ví tiền'
  },
  StatusMess: {
    noRead: 'Chưa đọc',
    noSeen: ' Chưa xem',
    seen: 'Đã xem',
    read: 'Đã đọc',
    new: 'Tin mới',
    newBuild: 'Thành lập hóa đơn'
  },
  web3:{
    newTransaction:'Tạo giao dịch',
    historyTransaction:'Lịch sử giao dịch',
    newWallet:'Tạo ví',
    send:'Gửi tiền',
    receive:'Nhận tiền',
    amount:'Số Token (coin)',
    toAddress:'Địa chỉ nhận'

  }
};
export const chainType = {
  ether: 'ether',
  matic: 'matic',
  avax: 'avax'
};
export const chainMainCoinSymbol = {
  [chainType.ether]: 'ETH',
  [chainType.matic]: 'MATIC',
  [chainType.avax]: 'AVAX'
};
export const SUPPORT_CHAIN = {
  [chainType.ether]: {
    icon: 'images.etherIcon',
    name: 'Ethereum',
    chain: chainType.ether
  },

  [chainType.matic]: {
    icon: 'images.maticIcon',
    name: 'Matic (Polygon)',
    chain: chainType.matic
  },
  [chainType.avax]: {
    icon: 'images.avaxIcon',
    name: 'Avalanche',
    chain: chainType.avax
  }
};

export const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
export const APP_CURRENCY = {
  USD: 'USD',
  VND: 'VND'
};
export const TOKEN_ADDRESS_DEFAULT = '0x0000000000000000000000000000000000000000';
export const MAIN_TX_ACTION_TYPE = 'main';
export const CRYPTO_NAME = {
  ETHEREUM: 'ETH',
  BITCOIN: 'BTC',
  ETHEREUMFULLNAME: 'Ethereum',
  ETHEREUMSHORTNAME: 'Ether'
};

export const APP_ENVIRONMENT = {
  MAINNET: 'MAINNET',
  TESTNET: 'TESTNET'
};
