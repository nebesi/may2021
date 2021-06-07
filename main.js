/* const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
}

const field = () => document.querySelector('.products');

const renderProducts = (list = []) => {
    const container = field();
    list.forEach(element => {
        const { title, price } = element;
        container.insertAdjacentHTML('afterbegin', renderProduct(title, price))
    })
}

renderProducts(products); */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Catalog {
    constructor(container) {
        this.container = container;

        this.goods = [];

        this.allProducts = [];

        this.getRequest(`${API}/catalogData.json`)
            .then(data => {
                this.allProducts = JSON.parse(data);
                this.renderCatalog()
            })
    }


    getRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject(xhr.response);
                    } else {
                        resolve(xhr.response)
                    }
                }
            }
            xhr.send()


        })
    }

    renderCatalog() {
        const containerField = document.querySelector(`${this.container}`);

        this.allProducts.forEach(element => containerField.insertAdjacentHTML('beforeend', new Item(element).render()))
    }

};

class Item {
    constructor(element) {
        this.element = element;

        this.render()
    }

    render() {
        return `<div class="product-item">
                <h3>${this.element.id_product}</h3>
                <p>${this.element.price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
    }
}

let catalog = new Catalog('.products')

