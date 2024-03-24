export default class ItemView {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }

    toHtml(index) {
        return `
        <tr>
        <td>${index}</td>
        <td>${this.itemModel.url}</td>
        <td><a href="./index.html?key=${this.itemModel.key}" target="_blank">${this.itemModel.key}</a>
        </td>
        <td>
        <button data-id="${this.itemModel.key}" class="btn btn-sm btn-danger" id="del-button">Delete</button>
        </td>
        </tr>`;
    }
}