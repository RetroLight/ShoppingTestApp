import React from 'react';
import {View, Image, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {useDispatch} from "react-redux";

import * as carActions from '../../store/actions/cart';

const ProductDetailsScreen = props => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('itemId');
    const productData = useSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === productId)
    })
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.image} source={{uri: productData.imageURL}}/>
                <Text style={styles.price}>${productData.price.toFixed(2)}</Text>
                <View style={styles.addToCartBtn}>
                    <Button color={colors.primary}
                            title='Добавить в корзину'
                            onPress={() => dispatch(carActions.addToCart(productData))}/>
                </View>
                <Text style={styles.productDescr}>{productData.description}</Text>
            </ScrollView>
        </View>
    )
}

ProductDetailsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 300
    },
    price: {
        color: '#888',
        fontFamily: 'open-sans',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginVertical: 10
    },
    addToCartBtn: {
        alignItems: 'center'
    },
    productDescr: {
        textAlign: 'left',
        marginVertical: 10,
        marginHorizontal: 12,
        fontSize: 16,
    }
})

export default ProductDetailsScreen;
