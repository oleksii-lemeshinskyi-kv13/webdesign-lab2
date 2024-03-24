export default class Item {
    constructor(key, url) {
        this.key = key;
        this.url = url;

        this.onChangeCallback = null;
    }
}