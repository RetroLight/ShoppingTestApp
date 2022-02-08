import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ShopNavigator from './navigation/ShopNavigator';
import orders from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orders
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools())


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={() => console.log('Font fetching error')}/>
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ShopNavigator/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
