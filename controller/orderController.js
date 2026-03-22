const orderModel = require('../models/orders.js');
const fs = require('fs')
const cloudinary = require('../config/cloudinary.js')

exports.addOrder = async (req, res)=> {
    try {
        const {type, status, amount, staff, Organizationid} = req.body;
        console.log('Req File', req.files);

        const imagesPaths = req.files.map((img) => img.path);
        console.log('imagePath: ', imagesPaths);
        

        const images = [];
        const imagePublicIds = [];

        // Upload each image to cloudinary and store the secure URL and public ID

        for (const path of imagesPaths) {
            const result = await cloudinary.uploader.upload(path)
            console.log('results: ',result);
            
            images.push(result.secure_url);
            imagePublicIds.push(result.public_id);
            fs.unlinkSync(path)
        }

        const orderData = {
            type,
            status,
            amount,
            staff,
            Organizationid,
            images,
            imagePublicIds
        };
        const order = await orderModel.create(orderData);

        res.status(201).json({
            message: 'Order Added Successfully',
            data: order
        })
    } catch (error) {
        console.log(error);
        
        // req.files.forEach((element) => {
        //     fs.unlinkSync(element.path)
        // })
        res.status(500).json({
            message: error.message
        })
    }
};
