const orderModel = require('../models/orders.js');
const fs = require('fs')
const cloudinary = require('../config/cloudinary.js');
const deliveryTables = require('../models/deliverytable.js');

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

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll({
            include: { model: deliveryTables, as: 'Delivery', attributes: ['processedBy','status']},
        });

        res.status(200).json({
            message:    `All Orders found and the Total is: ${orders.length}`,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getOrder = async (req, res) => {
    try {

        const { id } = req.params
        const order = await orderModel.findByPk(id,{
             include: { model: deliveryTables, as: 'Delivery', attributes: ['processedBy','status']},
        });
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                data: order
            })
        }

        res.status(200).json({
            message:    `Order with ID: ${id} found`,
            data: order
        })

        // 
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
