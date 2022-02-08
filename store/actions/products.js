import Product from '../../models/productCls';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        const response = await fetch('https://firedata-2f406-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
        });
        const resData = await response.json();
        const resDataArr = []
        for(let key in resData) {
            resDataArr.push(new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageURL,
                resData[key].description,
                resData[key].price
            ))
        }
        dispatch({type: SET_PRODUCTS, products: resDataArr})
    }
}

export const addProduct = (title, imageURL, description, price) => {
    return async dispatch => {
        //any async code
        const response = await fetch('https://firedata-2f406-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageURL,
                description,
                price
            })
        });

        const resData = await response.json();
        //any async code
        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                title,
                imageURL,
                description,
                price
            }
        })
    }
}

export const deleteProduct = (productId) => {
    return (
        {
            type: DELETE_PRODUCT,
            pid: productId
        }
    )
};

export const editProduct = (productId, title, imageURL, description, price) => {
    return (
        {
            type: EDIT_PRODUCT,
            pid: productId,
            productData: {
                title,
                imageURL,
                description,
                price
            }
        }
    )
};
