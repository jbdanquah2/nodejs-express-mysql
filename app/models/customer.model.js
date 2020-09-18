const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.customerNumber = customer.customerNumber;
  this.customerName = customer.customerName;
  this.contactLastName = customer.contactLastName;
  this.contactFirstName = customer.contactFirstName;
  this.phone = customer.phone;
  this.addressLine1 = customer.addressLine1;
  this.addressLine2 = customer.addressLine2;
  this.city = customer.city;
  this.state = customer.state;
  this.postalCode = customer.postalCode;
  this.country = customer.country;
  this.salesRepEmployeeNumber = customer.salesRepEmployeeNumber;
  this.creditLimit = customer.creditLimit;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { customerNumber: res.insertId, ...newCustomer });
    result(null, { customerNumber: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerNumber, result) => {
  sql.query(`SELECT * FROM customers WHERE customerNumber = ${customerNumber}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {                                                          
  sql.query(
    "UPDATE customers SET customerNumber = ?, customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?, salesRepEmployeeNumber = ?, creditLimit =?  WHERE customerNumber = ?",
    [customer.customerNumber, customer.customerName, customer.contactLastName, customer.contactFirstName, customer.phone, customer.addressLine1, customer.addressLine2, customer.city, customer.state, customer.postalCode, customer.country, customer.salesRepEmployeeNumber, customer.creditLimit, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;

