
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

