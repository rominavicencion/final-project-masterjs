'use strict'

class Product {
    constructor(name, price, stock, img) {
        this._name = name;
        this._price = price;
        this._stock = stock;
        this._img = img;
    }
}

const product1 = new Product("Aceite Vegetal Botella 1L - Belmont", 1900, 5, "img/aceite.jpeg");
const product2 = new Product("Galleta Chips de Chocolate 150g - Marca Ecovida", 1230, 4, "img/galleta.jpeg");
const product3 = new Product("Proteína Vegetal de Soya Bolsa 300g - Marca Gourmet", 1550, 2, "img/carne-soya.jpeg");
const product4 = new Product("Té Verde con Menta 10 Bolsitas - Marca Twinings", 1700, 3, "img/te.jpeg");
const product6 = new Product("Helado Paleta Vainilla 260g - Marca NotIcecream", 3190, 4, "img/noticecream.jpeg");
const product5 = new Product("Nuggets Chicken Free 300g - Marca La Crianza", 2990, 2, "img/free-chicken.jpeg");

const products = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6
];

const listProducts = products => {
    
    products.forEach((product, index) => {
        const productElement = document.getElementById(`product${index}`);
        console.log(product._name);
        productElement.innerHTML = `
                <img src="${product._img}" />
                <p>${product._name}</p>
                <p>$${product._price}</p>
                <p><span>${product._stock} unidades disponibles</span></p>
                <button>Añadir a Compra</button>
                <p><span>Tienes 2 unidades en tu carro de compra</span></p>`;
    })
}

listProducts(products);
