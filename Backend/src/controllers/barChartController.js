import Product from '../product.js';

export const getBarChartData = async (req, res) =>
     {
    const { month } = req.query;  

    
    if (!month || isNaN(month) || month < 1 || month > 12) 
    {
        return res.status(400).json({ message: 'Please provide a valid month (1-12)' });
    }

    try {
        const startOfMonth = new Date(`2021-${month}-01`);
        const endOfMonth = new Date(`2021-${month}-31`);

        
        const products = await Product.find
        ({
            dateOfSale: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });

        const priceRanges = [
            { range: "0-100", min: 0, max: 100, count: 0 },
            { range: "101-200", min: 101, max: 200, count: 0 },
            { range: "201-300", min: 201, max: 300, count: 0 },
            { range: "301-400", min: 301, max: 400, count: 0 },
            { range: "401-500", min: 401, max: 500, count: 0 },
            { range: "501-600", min: 501, max: 600, count: 0 },
            { range: "601-700", min: 601, max: 700, count: 0 },
            { range: "701-800", min: 701, max: 800, count: 0 },
            { range: "801-900", min: 801, max: 900, count: 0 },
            { range: "901-above", min: 901, max: Infinity, count: 0 }
        ];


        products.forEach(product => {
            const price = product.price;

            for (let range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    range.count += 1;
                    break;
                }
            }
        });

        
        res.json({
            month,
            data: priceRanges.map(range => ({ range: range.range, count: range.count }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
};
