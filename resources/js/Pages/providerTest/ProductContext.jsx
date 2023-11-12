import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([
        { id: 1, name: "Produkt 1" },
        { id: 2, name: "Produkt 2" },
        { id: 3, name: "Produkt 3" },
    ]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <ProductContext.Provider
            value={{
                products,
                selectedProduct,
                selectProduct: (productId) => {
                    const product = products.find((p) => p.id === productId);
                    setSelectedProduct(product);
                },
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    return useContext(ProductContext);
}
