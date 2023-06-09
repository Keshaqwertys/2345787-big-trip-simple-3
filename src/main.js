import EventFilterPredicate from './options/event-filter-predicate.js';
import EventSortComparator from './options/event-sort-comparator.js';
import Service from './service/service.js';
import DataManagerModel from './model/data-manager.js';
import DataTableModel from './model/data-table.js';
import AppModel from './model/app-model.js';
import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListView from './view/list-view.js';
import CreatorView from './view/creator-view.js';
import EditorView from './view/editor-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointEditorPresenter from './presenter/point-editor-presenter.js';
import PlaceholderPresenter from './presenter/placeholder-presenter.js';
import CreateButtonPresenter from './presenter/create-button-presenter.js';
import FormHandlerPresenter from './presenter/form-handler-presenter.js';

const SERVER_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${SERVER_URL}/points`;
const DESTINATIONS_URL = `${SERVER_URL}/destinations`;
const OFFERS_URL = `${SERVER_URL}/offers`;
const AUTHORIZATION_CODE = 'Basic er883jdzbdw';

/** @type {Service<Point>} */
const pointsStore = new Service(POINTS_URL, AUTHORIZATION_CODE);

/** @type {Service<Destination>} */
const destinationsStore = new Service(DESTINATIONS_URL, AUTHORIZATION_CODE);

/** @type {Service<OfferGroup>} */
const offerGroupsStore = new Service(OFFERS_URL, AUTHORIZATION_CODE);
const pointsModel = new DataTableModel(pointsStore, (item) => new PointAdapter(item))
  .setFilter(EventFilterPredicate.EVERYTHING)
  .setSort(EventSortComparator.DAY);
const destinationsModel = new DataManagerModel(destinationsStore, (item) => new DestinationAdapter(item));
const offerGroupsModel = new DataManagerModel(offerGroupsStore, (item) => new OfferGroupAdapter(item));
const applicationModel = new AppModel(pointsModel, destinationsModel, offerGroupsModel);

/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {ListView} */
const listView = document.querySelector(String(ListView));


/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));

applicationModel.ready().then(() => {
  new FilterPresenter(applicationModel, filterView);
  new SortPresenter(applicationModel, sortView);
  new PointListPresenter(applicationModel, listView);
  new PointEditorPresenter(applicationModel, new EditorView());
  new FormHandlerPresenter(applicationModel, new CreatorView().target(listView));
  new PlaceholderPresenter(applicationModel, placeholderView);
  new CreateButtonPresenter(applicationModel, createButtonView);

}).catch((exception) => {
  placeholderView.textContent = exception;
});
