import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import {colors} from "../../constants/colors";
import CartItem from "./CartItem";
import BodyText from "../UI/BodyText";
import TitleText from "../UI/TitleText";
import CustomBlock from "../UI/CustomBlock";

const OrderItem = props => {
    const [isDetails, setIsDetails] = useState(false)

    return (
        <CustomBlock style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
                <TitleText>Итого: ${props.totalOrderSum.toFixed(2)}</TitleText>
                <BodyText>{props.orderDate}</BodyText>
            </View>
            <View style={{marginTop: 10}}>
                <Button
                    title={isDetails ? 'Скрыть' : 'Детали'}
                    color={colors.primary}
                    onPress={()=> setIsDetails(!isDetails)}
                />
            </View>
            <View style={styles.orderDetailsCont}>
                {isDetails && props.orderItems.map(item => <CartItem
                    key={item.productId}
                    itemImg={item.productImg}
                    itmText={item.productTitle}
                    cartProductSum={item.productSum}
                    productQuantity={item.productQuantity}
                />)}
            </View>
        </CustomBlock>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.17,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
        elevation: 1,
        alignItems: 'center',
        marginHorizontal: 0
    },
    orderItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    orderDetailsCont: {
        width: '100%'
    }
})

export default OrderItem;
