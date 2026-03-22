const delivery = require('../models/deliverytable')

exports.createDelivery = async(req, res)=>{
    try {
        const{processedBY, Status, Clothes, orderId}= req.body

        const delivery = await delivery.create({
            processedBY,
            Status,
            Clothes,
            orderId
        })
        res.status(201).json({
            message:"delivered"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
