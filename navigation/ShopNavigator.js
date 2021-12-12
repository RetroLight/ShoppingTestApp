import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductsScreen";
import {colors} from '../constants/colors';
import {Ionicons} from "@expo/vector-icons";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? '#FFF' : colors.primary
}

const ProductsNavigator = createStackNavigator({
    products: ProductsOverviewScreen,
    productDetails: ProductDetailsScreen,
    cart: CartScreen
}, {
    navigationOptions: {
        title: 'Магазин',
        drawerIcon: drawerCfg => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                color={drawerCfg.tintColor}
                size={23}
            />
        )
    },
    defaultNavigationOptions: defaultNavigationOptions
})

const OrdersNavigator = createStackNavigator({
    orders: OrdersScreen
}, {
    navigationOptions: {
        title: 'История заказов',
        drawerIcon: drawerCfg => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                color={drawerCfg.tintColor}
                size={23}
            />
        )
    },
    defaultNavigationOptions: defaultNavigationOptions
})

const AdminNavigator = createStackNavigator({
    userProducts: UserProductsScreen,
    editProduct: EditProductScreen
}, {
    navigationOptions: {
        title: 'Мои товары',
        drawerIcon: drawerCfg => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                color={drawerCfg.tintColor}
                size={23}
            />
        )
    },
    defaultNavigationOptions: defaultNavigationOptions
})

const ShopNavigator = createDrawerNavigator({
    products: ProductsNavigator,
    orders: OrdersNavigator,
    admin: AdminNavigator
})

export default createAppContainer(ShopNavigator);



