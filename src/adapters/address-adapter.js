"use strict";

/**
 * @typedef {import('../models/order').Order} Order
 * @typedef {string} address
 * @typedef {{
 * validateAddress:function(address):Promise<address>
 * }} service - verifies/corrects address
 * @callback adapterFactory
 * @param {service} service
 * @returns {function({model:Order})} - verified/corrected address
 */

/**
 *
 * @type {adapterFactory}
 */
export function validateAddress(service) {
  return async function (options) {
    return new Promise(async function (resolve, reject) {
      const {
        model: order,
        args: [callback],
      } = options;
      const shippingAddress = await service.validateAddress(
        order.decrypt().shippingAddress
      );
      try {
        const update = await callback(options, shippingAddress);
        resolve(update);
      } catch(error) {
        reject(error);
      }
    });
  }
}
