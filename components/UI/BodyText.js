import React from 'react';
import {Text, StyleSheet} from 'react-native';

const BodyText = props => <Text numberOfLines={props.numberOfLines} style={{...styles.txt, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    txt: {
        fontFamily: 'open-sans',
        fontSize: 16
    }
})

export default BodyText;
