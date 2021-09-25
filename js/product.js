'use strict'

class Product {
    #products_lib = {};
    #products_arr = {};
    constructor() {
        document.addEventListener("DOMContentLoaded", () => getApiProducts());
    }

    get products_lib() {
        return this.#products_lib;
    }

    set products_lib(products) {
        this.#products_lib = products;
    }

    get products_arr() {
        return this.#products_arr;
    }

    set products_arr(products) {
        this.#products_arr = products;
    }

    listProducts = (products, cartProducts) => {
        const divProductList = document.getElementById("product-list");
        divProductList.innerHTML = '';

        products.forEach((product, index) => {
            const divProduct = document.createElement("div");

            divProduct.setAttribute('id', 'div-product');
            divProduct.classList.add('product');
            divProduct.innerHTML = `
                <img src="${product.img}" />
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <p><span id="stock">${product.stock} unidades disponibles</span></p>
                <button class="cartButton" product-id="${product.id}" id="btn-add-to-cart">Añadir a Compra</button>
                <p><span id="cant-product-cart${index}"></span></p>`;
                divProductList.appendChild(divProduct);

            if (cartProducts) {      
                Object.values(cartProducts).forEach((productCart) => {
                    if (parseInt(productCart.id) === product.id) {
                        document.getElementById(`cant-product-cart${index}`).textContent = `Tienes ${productCart.cant} unidades en tu carro de compra`;
                    }
                });
            }

        });
        
    }

    stockDiscount = (cartProducts) => {
        Object.values(this.#products_arr).forEach((product) => {
            Object.values(cartProducts).forEach((cartProduct) => {
                if ((parseInt(cartProduct.id) === product.id) && (product.stock > 0)) {
                    product.stock -= cartProduct.cant;
                }
            });
        });
        this.listProducts(this.#products_arr);
    }

    resetProducts = () => {
        localStorage.removeItem('products');
        this.#products_arr = JSON.parse(JSON.stringify(this.#products_lib));
        product.listProducts(this.#products_lib);
    }
}

const product = new Product();

const getApiProducts = async () => {
    try {
        const res = await fetch('../lib/products.json');
        product.products_lib = await res.json();
        if (localStorage.getItem('products')) {
            product.products_arr = JSON.parse(localStorage.getItem('products'));
            product.listProducts(product.products_arr, cart.cart);
        } else {
            product.products_arr = JSON.parse(JSON.stringify(product.products_lib));
            product.listProducts(product.products_lib, cart.cart);
        }
    } catch (error) {
        console.log(error);
    }
}