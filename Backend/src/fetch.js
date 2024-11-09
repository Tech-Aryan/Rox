import axios from 'axios';
import Product from './product.js';  


async function fetchAndStoreData() {
    try {
       
        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const products = response.data;

        
        products.forEach(product => {
            console.log('Product DateOfSale:', product.dateOfSale); 
        });

        
        await Product.insertMany(products);
        console.log("Data successfully saved to MongoDB!");
    } catch (error) {
        console.error("Error fetching or saving data:", error);
    }
}

export default fetchAndStoreData;
