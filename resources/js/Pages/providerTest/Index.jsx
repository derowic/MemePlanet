import React from "react";
import { ProductProvider } from "./ProductContext";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

function Index() {
    return (
        <ProductProvider>
            <div>
                <ProductList />
                <ProductDetail />
            </div>
        </ProductProvider>
    );
}

export default Index;
