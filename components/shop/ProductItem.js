import React from 'react';
import {View, Image, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

import BodyText from '../UI/BodyText';
import CustomBlock from "../UI/CustomBlock";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <CustomBlock style={styles.itemCont}>
            <TouchableCmp onPress={props.onItemPress} useForeground activeOpacity={0.7}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.imageUrl}}/>
                    </View>
                    <View style={styles.details}>
                        <BodyText style={styles.title}>{props.title}</BodyText>
                        <BodyText style={styles.price}>${props.price.toFixed(2)}</BodyText>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </CustomBlock>
    )
};

const styles = StyleSheet.create({
    itemCont: {
        height: 300,
        marginTop: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        height: '15%',
        alignItems: 'center',
        marginTop: 4
    },
    title: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: '600',
        marginTop: 10
    },
    price: {
        fontSize: 16,
        color: '#888'
    },
    actions: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})

export default ProductItem;
