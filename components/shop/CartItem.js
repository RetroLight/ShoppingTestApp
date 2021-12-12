import React from 'react';
import {View, Image, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import CustomBlock from '../UI/CustomBlock';

import BodyText from "../UI/BodyText";

const CartItem = props => {
    return (
        <CustomBlock style={styles.cartItem}>
            <View style={styles.cartProductTitleBlock}>
                <Image style={styles.cartProductImg} source={{uri: props.itemImg}}/>
                <BodyText numberOfLines={1} style={styles.cartItemTitle}>{props.itmText}</BodyText>
            </View>
            <View style={styles.priceBlock}>
                <View>
                    <BodyText style={styles.cartItemQuantity}>{props.productQuantity}шт.</BodyText>
                    <BodyText style={styles.cartProductSum}>${props.cartProductSum.toFixed(2)}</BodyText>
                </View>
                {props.visibleIcon && <TouchableOpacity activeOpacity={0.7} style={{marginLeft: 6}} onPress={props.onRemoveCartItem}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color={'#C42200'} size={23}/>
                </TouchableOpacity>}
            </View>
        </CustomBlock>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.17,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
        elevation: 1,
        marginHorizontal: 0
    },
    cartProductTitleBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartProductImg: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    cartItemTitle: {
        fontSize: 18,
        marginLeft: 8,
        width: '57%',
        maxWidth: '57%'
    },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartItemQuantity: {
        fontSize: 18,
        textAlign: 'right'
    },
    cartProductSum: {
        fontSize: 18,
        textAlign: 'right'
    }
})

export default CartItem;
