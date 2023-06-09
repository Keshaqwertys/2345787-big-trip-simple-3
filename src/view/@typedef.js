/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('./point-view').default} PointView */
/** @typedef {import('./editor-view').default} EditorView */
/** @typedef {import('./creator-view').default} CreatorView */
/** @typedef {import('./list-view').default} ListView */

/**
 * @typedef PointState
 * @prop {string} id
 * @prop {number | null} index
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} type
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */

/**
 * @typedef {[string, string]} FilterOptionState
 * @typedef {[string, string]} SortOptionState
 * @typedef {[label: string, value: string]} PointTypeOptionState
 * @typedef {[title: string, price: number]} OfferState
 * @typedef {[string, string]} DestinationOptionState
 * @typedef {[string, string, string, boolean]} OfferOptionState
 * @typedef {[string, string]} DestinationPictureState
 */
