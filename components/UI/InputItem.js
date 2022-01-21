import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import BodyText from "./BodyText";
import {colors} from "../../constants/colors";

const InputItem = props => {
    return (
        <View style={styles.inputItm}>
            <BodyText style={styles.title}>{props.inputTitle}</BodyText>
            <View style={{...styles.textCont, ...props.style}}>
                <TextInput keyboardType={props.keyboardType}
                           multiline={props.multiline}
                           onChangeText={props.onChangeText}
                           value={props.value}
                           style={styles.input}
                           autoCapitalize='sentences'
                           autoCorrect
                />
            </View>
            {!props.isValid && <BodyText style={{color: 'red'}}>{props.validErrorTxt}</BodyText>}
        </View>
    )
};

const styles = StyleSheet.create({
    inputItm: {
        marginTop: 8,
        width: '100%'
    },
    title: {
        fontWeight: '700',
        fontSize: 16
    },
    textCont: {
        marginTop: 4,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18
    }
})

export default InputItem;
