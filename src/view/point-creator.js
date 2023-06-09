import SaveButtonLabel from '../options/save-button-label.js';
import View, {html} from './view.js';
import PointTypeSelect from './point-type-select.js';
import DestinationSelect from './destination-select.js';
import DatePickerRange from './date-picker-range.js';
import PriceInputView from './price-input-view.js';
import OfferSelect from './offer-select.js';
import LocationDetails from './location-details.js';
import LoaderView from './loader-view.js';
import KeyboardHandler from '../options/keyboard-handler.js';

/**
 * @implements {EventListenerObject}
 */
export default class PointCreator extends View {
  constructor() {
    super();

    /** @type {PointTypeSelect} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelect));

    /** @type {DestinationSelect} */
    this.destinationSelectView = this.querySelector(String(DestinationSelect));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {DatePickerRange} */
    this.datePickerView = this.querySelector(String(DatePickerRange));

    /** @type {OfferSelect} */
    this.offerSelectView = this.querySelector(String(OfferSelect));

    /** @type {LocationDetails} */
    this.destinationView = this.querySelector(String(LocationDetails));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {Element} */
    this.targetView = null;
    this.loaderView = new LoaderView();
    this.formView = this.querySelector('form');
    this.classList.add('trip-events__item', 'trip-events__item--reveal-alternate');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.targetView.prepend(this);
    } else {
      this.remove();
    }
    return this;
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelect}
          ${DestinationSelect}
          ${DatePickerRange}
          ${PriceInputView}
          ${this.createButtonsTemplate()}
        </header>
        <section class="event__details">
          ${OfferSelect}
          ${LocationDetails}
        </section>
      </form>
    `;
  }

  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  setLoading(flag) {
    this.loaderView.display(flag);

    [...this.formView].forEach((/** @type {HTMLInputElement} */ inputView) => {
      inputView.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSaving(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__save-btn');
    buttonView.textContent = flag ? SaveButtonLabel.PRESSED : SaveButtonLabel.DEFAULT;
    this.setLoading(flag);
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;
    return this;
  }

  open() {
    this.display(true);
    document.addEventListener('keydown', this);
    return this;
  }

  close(notify = true) {
    this.datePickerView.close();
    this.display(false);
    document.removeEventListener('keydown', this);
    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }
    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (KeyboardHandler.EXIT.includes(event.key)) {
      this.close();
    }
  }
}

customElements.define(String(PointCreator), PointCreator);
