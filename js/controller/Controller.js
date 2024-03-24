import Item from "../model/Item.js";

export default class Controller {
    constructor(itemMapModel, itemListView) {
        this.itemMapModel = itemMapModel;
        this.itemListView = itemListView;

        this.itemMapModel.setOnChangeCallback((e) => this.onChangeCallback(e));

        // Bind addItem and delItem to ensure 'this' refers to the Controller instance
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);

        this.itemListView.setControllerOnAddItem(this.addItem);
        this.itemListView.setControllerOnDelItem(this.delItem);

        document.getElementById('urlShortenForm').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting traditionally
            return itemListView.onAddItem(e);
        });

        this.redirectFromKey();

        // update list to display urls loaded from local storage
        this.updateList();
    }

    onChangeCallback() {
        document.querySelector('#urlList').innerHTML = this.itemListView.toHtml();
    }

    addItem(url) {
        const item = new Item(this.generateShortHash(url), url);
        this.itemMapModel.add(item);
        this.updateList();
    }

    delItem(key) {
        this.itemMapModel.delete(key);
        this.updateList();
    }

    updateList() {
        document.querySelector('#urlList').innerHTML = this.itemListView.toHtml();
    }

    generateShortHash(url) {
        let hash = 0;
        for (let i = 0; i < url.length; i++) {
            const char = url.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        // Convert the result to a string with a base of your choice (here, base 36 is used)
        return Math.abs(hash).toString(36);
    }

    redirectFromKey() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const keyValue = urlParams.get('key');

        if (keyValue != null) {
            const item = this.itemMapModel.get(keyValue);
            if (item != null) {
                window.open(item.url, '_self');
            }
        }
    }
}