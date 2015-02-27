/**
 * An Invoice represents a sale to a customer.
 *
 * Some properties like the 'total' should never be modified directly
 * It gets changed as a result of some action (e.g. adding a product or applying a discount)
 */

/**   # 1
 * Define properties and methods in the constructor
 *
 * Pros: Allows us to keep variables like total private
 *
 * Cons: Constructor must be run for each new object created rather than referring to the prototype for the bulk
 * of methods/properties, etc - maybe be less efficient and more memory intensive
 */
(function () {
    //'use strict';

    function Invoice() {
        var total = 0;

        Object.defineProperty(this, 'total', {
            get: function () {
                return total / 100;
            }
        });

        this.recalculate = function () {
            // perform an operation that updates the total
            total = 1000; // some new value $10.00
        }
    }

    Invoice.prototype.addProduct = function (product) {
        // Add the product to the invoice .. then
        this.recalculate();
    };

    var testInvoice = new Invoice();
    console.log('Total for test invoice #1 is ...', testInvoice.total);
    testInvoice.total = 999999; // fails or errors if in strict mode
    console.log('Total for test invoice #1 is ...', testInvoice.total);
    testInvoice.addProduct({});
    console.log('Total for test invoice #1 is ...', testInvoice.total);


}());

/**  # 2
 * Define properties and methods on prototype
 *
 * Pros: Probably more efficient, methods and properties can be modified for all Invoice objects if need be easily
 *
 * Cons: We lose private variables - the invoice total should never be modifiable directly
 */
(function () {
    //'use strict';

    function Invoice() {
        this._total = 0;
    }

    Object.defineProperty(Invoice.prototype, 'total', {
        get: function () {
            //debugger;
            return this._total;
        }
    });

    Invoice.prototype.recalculate = function () {
        // perform an operation that updates the total
        this._total = 1000; // some new value
    };

    Invoice.prototype.addProduct = function (product) {
        // Add the product to the invoice .. then
        this.recalculate();
    };

    var testInvoice = new Invoice();
    console.log('Total for test invoice #2 is ...', testInvoice.total);
    testInvoice.total = 999999; // we can't change this...
    testInvoice._total = 99999; // but we can change this
    console.log('Total for test invoice #2 is ...', testInvoice.total);
    testInvoice.addProduct({});
    console.log('Total for test invoice #2 is ...', testInvoice.total);

}());

/**
 * Some kind of hybrid approach
 *
 * We could hide the inner variables and make modification go through ___ but seems half assed at best
 *
 * We could keep some variables private and use methods and properties in the constructor for those
 * but move whatever we feasibly can to the prototype
 */
(function () {

    function Invoice() {
        var total = 0;
        this.___ = this;
    }

    Invoice.prototype.recalculate = function () {
        // perform an operation that updates the total
        this.___.total = 100; // some new value
    };

    Invoice.prototype.addProduct = function (product) {
        // Add the product to the invoice ... then
        this.recalculate();
    };

}());
