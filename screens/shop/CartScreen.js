import React from 'react';
import {View, Button, FlatList, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

import BodyText from "../../components/UI/BodyText";
import TitleText from "../../components/UI/TitleText";
import {colors} from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orders from '../../store/actions/orders';

const CartScreen = props => {
    const dispatch = useDispatch();
    const totalCartSum = useSelector(state => state.cart.totalAmount)
    const cartItemsArr = useSelector(state => {
        const arrTrans = []
        for (let item in state.cart.cartItems) {
            arrTrans.push({
                productId: item,
                productImg: state.cart.cartItems[item].itemImg,
                productPrice: state.cart.cartItems[item].productPrice,
                productTitle: state.cart.cartItems[item].productTitle,
                productQuantity: state.cart.cartItems[item].quantity,
                productSum: state.cart.cartItems[item].sum
            })
        }
        return arrTrans;
    })

    const cartCheck = () => {
        if (cartItemsArr.length === 0) {
            return <BodyText style={{textAlign: 'center', fontSize: 18}}>Корзина пуста</BodyText>
        } else {
            return (
                <FlatList
                    data={cartItemsArr}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => <CartItem
                        itmText={itemData.item.productTitle}
                        itemImg={itemData.item.productImg}
                        cartProductSum={itemData.item.productSum}
                        productQuantity={itemData.item.productQuantity}
                        visibleIcon={true}
                        onRemoveCartItem={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />}
                />
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.totalBlock}>
                <View>
                    <TitleText style={styles.totalSumTxt}>Итого: ${totalCartSum.toFixed(2)}</TitleText>
                </View>
                <View>
                    <Button color={colors.primary}
                            title='Оформить заказ'
                            disabled={cartItemsArr.length === 0}
                            onPress={() => dispatch(orders.addOrder(cartItemsArr, totalCartSum))}
                    />
                </View>
            </View>
            <View style={styles.cartItemsBlock}>
                {cartCheck()}
            </View>
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Корзина'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    },
    totalBlock: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10
    },
    totalSumTxt: {
        fontSize: 18
    },
    orderBtn: {
        backgroundColor: colors.primary
    },
    cartItemsBlock: {
        flex: 1
    }
});

export default CartScreen;
