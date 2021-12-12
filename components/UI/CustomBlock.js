import React from 'react';
import {View, StyleSheet} from 'react-native';

const CustomBlock = props => {
    return (
        <View style={{...styles.touchable, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    touchable: {
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default CustomBlock;
