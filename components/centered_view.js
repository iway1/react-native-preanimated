import React, { useRef, useState } from "react";
import { View, Animated } from "react-native";


export function CenteredView({style={},containerStyle={}, onLayout=()=>{}, origin, children}) {
    const [layout, setLayout] = useState({width: 0, height: 0});
    console.log("Layout is ")
    console.log(layout);
    return (
        <Animated.View 
            style={{
                width: 0, height: 0,
                left: origin.x, top: origin.y,
                position: 'absolute',
                ...style,
            }}
        >
            <Animated.View
                onLayout={(e)=>{
                    setLayout(e.nativeEvent.layout);
                    onLayout(e);
                }} 
                style={{
                    position: 'absolute',
                    left: -layout.width / 2,
                    top: -layout.height / 2,
                    ...containerStyle,
                }}
            >
                {children}
            </Animated.View>
        </Animated.View>
    )
}