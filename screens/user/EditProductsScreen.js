import React, {useCallback, useEffect, useReducer} from 'react';
import {View, ScrollView, Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
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
        for (const key in updatedValidities) {
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

    const inputChangeHandler = useCallback((inputLabel, inputValue, inputValidity) => {
        dispatchFormState({
            type: REDUCER_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputLabel
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        <InputItem
                            inputLabel='title'
                            inputTitle='Заголовок'
                            value={formState.inputValues.title}
                            onInputChange={inputChangeHandler}
                            isValid={formState.formIsValid}
                            validErrorTxt='Введите правильный заголовок'
                            initialValue={editingProduct ? editingProduct.title : ''}
                            initialValid={!!editingProduct}
                            required
                        />
                        <InputItem
                            inputLabel='imageURL'
                            inputTitle='Картинка'
                            value={formState.inputValues.imageURL}
                            onInputChange={inputChangeHandler}
                            validErrorTxt='Введите ссылку на изображение'
                            initialValue={editingProduct ? editingProduct.imageURL : ''}
                            initialValid={!!editingProduct}
                            required
                        />
                        <InputItem
                            inputLabel='price'
                            inputTitle='Цена'
                            keyboardType='numeric'
                            value={formState.inputValues.price}
                            validErrorTxt='Укажите цену'
                            onInputChange={inputChangeHandler}
                            initialValue={editingProduct ? editingProduct.price : ''}
                            initialValid={!!editingProduct}
                            required
                            min={0.1}
                        />
                        <InputItem
                            inputLabel='description'
                            multiline={true}
                            style={{height: 200}}
                            inputTitle='Описание'
                            validErrorTxt='Опишите товар'
                            value={formState.inputValues.description}
                            onInputChange={inputChangeHandler}
                            initialValue={editingProduct ? editingProduct.description : ''}
                            initialValid={!!editingProduct}
                            required
                            minLength={5}
                        />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
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
