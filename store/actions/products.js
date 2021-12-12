export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';

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

export const addProduct = (title, imageURL, description, price) => {
    return (
        {
            type: ADD_PRODUCT,
            productData: {
                title,
                imageURL,
                description,
                price
            }
        }
    )
}

