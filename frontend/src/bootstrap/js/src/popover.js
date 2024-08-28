/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Tooltip from './tooltip.js'
import { defineJQueryPlugin } from './util/index.js'

/**
 * Constants
 */

const NAME = 'popover'

const SELECTOR_TITLE = '.popover-header'
const SELECTOR_CONTENT = '.popover-body'

const Default = {
  ...Tooltip.Default,
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div className="popover" role="tooltip">' +
    '<div className="popover-arrow"></div>' +
    '<h3 className="popover-header"></h3>' +
    '<div className="popover-body"></div>' +
    '</div>',
  trigger: 'click'
}

const DefaultType = {
  ...Tooltip.DefaultType,
  content: '(null|string|element|function)'
}

/**
 * className definition
 */

className Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent()
  }

  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    }
  }

  _getContent() {
    return this._resolvePossibleFunction(this._config.content)
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Popover.getOrCreateInstance(this, config)

      if (typeof config !== 'string') {
        return
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config]()
    })
  }
}

/**
 * jQuery
 */

defineJQueryPlugin(Popover)

export default Popover
