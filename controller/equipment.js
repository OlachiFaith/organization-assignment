const cloudinary = require('../middleware/cloudinary');
const equipmentModel = require('../models/equipment');


exports.createEquipment = async (req, res) => {
    const files = req.files;
    try {
        const { name, price, expiryDate, status, organizationId } = req.body;
        const imagesPath = files.map(img => img.path);
        const imagesRes = imagesPath.map((path) => {
            return cloudinary.uploader.upload(path)
        })
        const imageData = await Promise.all(imagesRes);
        let images = [];
        imageData.forEach((e) => {
            let imagesObj = { url: e.secure_url, publicId: e.public_id };
            images.push(imagesObj)
        });

        const data = {
            organizationId,
            name,
            price,
            expiryDate,
            status,
            images
        };

        const equipment = await equipmentModel.create(data);
        res.status(201).json({
            message: 'Equipment created successfully',
            data: equipment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        })
    }
}