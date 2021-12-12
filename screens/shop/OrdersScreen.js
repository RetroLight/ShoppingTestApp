import React from 'react';
import {View, Text, FlatList, StyleSheet, Platform} from 'react-native';
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = props => {
    const orderData = useSelector(state => state.orders.orders)

    return (
        <View style={styles.screen}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={orderData}
                renderItem={itemData => {
                    return <OrderItem
                        totalOrderSum={itemData.item.totalAmount}
                        orderDate={itemData.item.readableDate}
                        orderItems={itemData.item.orderItems}
                    />
                }}
            />
        </View>
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'История заказов',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    }
})

export default OrdersScreen;
