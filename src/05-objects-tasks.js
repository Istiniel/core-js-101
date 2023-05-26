/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(/* proto, json */) {
  throw new Error('Not implemented');
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Element {
  constructor(tag, selector) {
    this.order = [
      'elem',
      'idfield',
      'classfield',
      'attrfield',
      'pseudoclassfield',
      'pseudoElem',
    ];
    this.currentSelectors = [];
    this.currentSelectors.push(selector);
    this[selector] = selector;
    this.css = tag;
  }

  element(value) {
    this.css += `${value}`;
    if (this.elem) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    this.element = value;
    this.currentSelectors.push('elem');
    this.checkOrder('elem');
    return this;
  }

  id(value) {
    this.css += `#${value}`;
    if (this.idfield) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    this.idfield = value;
    this.currentSelectors.push('idfield');
    this.checkOrder('idfield');
    return this;
  }

  class(value) {
    this.css += `.${value}`;
    this.currentSelectors.push('classfield');
    this.checkOrder('classfield');
    return this;
  }

  attr(value) {
    this.css += `[${value}]`;
    this.currentSelectors.push('attrfield');
    this.checkOrder('attrfield');
    return this;
  }

  pseudoClass(value) {
    this.css += `:${value}`;
    this.currentSelectors.push('pseudoclassfield');
    this.checkOrder('pseudoclassfield');
    return this;
  }

  pseudoElement(value) {
    this.css += `::${value}`;
    if (this.pseudoElem) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    this.pseudoElem = value;
    this.currentSelectors.push('pseudoElem');
    this.checkOrder('pseudoElem');
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.css = `${selector1} ${combinator} ${selector2}`;
    return this;
  }

  toString() {
    return this.css;
  }

  stringify() {
    return this.css;
  }

  checkOrder(selector) {
    const selectors = this.order.slice(this.order.indexOf(selector) + 1);
    selectors.forEach((elem) => {
      if (this.currentSelectors.includes(elem)) {
        throw new Error(
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
        );
      }
    });
  }
}

const cssSelectorBuilder = {
  css: '',

  element(value) {
    return new Element(value, 'elem');
  },

  id(value) {
    return new Element(`#${value}`, 'idfield');
  },

  class(value) {
    return new Element(`.${value}`, 'classfield');
  },

  attr(value) {
    return new Element(`[${value}]`, 'attrfield');
  },

  pseudoClass(value) {
    return new Element(`:${value}`, 'pseudoclassfield');
  },

  pseudoElement(value) {
    return new Element(`::${value}`, 'pseudoElem');
  },

  combine(selector1, combinator, selector2) {
    this.css = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  },

  stringify() {
    return this.css;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
