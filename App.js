import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { CenteredView } from './components/centered_view';
import { FlexView } from './components/flex_view';

const initialStarSize = {width: 80, height: 80};

export default function App() {
  const [viewPosition, setViewPosition] = useState({x: Dimensions.get('window').width / 2, y: Dimensions.get('window').height / 2});
  const [starSize, setStarSize] = useState({width: 80, height: 80});
  const [starRotation, setStarRotation] = useState(0);
  
  useEffect(()=>{
    setTimeout(()=>{
      // setViewPosition({x: viewPosition.x + 500, y: viewPosition.y + 200})
      setStarSize({width: 160, height: 90})
      setStarRotation(720);
    },1000)
  },[])

  return (
    <View style={styles.container}>
      <FlexView rotationDegrees={starRotation} position={viewPosition} height={starSize.height} width={starSize.width}>
        <Image style={{width: initialStarSize.width, height: initialStarSize.height}} source={require('./star.png')} />
      </FlexView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
