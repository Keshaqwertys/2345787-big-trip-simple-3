import 'flatpickr/dist/flatpickr.min.css';

import KeyboardHandler from '../options/keyboard-handler.js';
import initCalendar from 'flatpickr';
import View, {html} from './view.js';

export default class DatePickerRange extends View {
  #startDateCalendar;
  #endDateCalendar;

  constructor() {
    super(...arguments);

    this.addEventListener('keydown', this.onKeydown.bind(this), true);

    /**
     * @type {Calendar}
     */
    this.#startDateCalendar = initCalendar(this.querySelector('[name="date_from"]'));

    /**
     * @type {Calendar}
     */
    this.#endDateCalendar = initCalendar(this.querySelector('[name="date_to"]'));

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  get isOpen() {
    return this.#startDateCalendar.isOpen || this.#endDateCalendar.isOpen;
  }

  get disallowedKeys() {
    return ['Backspace', 'Delete'];
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="date_from"
        required
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="date_to"
        required
      >
    `;
  }

  close() {
    this.#startDateCalendar.close();
    this.#endDateCalendar.close();
  }

  getDates() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }

  /**
   * @param {CalendarDate} startDate
   * @param {CalendarDate} endDate
   */
  setDates(startDate, endDate = startDate, notify = true) {
    this.#startDateCalendar.setDate(startDate, notify);
    this.#endDateCalendar.setDate(endDate, notify);
    return this;
  }

  /**
   * @param {CalendarOptions} startDateOptions
   * @param {CalendarOptions} endDateOptions
   */
  configure(startDateOptions, endDateOptions = startDateOptions) {
    this.#startDateCalendar.set(startDateOptions);
    this.#endDateCalendar.set(endDateOptions);
    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    if (this.disallowedKeys.includes(event.key)) {
      event.stopPropagation();
      return;
    }

    if (KeyboardHandler.EXIT.includes(event.key) && this.isOpen) {
      event.stopPropagation();
      this.close();
    }
  }

  /**
   * @param {CalendarOptions} options
   */
  static configure(options) {
    initCalendar.setDefaults(options);
  }
}

customElements.define(String(DatePickerRange), DatePickerRange);
