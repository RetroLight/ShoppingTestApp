import React, {useReducer, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import BodyText from "./BodyText";
import {colors} from "../../constants/colors";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

const InputItem = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValue,
        touched: false
    })

    const {onInputChange} = props

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(props.inputLabel, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, props.inputLabel])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    const lostFocusHandler = () => {
        dispatch({type: INPUT_BLUR})
    }

    return (
        <View style={styles.inputItm}>
            <BodyText style={styles.title}>{props.inputTitle}</BodyText>
            <View style={{...styles.textCont, ...props.style}}>
                <TextInput keyboardType={props.keyboardType}
                           multiline={props.multiline}
                           onChangeText={textChangeHandler}
                           value={inputState.value}
                           style={styles.input}
                           autoCapitalize='sentences'
                           autoCorrect
                           onBlur={lostFocusHandler}
                />
            </View>
            {!inputState.isValid && inputState.touched && <View style={styles.errorTxtCont}><BodyText style={styles.errorTxt}>{props.validErrorTxt}</BodyText></View>}
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
    },
    errorTxtCont: {

    },
    errorTxt: {
        color: 'red'
    }
})

export default InputItem;
