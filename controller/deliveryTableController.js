const deliveryModel = require('../models/deliverytable')

exports.createDelivery = async(req, res)=>{
    try {
        const{ processedBy, status, clothes, orderId}= req.body

        const delivery = await deliveryModel.create({
            processedBy,
            status,
            clothes,
            orderId
        })
        res.status(201).json({
            message:"delivered",
            data: delivery
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
