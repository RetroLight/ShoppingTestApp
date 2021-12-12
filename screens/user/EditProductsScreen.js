import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, Platform, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import InputItem from "../../components/UI/InputItem";
import * as productActions from '../../store/actions/products';

const EditProductScreen = props => {
    const pid = props.navigation.getParam('pid');
    const editingProduct = useSelector(state => state.products.usersProducts.find(product => product.id === pid))

    const [title, setTitle] = useState(editingProduct ? editingProduct.title : null);
    const [imageURL, setImageURL] = useState(editingProduct ? editingProduct.imageURL : null);
    const [price, setPrice] = useState(editingProduct ? editingProduct.price.toString() : null);
    const [description, setDescription] = useState(editingProduct ? editingProduct.description : null);

    const dispatch = useDispatch();

    const completeEditHandler = useCallback(() => {
        if(editingProduct) {
            dispatch(productActions.editProduct(editingProduct.id, title, imageURL, description, +price))
        } else {
            dispatch(productActions.addProduct(title, imageURL, description, +price))
        }
        props.navigation.goBack()
    }, [dispatch, title, imageURL, description, price])

    useEffect(() => {
        props.navigation.setParams({submit: completeEditHandler})
    }, [completeEditHandler])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <InputItem inputTitle='Заголовок' value={title} onChangeText={text => setTitle(text)}/>
                    <InputItem inputTitle='Картинка' value={imageURL} onChangeText={text => setImageURL(text)}/>
                    <InputItem inputTitle='Цена' value={price} onChangeText={text => setPrice(text)}/>
                    <InputItem multiline={true} style={{height: 200}} inputTitle='Описание' value={description} onChangeText={text => setDescription(text)}/>
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
