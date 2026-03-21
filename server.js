require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 7070
const sequelize = require('./database/database');
// const productRouter = require('./routes/productRouter')
const organizationRouter = require('./router/organizationRouter')

const app = express();

app.use(express.json());

app.use(organizationRouter)

// app.use(productRouter)

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