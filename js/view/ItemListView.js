import ItemView from './ItemView.js';

export default class ItemListView {
    constructor(itemMapModel) {
        this.itemMapModel = itemMapModel;
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;
        document.querySelector('#urlList').addEventListener('click', (e) => this.onClick(e));
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    setControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }

    onClick(e) {
        if (e.target.id === 'del-button') {
            this.controllerOnDelItem(e.target.dataset.id);
            return;
        }
    }

    onAddItem(e) {
        const originalUrl = document.getElementById('originalUrl').value;
        this.controllerOnAddItem(originalUrl);
    }

    toHtml() {
        let itemsHtml = [];

        let index = 1;
        for (const item of this.itemMapModel.urls.values()) {
            const itemView = new ItemView(item);
            itemsHtml.push(itemView.toHtml(index))
            index++;
        }

        return itemsHtml.join("");
    }
}