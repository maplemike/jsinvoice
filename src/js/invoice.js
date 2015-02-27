// invoice.js

function Product() {

}


function Invoice() {
    // the invoice total - generally we change it through adding products/line items to the invoice,
    // never directly
    var _total = 0; // only accessible inside the constructor
    //vs
    this.total = 0;  // accessible outside constructor


    //Computed value, get only
    Object.defineProperty(this, "total", {
        get: function () {
            return _total / 100;
        }
    });
}

// is defining this on the prototype more efficient since its not copied for each object?
// not possible with the encapsulated _total variable but still...
Object.defineProperty(Invoice.prototype, "total", {
    get: function () {
        return _total / 100;
    },
    //value: 0,
    configurable: false,
    enumerable: true
});

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

var User = (function () {
  function User (id, nam) {
    Object.defineProperty (this, '__',  // Define property for field values
       { value: {} });

    this.id = id;
    this.nam = nam;
  }

  (function define_fields (fields){
    fields.forEach (function (field_name) {
      Object.defineProperty (User.prototype, field_name, {
        get: function () { return this.__ [field_name]; },
        set: function (new_value) {
               // some business logic goes here
               this.__[field_name] = new_value;
             }
      });
    });
  }) (fields);

  return User;
}) ();

var testUser = new User();

testUser.something = 1;

