
import { View, Text } from 'react-native'
import React from 'react'
import ZegoExpressEngine,{ZegoTextureView} from 'zego-express-engine-reactnative';
import { findNodeHandle } from 'react-native';
const profile = {
  appID : 286522093,
  scenario : 0
};

ZegoExpressEngine.createEngineWithProfile( profile )

export default function index() {
  let remoteViewRef = findNodeHandle( this.refs.zego_play_view );
  let roomConfig = {};
  roomConfig.token = "xxxx";
  // log in to a room
  ZegoExpressEngine.instance().loginRoom( 'room1', {'userID': 'id1', 'userName': 'user1'}, roomConfig );

  ZegoExpressEngine.instance().on( 'roomStateUpdate', ( roomID, state, errorCode, extendedData ) => {
  // Callback for updates on the current user's room connection status. 
  // When the current user's room connection status changes (for example, when the current user is disconnected from the room or login authentication fails), the SDK sends out the event notification through this callback.
  } ); 


  ZegoExpressEngine.instance().on( 'roomUserUpdate', ( roomID, updateType, userList ) => {
  // Callback for updates on the status of other users in the room. 
  // When other users join or leave the room, the SDK sends out the event notification through this callback.
  } );

  ZegoExpressEngine.instance().on( 'roomStreamUpdate', ( roomID, updateType, streamList ) => {
  // Callback for updates on the status of the streams in the room. 
  // When new streams are published to the room or existing streams in the room stop, the SDK sends out the event notification through this callback.
  } );
  ZegoExpressEngine.instance().startPublishingStream( "streamID" );
  ZegoExpressEngine.instance().startPlayingStream( "streamID", {
    'reactTag': remoteViewRef,
    'viewMode': 0,
    'backgroundColor': 0
  } );
  return (
    <View>
      <Text>index</Text>
      <ZegoTextureView ref='zego_play_view'/>
    </View>
  )
}
