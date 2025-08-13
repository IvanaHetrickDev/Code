// Create JavascriptCerf
// Given variables
const dishData = [
    {
        name: "Italian pasta",
        price: 9.55
    },
    {
        name: "Rice with veggies",
        price: 8.65
    },
    {
        name: "Chicken with potatoes",
        price: 15.55
    },
    {
        name: "Vegetarian Pizza",
        price: 6.45
    },
];

const tax = 1.20; // Global tax variable

// Implement getPrices()
function getPrices(taxBoolean) {
    const finalPrices = [];

    // Check if taxBoolean is provided and is a boolean
    if (typeof taxBoolean !== 'boolean') {
        console.log("You need to pass a boolean to the getPrices call!");
        return;
    }

    for (let i = 0; i < dishData.length; i++) {
        let finalPrice;

        if (taxBoolean) { 
            finalPrice = dishData[i].price * tax; 
        } else {
            finalPrice = dishData[i].price; 
        }

        // Adjusted the log message
        console.log(`Dish: ${dishData[i].name} Price: $${finalPrice.toFixed(2)}`);
        finalPrices.push(finalPrice); 
    }
    return finalPrices; 
}

// Call getDiscount()
function getDiscount(taxBoolean, guests) {
    const prices = getPrices(taxBoolean);

    if (typeof guests === 'number' && guests > 0 && guests < 30) {
        let discount = 0;

        if (guests < 5) {
            discount = 5;
        } else if (guests >= 5) {
            discount = 10;
        }
        console.log('Discount is: $' + discount);
    } else { 
        console.log('The second argument must be a number between 0 and 30');
    }
}

// Example usage
getPrices(true);  // Call to get prices with tax
getDiscount(true, 4);  // Valid input (less than 5 guests)
getDiscount(true, 5);  // Valid input (5 guests)
getDiscount(true, 10);  // Valid input (more than 5 guests)
getDiscount(true, 31);  // Invalid input (more than 30 guests)
getDiscount(true, -1);  // Invalid input (negative guests)
getDiscount(true, 'a');  // Invalid input (non-number)
