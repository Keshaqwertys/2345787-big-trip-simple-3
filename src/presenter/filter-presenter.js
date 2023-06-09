import Mode from '../options/mode.js';
import EventFilterType from '../options/event-filter-type.js';
import EventLabel from '../options/event-label.js';
import EventFilterPredicate from '../options/event-filter-predicate.js';
import Mode from '../options/mode.js';
import EventFilterType from '../options/event-filter-type.js';
import EventLabel from '../options/event-label.js';
import EventFilterPredicate from '../options/event-filter-predicate.js';
import Presenter from './presenter.js';

/**
 * @template {AppModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 * @template {AppModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));
    this.model.addEventListener('mode', this.onModelModeChange.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update'],
      this.onPointsModelChange.bind(this)
    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update'],
      this.onPointsModelChange.bind(this)
    );
  }
  }

  buildView() {
    /** @type {FilterOptionState[]} */
    const options = Object.keys(EventFilterType).map(
      (key) => [EventLabel[key], EventFilterType[key]]
  buildView() {
    /** @type {FilterOptionState[]} */
    const options = Object.keys(EventFilterType).map(
      (key) => [EventLabel[key], EventFilterType[key]]
    );

    this.view.setOptions(options);
    this.updateViewOptionsDisabled();
    this.updateViewValue();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = EventFilterType[EventFilterPredicate.findKey(predicate)];

    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(EventFilterPredicate);
    const states = predicates.map((predicate) =>
      !this.model.pointsModel.list(predicate).length);
    this.view.setOptions(options);
    this.updateViewOptionsDisabled();
    this.updateViewValue();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = EventFilterType[EventFilterPredicate.findKey(predicate)];

    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(EventFilterPredicate);
    const states = predicates.map((predicate) =>
      !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(states);
    this.view.setOptionsDisabled(states);
  }

  onViewChange() {
  onViewChange() {
    const value = this.view.getValue();
    const predicate = EventFilterPredicate[EventFilterType.findKey(value)];
    const predicate = EventFilterPredicate[EventFilterType.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setFilter(predicate);
  }

  onPointsModelChange() {
    this.updateViewOptionsDisabled();
  }

  onModelModeChange() {
    if (this.model.getMode() === Mode.CREATE) {
      this.model.pointsModel.setFilter(EventFilterPredicate.EVERYTHING);
      this.updateViewValue();
    }
  }
}
