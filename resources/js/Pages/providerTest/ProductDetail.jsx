import React from "react";
import { useProductContext } from "./ProductContext";

function ProductDetail() {
    const { selectedProduct } = useProductContext();

    if (!selectedProduct) {
        return <div>Wybierz produkt</div>;
    }

    return (
        <div>
            <h2>Wybrany produkt: {selectedProduct.name}</h2>
        </div>
    );
}

export default ProductDetail;
