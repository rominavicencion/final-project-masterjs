'use strict'

class Cart {
    static #instance;
    #cart_products = {};
    #total_products = 0;
    #final_total = 0;
    #shipping = 1500;
    #unit_price = 350;
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            if (localStorage.getItem('cart')) {
                this.#cart_products = JSON.parse(localStorage.getItem('cart'));
                this.listCart();
            }
        });
    }
    
    static createInstance() {
        if (!this.#instance) {
            this.#instance = new Cart();
        }
        return this.#instance;
    }

    get cart() {
        return this.#cart_products;
    }

    set cart(val) {
        this.#cart_products = val;
    }

    listCart = () => {
        const cartListElement = document.getElementById("cart-list");
        const pMessageEmptyCart = document.getElementById('message-empty-cart');

        cartListElement.innerHTML = '';

        if (this.#cart_products) {
            pMessageEmptyCart.textContent = '';
            Object.values(this.#cart_products).forEach((product) => {
                const divProductCart = document.createElement("div");
                const brProductCart = document.createElement("br");
        
                let subtotal = product.cant * product.price;
        
                divProductCart.classList.add('product-details');
                divProductCart.innerHTML = `
                    <div class="container-img">
                        <img class="cart-img" src="${product.img}" />
                    </div>
        
                    <div class="product-info">
                        <p>${product.name}</p>
                        <p style="padding-top: 8px;">$${product.price} c/u</p>
                        <p>${product.cant} unidades</p>
                        <p>Subtotal $${subtotal}</p>
                    </div>`;
                cartListElement.appendChild(divProductCart);
                cartListElement.appendChild(brProductCart);
    
            })
    
            this.#showTotals();
            localStorage.setItem('cart', JSON.stringify(this.#cart_products));
        } else {
            this.hideTotals();
            document.getElementById('pay-button');
        }
    }

    #showTotals = () => {
        const pTotal = document.getElementById('total-products');
        const pShipping = document.getElementById('shipping');
        const pFinalTotal = document.getElementById('final-total');

        this.#total_products = Object.values(this.#cart_products).reduce((acc, { cant, price, unit_price }) => acc + (cant * price) + (cant * unit_price), 0);
        this.#final_total = this.#total_products + this.#shipping;
        
        pTotal.textContent = `Total productos + prec. unit: $${this.#total_products}`;
        pShipping.textContent = `Envío $${this.#shipping}`;
        pFinalTotal.textContent = `Total a pagar $${this.#final_total}`;
        
    }

    hideTotals = () => {
        const pMessageEmptyCart = document.getElementById('message-empty-cart');
        const pTotal = document.getElementById('total-products');
        const pShipping = document.getElementById('shipping');
        const pFinalTotal = document.getElementById('final-total');
        
        pMessageEmptyCart.display = "block";
        pTotal.textContent = "";
        pShipping.textContent = "";
        pFinalTotal.textContent = "";
    }
    
    addProductToCart = (e, products) => {
        if (e.target.classList.contains('cartButton')) {
            this.#createCart(e.target.parentElement, products);
        }
    
        e.stopPropagation(); // para evitar errores de herencias
    }

    #createCart = (item, products) => {

        const product_id = item.querySelector('.cartButton').getAttribute('product-id');

        products.forEach((product, index) => {
            if (product.id === parseInt(product_id)) {
                const productSet = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    cant: 1,
                    unit_price: this.#unit_price
                }
                
                if ((this.#cart_products.hasOwnProperty(productSet.id))) {
                    productSet.cant = this.#cart_products[productSet.id].cant + 1;
                }

                if (product.stock < productSet.cant) {
                    return;
                } else {
                    this.#cart_products[productSet.id] = { ...productSet };
                    this.listCart();
                }
            
            }
        });
        
    }

    waitPayment = () => {
        const pMessagePayment = document.getElementById('message-payment');
        if (Object.values(this.#cart_products).length) {
            const payButton = document.getElementById('pay-button');
    
            const btnCartButton = document.getElementById('btn-add-to-cart');
            const btnCartButtons = document.getElementsByClassName('cartButton');
    
            [...btnCartButtons].forEach((btn) => {
                btn.disabled = true;
            });
    
            payButton.disabled = true; 
            btnCartButton.disabled = true;
            pMessagePayment.textContent = 'La compra está siendo realizada...';
            return new Promise((resolve) => setTimeout( () => {
                payButton.disabled = false; 
                btnCartButton.disabled = false;
                pMessagePayment.textContent = "Compra Exitosa.";
                [...btnCartButtons].forEach((btn) => {
                    btn.disabled = false;
                });
                resolve();
            }, 3000));
        } else {
            pMessagePayment.textContent = 'Para comprar primero agrega los productos al carrito.';
            return null;
        }
    }

    emptyCart = () => {
        cart.cart = {};
        cart.listCart();
        cart.hideTotals();
        localStorage.removeItem('cart');
    }
}

const cart = Cart.createInstance();

const productList = document.getElementById('product-list');
productList.addEventListener('click', e => {
    document.getElementById('message-payment').textContent = "";
    cart.addProductToCart(e, product.products_arr);
    product.listProducts(product.products_arr, cart.cart);
});

const payBtn = document.getElementById('pay-button');
payBtn.addEventListener('click', async () => {

    await cart.waitPayment();

    product.stockDiscount(cart.cart);
    cart.emptyCart();
    localStorage.setItem('products', JSON.stringify(product.products_arr));

});

// resetCartAndProducts
const btnReset = document.getElementById('btn-reset');
btnReset.addEventListener('click', () => {
    cart.emptyCart();
    // reset products
    product.resetProducts();
});