import Product from '../product.js';  

export const getStatistics = async (req, res) => {
    const { month, year } = req.query;  

    
    if (!month || !year ) {
        return res.status(400).json({ message: 'Please provide a valid month and year' });
    }

    try {
       
        const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);  
        const endDate = new Date(startDate);  
        endDate.setMonth(startDate.getMonth() + 1);  
        endDate.setDate(0);  

       
        console.log("Start Date: ", startDate);
        console.log("End Date: ", endDate);

        const products = await Product.find(
            {
            dateOfSale:
            {
                $gte: startDate,  
                $lte: endDate,    
            }
        });

        console.log("Fetched Products: ", products);

        const totalSaleAmount = products.reduce((sum, product) => sum + product.price, 0);
        const soldItems = products.filter(product => product.sold).length;
        const notSoldItems = products.filter(product => !product.sold).length;

        
        res.json({
            totalSaleAmount,
            soldItems,
            notSoldItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
};
