require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 7070
const sequelize = require('./database/database');
const organizationRouter = require('./routes/organizationRouter')
const StaffRouter = require('./routes/staffRouter');
const orderRouter = require('./routes/orderRouter')
const equipmentRouter = require('./routes/equipment');
const deliveryRouter = require('./routes/deliverytableRouter')

const app = express();

app.use(express.json());

app.use(organizationRouter);

app.use(StaffRouter);

app.use(orderRouter);

app.use(StaffRouter);

app.use(equipmentRouter);

app.use(deliveryRouter);


const DB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        
    } catch (error) {
       console.log('Error connecting to Database: ', error.message);
        
    }
}

DB();


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})