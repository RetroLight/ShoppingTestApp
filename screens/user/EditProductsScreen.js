import React, {useCallback, useEffect, useReducer} from 'react';
import {View, ScrollView, Alert, Platform, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import InputItem from "../../components/UI/InputItem";
import * as productActions from '../../store/actions/products';

const REDUCER_INPUT_UPDATE = 'REDUCER_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === REDUCER_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

const EditProductScreen = props => {
    const pid = props.navigation.getParam('pid');
    const editingProduct = useSelector(state => state.products.usersProducts.find(product => product.id === pid))

    console.log(editingProduct)

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editingProduct ? editingProduct.title : '',
            imageURL: editingProduct ? editingProduct.imageURL : '',
            price: editingProduct ? editingProduct.price.toString() : '',
            description: editingProduct ? editingProduct.description : ''
        },
        inputValidities: {
            title: editingProduct ? true : false,
            imageURL: editingProduct ? true : false,
            price: editingProduct ? true : false,
            description: editingProduct ? true : false
        },
        formIsValid: editingProduct ? true : false,
    })

    const completeEditHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Ошибка', 'Заполните все поля', [{text: 'Ок'}]);
            return;
        }
        if (editingProduct) {
            dispatch(productActions.editProduct(
                editingProduct.id,
                formState.inputValues.title,
                formState.inputValues.imageURL,
                formState.inputValues.description,
                +formState.inputValues.price))
        } else {
            dispatch(productActions.addProduct(
                formState.inputValues.title,
                formState.inputValues.imageURL,
                formState.inputValues.description,
                +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [dispatch, pid, formState])

    useEffect(() => {
        props.navigation.setParams({submit: completeEditHandler})
    }, [completeEditHandler])

    const textChangeHandler = (inputLabel, text) => {
        let isValid = false;
        if(text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: REDUCER_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputLabel
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <InputItem
                        inputTitle='Заголовок'
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        isValid={formState.formIsValid}
                        validErrorTxt='Введите правильный заголовок'
                    />
                    <InputItem
                        inputTitle='Картинка'
                        value={formState.inputValues.imageURL}
                        onChangeText={textChangeHandler.bind(this, 'imageURL')}
                    />
                    <InputItem
                        keyboardType='numeric'
                        inputTitle='Цена'
                        value={formState.inputValues.price}
                        onChangeText={textChangeHandler.bind(this, 'price')}
                    />
                    <InputItem
                        multiline={true}
                        style={{height: 200}}
                        inputTitle='Описание'
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitHandler = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('pid') ? 'Редактировать товар' : 'Новый товар',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitHandler}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    formContainer: {
        marginTop: 10,
        marginBottom: 4
    }
})

export default EditProductScreen;
