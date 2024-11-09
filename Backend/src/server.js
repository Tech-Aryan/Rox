import express from 'express';
import connectDB from './db.js';
import statisticsRoutes from './routes/statisticsRoutes.js';
import barChartRoutes from './routes/barChartRoutes.js';
import pieChartRoutes from './routes/pieChartRoutes.js';
import combinedDataRoutes from './routes/combinedDataRoutes.js'; 

const app = express();

connectDB();


app.use('/api/v1/statistics', statisticsRoutes);
app.use('/api/v1/barchart', barChartRoutes);
app.use('/api/v1/piechart', pieChartRoutes);
app.use('/api/v1/combined', combinedDataRoutes); 


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
