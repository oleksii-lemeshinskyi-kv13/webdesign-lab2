import Item from "./Item.js";

export default class ItemMapModel {
    constructor() {
        this.urls = new Map();
        this.onChangeCallback = null;

        this.getUrlsFromLocalStorage();
    }

    add(item) {
        item.onChangeCallback = this.onChangeCallback;
        this.urls.set(item.key, item);
        this.saveUrlsInLocalStorage();
    }

    delete(key) {
        this.urls.delete(key);
        this.saveUrlsInLocalStorage();
    }

    get(key) {
        return this.urls.get(key);
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }

    setUrls(urls) {
        this.urls = urls;
    }

    saveUrlsInLocalStorage() {
        let temp = new Map();
        for (const item of this.urls.values()) {
            temp.set(item.key, item.url);
        }
        localStorage.setItem('urlsMap', JSON.stringify(Array.from(temp)));
    }

    getUrlsFromLocalStorage() {
        const parsedArray = JSON.parse(localStorage.getItem('urlsMap'));
        if (parsedArray != null) {
            for (const item of parsedArray) {
                this.add(new Item(item[0], item[1]));
            }
        }
    }
}