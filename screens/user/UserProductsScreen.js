import React from 'react';
import {Button, FlatList, Alert, Platform} from 'react-native';
import {useSelector, useDispatch} from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.usersProducts)
    const editProductHandler = (id) => {
        props.navigation.navigate('editProduct', {pid: id})
    }

    const deleteHandler = (id) => {
        Alert.alert('Вы уверены?', 'Вы действительно хотите удалить выбранный товар?', [
            {text: 'Нет', style: 'default'},
            {text: 'Да', style: 'destructive', onPress: () => dispatch(productActions.deleteProduct(id))}
        ]);
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
            imageUrl={itemData.item.imageURL}
            title={itemData.item.title}
            price={itemData.item.price}
            onItemPress={() => editProductHandler(itemData.item.id)}>
            <Button onPress={() => editProductHandler(itemData.item.id)} title='Редактировать'/>
            <Button onPress={deleteHandler.bind(this, itemData.item.id)} title='Удалить'/>
        </ProductItem>}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Мои товары',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='add'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => navData.navigation.navigate('editProduct')}
                />
            </HeaderButtons>
        )
    }
};

export default UserProductsScreen;
