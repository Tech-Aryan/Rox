import Product from '../product.js';

export const getPieChartData = async (req, res) => {
    const { month } = req.query;

    
    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: 'Please provide a valid month (1-12).' });
    }

    try {
        
        const products = await Product.find({
            dateOfSale: {
                $gte: new Date(`2021-${month}-01`),
                $lt: new Date(`2021-${parseInt(month) + 1}-01`)
            }
        });


        const categoryCounts = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});

        
        const result = Object.keys(categoryCounts).map(category => ({
            category,
            itemCount: categoryCounts[category]
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ message: 'Error fetching pie chart data.' });
    }
};
