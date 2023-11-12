import React from "react";
import { useProductContext } from "./ProductContext";

function ProductList() {
    const { products, selectProduct } = useProductContext();

    return (
        <div>
            <h2>Lista produktów:</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => selectProduct(product.id)}>
                            Wybierz
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
