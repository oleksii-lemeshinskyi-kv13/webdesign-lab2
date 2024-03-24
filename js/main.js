import ItemMapModel from './model/ItemMapModel.js';
import ItemListView from './view/ItemListView.js';
import Controller from './controller/Controller.js';

let itemMapModel = new ItemMapModel();
let itemListView = new ItemListView(itemMapModel);

let controller = new Controller(itemMapModel, itemListView);