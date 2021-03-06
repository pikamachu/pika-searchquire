'use strict';

var Logger = require('dw/system/Logger').getLogger('Orders');
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');

var CustomerHelpers = require('*/cartridge/scripts/customer/customerHelpers');
var OrderModel = require('*/cartridge/models/order');

/**
 * Returns a list of orders for the current customer.
 *
 * @param {Object} currentCustomer - object with customer properties
 * @returns {Object} - orderModel of the current dw order object
 */
function getOrders(currentCustomer) {
    var customerNo = CustomerHelpers.getCustomerNo(currentCustomer);
    var customerOrders = OrderMgr.searchOrders(
        'customerNo={0} AND status!={1}',
        'creationDate desc',
        customerNo,
        Order.ORDER_STATUS_REPLACED
    );

    var orders = [];
    while (customerOrders.hasNext()) {
        var customerOrder = customerOrders.next();
        try {
          var orderModel = new OrderModel(
              customerOrder
          );
          orders.push(orderModel);
        } catch (e) {
          Logger.debug('Error processing order {0}', customerOrder.orderNo);
        }
    }

    return {
        orders: orders
    };
}

module.exports = {
    getOrders: getOrders
};
