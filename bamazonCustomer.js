// using inquirer interface 
var inquirer = require('inquirer');
var mysql = require('mysql');

// connection to mysql//
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Mysql@2411",
    database: "bamazon_db"
});
//function check if it is possible values 
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign ===1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

//prompt function for user to buy stuff
//prompt is used as an object
function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input) {
//creating variables
        var item = input.item_id;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';
// here we are connecting to mysql
        connection.query(queryStr, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID. ');
                displayInventory();
            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQueryStr, function(err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("------------------------------------------------------------------------\n");
                        connection.end();
                    })
                } else {
                    console.log
                    console.log('Sorry, there is not enough product in stock, your order cannot be placed as is.');
                    console.log('Please modify your order.');
                    console.log("n-----------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}
//function to display inventory
function displayInventory() {

    queryStr = 'SELECT * FROM products';
    //displaying the products

    connection.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('.................\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + ' // ';
            strOut += 'Prouct Name: ' + data[i].product_name + ' // ';
            strOut += 'Department: ' + data[i].department_name + ' // ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        console.log("------------------------------------------------------------------------\n");

        promptUserPurchase();
    })
}
//function to display the products
function runBamazon() {
    displayInventory();
}
//first call of function
runBamazon();