import View, {html} from './view.js';

export default class LocationDetails extends View {
  constructor() {
    super(...arguments);
    this.classList.add('event__section', 'event__section--destination');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description"></p>

      <div class="event__photos-container">
        <div class="event__photos-tape"></div>
      </div>
    `;
  }

  /**
   * @param {DestinationPictureState} state
   */
  createPictureTemplate(state) {
    const [src, alt] = state;
    return html`
      <img class="event__photo" src="${src}" alt="${alt}">
    `;
  }

  /**
   * @param {string} description
   */
  setDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;
    return this;
  }

  /**
   * @param {DestinationPictureState[]} states
   */
  setPictures(states) {
    const templates = states.map(this.createPictureTemplate);
    this.querySelector('.event__photos-tape').innerHTML = templates.join('');
    return this;
  }
}

customElements.define(String(LocationDetails), LocationDetails);
