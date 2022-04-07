import notifee from '@notifee/react-native';
import { AppRegistry, Alert } from 'react-native';

class ServiceNotifree {
  static displayLocalNotifree=async ( title, body, data ) => {
    const channelId = await notifee.createChannel( {
      id: 'default',
      name: 'Notification'
    } );

    // Display a notification
    await notifee.displayNotification( {
      title: `<p style="color: #4caf50;"><b>${title}</span></p></b></p> &#128576;`,
      subtitle: '&#129395; xdas',
      body: body,
      data: data || 'data',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon' // optional, defaults to 'ic_launcher'.
        actions: [
          {
            title: '<b>Cancel</b> &#128111;',
            pressAction: { id: 'dance' }
          }
        ]
      }
    } );
  }

  static modaleAppDoing=async ( remoteMessage ) => {
    const data = remoteMessage;
    const { type } = data.data;
    const { body, title } = data.notification;
    if ( type == 0 ) {
      Alert.alert( 'bạn có tin nhắn mới', body );
    }
  }
}
export default ServiceNotifree;
