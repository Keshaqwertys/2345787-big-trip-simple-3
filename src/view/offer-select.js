import './css/offer-select-view.css';
import View, {html} from './view.js';

export default class OfferSelect extends View {
  constructor() {
    super(...arguments);
    this.classList.add('event__section', 'event__section--offers');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers"></div>
  `;
  }

  /**
   * @param {OfferOptionState} state
   */
  createOptionTemplate(state) {
    const [id, title, price, isChecked] = state;
    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer"
          value="${id}"
          ${isChecked ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }

  getSelectedValues() {
    /** @type {NodeListOf<HTMLInputElement>} */
    const selectedInputViews = this.querySelectorAll(':checked');
    return [...selectedInputViews].map((view) => view.value);
  }

  /**
   * @param {OfferOptionState[]} states
   */
  setOptions(states) {
    const templates = states.map(this.createOptionTemplate);
    this.querySelector('.event__available-offers').innerHTML = templates.join('');
    return this;
  }
}

customElements.define(String(OfferSelect), OfferSelect);
