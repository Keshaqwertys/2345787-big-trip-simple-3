import DeleteButtonLabel from '../options/delete-button-label.js';
import SaveButtonLabel from '../options/save-button-label.js';

import {html} from './view.js';
import PointCreator from './point-creator.js';

export default class PointEditor extends PointCreator {
  constructor() {
    super();
    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteButtonLabel.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;
    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);
    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');
    buttonView.textContent = flag ? DeleteButtonLabel.PRESSED : DeleteButtonLabel.DEFAULT;
    this.setLoading(flag);
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(PointEditor), PointEditor);
