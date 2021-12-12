import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TitleText = props => <Text style={{...styles.txt, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    txt: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    }
})

export default TitleText;
