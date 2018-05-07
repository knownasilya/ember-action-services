import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.setState(this.initState() || {});
  },
  
  initState() {
    return {};
  },
  
  setState(newState) {
    this.set('state', deepFreeze({ ...this.state, ...newState }));
  },
  
  pluckState(...keys) {
    let openState = Object.assign({}, this.state);
    let newState = keys.reduce((obj, key) => {
      obj[key] = openState[key];
      
      return obj;
    }, {});
    
    return newState;
  }
});

// copied from https://github.com/jsdf/deep-freeze
function deepFreeze (o) {
  Object.freeze(o);

  let oIsFunction = typeof o === 'function';
  let hasOwnProp = Object.prototype.hasOwnProperty;

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (hasOwnProp.call(o, prop)
    && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
    && o[prop] !== null
    && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
}