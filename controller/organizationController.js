const organizationModel = require('../models/organization');
const fs = require('fs')
const cloudinary = require('../middleware/cloudinary')

exports.createOrganization = async(req, res)=>{
    try {
       const {  Name, Address ,email , phoneNumber} = req.body;
console.log(req.file.path)
       const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'image'}, (err, result)=> {
        if (err) {
            console.log(err)
        }else{
            console.log(result)
        }
       });
console.log('after')
       fs.unlinkSync(req.file.path)

       const organizationData = {
         Name, 
         Address ,
         email , 
         phoneNumber,
         Logo: result.secure_url,
         LogoPublicId: result.public_id
       };
console.log(organizationData)
       const organization = await organizationModel.create(organizationData);
       console.log(organization)
        res.status(201).json({
            message:"organization successfully created",
            data:organization
        })
    } catch (error) {
        console.log(error)
        fs.unlinkSync(req.file.path)
        res.status(500).json({
            message:error.message
        })
    }
}