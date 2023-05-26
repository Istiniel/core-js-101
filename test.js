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

const builder = cssSelectorBuilder;

const test = builder.pseudoClass('hover').attr('title');
console.log(test);

// const test1 = builder
//   .combine(
//     builder.element('div').id('main').class('container').class('draggable'),
//     '+',
//     builder.combine(
//       builder.element('table').id('data'),
//       '~',
//       builder.combine(
//         builder.element('tr').pseudoClass('nth-of-type(even)'),
//         ' ',
//         builder.element('td').pseudoClass('nth-of-type(even)'),
//       ),
//     ),
//   )
//   .stringify();
// console.log(test1);
