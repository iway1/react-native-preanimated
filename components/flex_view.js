import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { CenteredView } from './centered_view';


export function FlexView({
    position,
    height,
    width,
    opacity=1.0,
    rotationDegrees = 0,
    rotationChangeTime = 1000,
    opacityChangeTime = 1000,
    positionChangeTime = 1000,
    sizeChangeTime = 1000,
    maxRotationDegrees=1800,
    children,
}) {
    
    const origin = useRef({...position}).current;
    const positionTranslate = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const animatedScaleX = useRef(new Animated.Value(1)).current;
    const animatedScaleY = useRef(new Animated.Value(1)).current;
    const animatedOpacity = useRef(new Animated.Value(opacity)).current;
    const animatedRotationValue = useRef(new Animated.Value(rotationDegrees / 360)).current;
    const [layout, setLayout] = useState({width: 0, height: 0});
    const [hasLayout, setHasLayout] = useState(false);

    useEffect(()=>{
        Animated.timing(positionTranslate, {
            useNativeDriver: true,
            duration: positionChangeTime,
            toValue: {
                x: position.x - origin.x,
                y: position.y - origin.y,
            },
        }).start();
    }, [position]);

    useEffect(()=>{
        if(hasLayout)
            Animated.timing(animatedScaleY, {
                duration: sizeChangeTime,
                toValue: height / layout.height,
                useNativeDriver: true,
            }).start();
    }, [height])

    useEffect(()=>{
        if(hasLayout)
            Animated.timing(animatedScaleX, {
                duration: sizeChangeTime,
                toValue: width / layout.width,
                useNativeDriver: true,
            }).start();
    }, [width])

    useEffect(()=>{
        Animated.timing(animatedRotationValue, {
            useNativeDriver: true,
            toValue: rotationDegrees / 360,
            duration: rotationChangeTime,
        }).start();
    }, [rotationDegrees]);

    return (
        <CenteredView 
            origin={origin} 
            onLayout={(e)=>{
                setLayout(e.nativeEvent.layout);
                setHasLayout(true);
            }}
            style={{
                opacity: animatedOpacity,
                transform: [
                    {translateX: positionTranslate.x}, 
                    {translateY: positionTranslate.y},
                    {scaleX: animatedScaleX},
                    {scaleY: animatedScaleY},
                    {rotate: animatedRotationValue.interpolate({
                        inputRange: [-(maxRotationDegrees / 360), maxRotationDegrees / 360],
                        outputRange: [ -maxRotationDegrees + 'deg', maxRotationDegrees + 'deg']
                    })}
                ]
            }}
        >
            {children}
        </CenteredView>
    )

}