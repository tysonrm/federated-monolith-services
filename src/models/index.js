import GlobalMixins from './mixins';
import { uuid } from './utils';

import User from './user';
import Order from './order';

/**
 * @typedef {Object} Model
 * @property {Symbol} id
 * @property {Symbol} modelName
 * @property {Symbol} createTime
 * @property {Symbol} onUpdate
 */

/**
 * @callback onUpdate
 * @param {Model} model
 * @param {Object} changes
 * @returns {Model}
 */

/**
 * @callback onDelete
 * @param {Model} model
 * @returns {Model}
 */

/**
 * @typedef {Object} ModelConfig
 * @property {string} modelName
 * @property {function(...args): any} factory
 * @property {Array<import("./mixins").mixinFunction>} [mixins]
 * @property {onUpdate} [onUpdate]
 * @property {onDelete} [onDelete]
 * property {Schema} [schema]
 * property {Relation} [relations]
 * property {UseCase} [useCases]
 * property {Controller} [controllers]
 */

/**
 * @param {ModelConfig} module 
 * @param {*} dependencies 
 */
function make(module, dependencies) {
  module.factory = module.factory(dependencies);
  module.mixins = module.mixins.concat(GlobalMixins);
}

make(User, { uuid });
make(Order, {});

export {
  User,
  Order
}




