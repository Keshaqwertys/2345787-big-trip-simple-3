import Mode from '../options/mode.js';
import PointType from '../options/point-type.js';
import Model from './model.js';

export default class AppModel extends Model {
  #mode = Mode.VIEW;

  /**
   * @param {DataTableModel<Point,PointAdapter>} pointsModel
   * @param {DataManagerModel<Destination,DestinationAdapter>} destinationsModel
   * @param {DataManagerModel<OfferGroup,OfferGroupAdapter>} offerGroupsModel
   */
  constructor(pointsModel, destinationsModel, offerGroupsModel) {
    super();
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offerGroupsModel = offerGroupsModel;
    this.activePoint = null;
  }

  get defaultPoint() {
    const point = this.pointsModel.blank;
    point.type = PointType.TAXI;
    point.destinationId = this.destinationsModel.item(0).id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = 0;
    point.offerIds = [];
    point.isFavorite = false;
    return point;
  }

  /**
   * @override
   */
  async ready() {
    await Promise.all([
      this.pointsModel.ready(),
      this.destinationsModel.ready(),
      this.offerGroupsModel.ready()
    ]);
  }

  getMode() {
    return this.#mode;
  }

  /**
   * @param {number} mode
   * @param {string} activePointId
   */
  setMode(mode, activePointId = null) {
    switch (mode) {
      case Mode.VIEW:
        this.activePoint = null;
        break;
      case Mode.EDIT:
        this.activePoint = this.pointsModel.findById(activePointId);
        break;
      case Mode.CREATE:
        this.activePoint = this.defaultPoint;
        break;
      default:
        throw new Error('Invalid mode');
    }
    this.#mode = mode;
    this.dispatchEvent(new CustomEvent('mode'));
  }
}
