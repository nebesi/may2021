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

const showPrice = (list = []) => {
    price = list.reduce((total, cur) => total += cur.price, 0);
    console.log(price)
}

renderProducts(products);

showPrice(products) */





class PrList {
    #serverResponseList;
    #goods;
    constructor(containerField = '.products', allPriceField = '.all-price') {
        this.#serverResponseList = [],
            this.container = containerField,
            this.#goods = [],
            this.allPrice = allPriceField

        this.fetch(),
            this.render(),
            this.showPrice(),
            this.addListener()

    }

    fetch() {
        this.#serverResponseList = [
            { id: 1, title: 'Notebook', price: 1000 },
            { id: 2, title: 'Mouse', price: 100 },
            { id: 3, title: 'Keyboard', price: 250 },
            { id: 4, title: 'Gamepad', price: 150 },
        ];
    }

    showPrice() {
        const field = document.querySelector(`${this.allPrice}`);
        const price = (this.#serverResponseList.reduce((total, cur) => total += cur.price, 0));

        field.textContent = price + ' - общая цена каталога';
    }

    render() {
        const field = document.querySelector(`${this.container}`);


        for (let i = 0; i < this.#serverResponseList.length; i++) {
            let cart = new Item(this.#serverResponseList[i]);
            this.#goods.push(cart);
            field.insertAdjacentHTML('beforeend', cart.renderCart());
        }
    }

    addListener() {
        const products = document.querySelectorAll('.by-btn');

        products.forEach(e => e.addEventListener('click', ev => {
            if (!ev.target.dataset.id) return

            else {
                let addedProd = this.#serverResponseList.find(element => element.id == +ev.target.dataset.id);
                basket.addProd(addedProd)
            }
        }))
    }
}





class Item {
    #item;
    constructor(item) {
        this.#item = item,
            this.price = item.price,
            this.title = item.title,
            this.id = item.id
    }

    renderCart() {
        return `<div class="product-item">
                <h3>${this.title} - название</h3>
                <p>${this.price} - цена</p>
                <button class="by-btn" data-id="${this.id}">Добавить</button>
              </div>`;
    }
}




class AddedItem {
    #item;
    constructor(item) {
        this.#item = item,
            this.price = item.price,
            this.title = item.title,
            this.id = item.id,
            this.quantity = item.quantity

    }

    renderCart() {
        return `<div class="product-item">
                <h3>${this.title} - название</h3>
                <p>${this.price} - цена</p>
                <p>${this.quantity} - количество</p>
                <button class="by-btn del" data-id="${this.id}">Добавить</button>
                <button class="by-btn add" data-id="${this.id}">Удалить</button>
              </div>`;
    }
}

class Basket {
    #classItem; //лежат функциональные экземпляры добавленного объекта
    #added; //здесь лежат просто добавленные объекты
    #clearBtn;
    constructor(container = '.header', clearBtn = '.hide') {
        this.#added = [],
            this.container = container,
            this.#clearBtn = clearBtn
        this.#classItem = [],


            this.clearBasket()

    }

    addProd(product) {

        this.#classItem = []

        const test = this.#added.find(element => element.id == product.id)
        if (test) {
            test.quantity += 1;
        } else {
            product.quantity = 1;
            this.#added.push(product);
        }

        for (let i = 0; i < this.#added.length; i++) {
            const classItem = new AddedItem(this.#added[i]);
            this.#classItem.push(classItem);
        }
        console.log(this.#classItem)

        this.render()
    }

    render() {


        const basketField = document.querySelector(`${this.container}`);
        basketField.innerHTML = '';


        if (!this.#classItem) return console.log('пусто')


        this.#classItem.forEach(element => basketField.insertAdjacentHTML('beforeend', element.renderCart()))

    }

    clearBasket() {
        const btn = document.querySelector(`${this.#clearBtn}`);

        btn.addEventListener('click', this.clear);
    }

    clear() {
        this.#added = [];
        this.#classItem = [];

        this.render()
    }

}

const catalog = new PrList();

const basket = new Basket();