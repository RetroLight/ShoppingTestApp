import React, {useEffect} from 'react';
import {View, FlatList, Platform, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products.availableProducts)

    useEffect(() => {
        dispatch(productsActions.fetchProducts())
    }, [dispatch])

    const onDetailsPress = (itemId, productTitle) => {
        props.navigation.navigate({
            routeName: 'productDetails',
            params: {
                itemId: itemId,
                productTitle: productTitle
            }
        })
    }

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={productsList}
                keyExtractor={item => item.id}
                renderItem={itemData => <ProductItem
                    imageUrl={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onItemPress={() => onDetailsPress(itemData.item.id, itemData.item.title)}>
                    <Button onPress={() => onDetailsPress(itemData.item.id, itemData.item.title)} title='Посмотреть'/>
                    <Button onPress={() => dispatch(cartActions.addToCart(itemData.item))} title='В корзину'/>
                </ProductItem>}
            />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Все товары',
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
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}
;

export default ProductsOverviewScreen;
