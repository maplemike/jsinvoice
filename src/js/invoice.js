// invoice.js
'use strict';

/**
 * Represents an abstract person or business
 * @param id
 * @param name
 * @constructor
 */
function PersonEntity(id, name) {

    Object.defineProperties(this, {
        "id": {
            value: id,
            writable: false,
            enumerable: true
        },
        "name": {
            value: name,
            writable: false,
            enumerable: true
        }
    })
}

PersonEntity.prototype.toString = function () {
    return this.name;
};

function User(id, name) {
    PersonEntity.call(this, id, name);
}

User.prototype = Object.create(PersonEntity.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: User,
        writable: true
    }
});


function Customer(id, name) {
    PersonEntity.call(this, id, name);
}

Customer.prototype = Object.create(PersonEntity.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Customer,
        writable: true
    }
});

var default_user = new User(1, "Mike");
var default_customer = new Customer(1, "Walk-In Customer");



function Product() {

}



function Invoice(customer, user) {
    // the invoice total - generally we change it through adding products/line items to the invoice,
    // never directly
    var total = 0; // only accessible inside the constructor
    //vs
    //.total = 0;  // accessible outside constructor
    var date = new Date();
    var customer = customer;
    var user = user;
    this.___ = this;

    //Computed value, get only
    Object.defineProperty(this, "total", {
        get: function () {
            return total / 100;
        }
    });
}

Invoice.prototype.total = 0; // any invoice that doesn't have a set total is assumed to be 0?

Invoice.prototype.setCustomer = function (customer) {

};

// is defining this on the prototype more efficient since its not copied for each object?
// not possible with the encapsulated _total variable but still...
Object.defineProperty(Invoice.prototype, "total", {
    get: function () {
        return this.___.total / 100;
    },
    //value: 0,
    configurable: false,
    enumerable: true
});


(function () {
    'use strict';
    function Invoice(customer, user) {

        // Ideally total would not be modifiable by the outside (e.g. the total changes in response to events like
        // adding a product to the invoice or applying a discount, never direct manipulation)
        var total = 0;
        var date = new Date();
        var lineItems = [];
        this.customer = customer; // allow customer to be changed directly

        // so this works, define a getter but no setter so the value can't be changed
        Object.defineProperty(this, "total", {
            get: function () {
                return total / 100;
            }
        });

        Object.defineProperty(this, "lines", {
            get: function () {
                return lineItems;
            }
        });

        function calculateTotal() {
            // private function in constructor to calculate the total
            // do something here to produce a calculated total
            total = 10013; // let's pretend it's $100.13
        }

        this.addProduct = function (product) {
            lineItems.push(product);
            calculateTotal();
        }
    }

    // BUT! we've defined it on the object, wouldn't defining it on the prototype be more efficient?
    Object.defineProperty(Invoice.prototype, "total", {
        get: function () {
            return "we can't access total here from the constructor"; // but we could if we used this.total
            // return this.total / 100;
        }
    });

    // Which pattern is superior?
    // Expose the total using this.total and define methods/properties on the prototype for efficiency
    // OR define them on the object and waste potential memory and time having to construct for each new object?

}());



function LineItem() {

}

var InvoiceManager = (function () {

    var invoices = [];
    var currentInvoiceId = null;

    function totals() {
        var sum = 0;
        for (var i = 0; i < invoices.length; i++) {
            sum += invoices[i].total;
        }
        return sum;
    }

    return {
        newInvoice: function () {
            invoices.push(new Invoice());
            currentInvoiceId = 1;
        },
        totals: totals,
        invoices: function () {
            // don't return invoices directly because we want them modified through the InvoiceManager object
            return invoices.slice();
        }
    }
}());

var TestObject = (function () {
    function TestObject() {
        var _private = 1;
        //this.something = 22;
    }

    Object.defineProperty(TestObject.prototype, 'name', {
        value: 'hiiiii'
    });

    Object.defineProperty(TestObject.prototype, 'something', {
        //value: 'default',
        get: function () {
            return this.something;
        },
        set: function (value) {
            this.something = value;
        }
    });


    return TestObject;
}());

var testObj = new TestObject();

testObj.rrr = 'hi miek';

//var User = (function () {
//  function User (id, nam) {
//    Object.defineProperty (this, '__',  // Define property for field values
//       { value: {} });
//
//    this.id = id;
//    this.nam = nam;
//  }
//
//  (function define_fields (fields){
//    fields.forEach (function (field_name) {
//      Object.defineProperty (User.prototype, field_name, {
//        get: function () { return this.__ [field_name]; },
//        set: function (new_value) {
//               // some business logic goes here
//               this.__[field_name] = new_value;
//             }
//      });
//    });
//  }) (fields);
//
//  return User;
//}) ();
//
//var testUser = new User();
//
//testUser.something = 1;

