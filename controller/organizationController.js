const organizationModel = require('../models/organization');
const fs = require('fs')
const cloudinary = require('../middleware/cloudinary');
const Organization = require('../models/organization');
const Stafftable = require('../models/stafftable');
const Orders = require('../models/orders');
const Equipment = require('../models/equipment')

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
};

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await organizationModel.findAll({
            include: [{ model: Stafftable, as: 'staffs', attributes: ['name','staffDp']}, { model: Orders, as: 'orders'},
             { model: Equipment, as: 'Equipments', attributes: ['name','images']}],
             attribute: ['Name']
        });

        res.status(200).json({
            message:    `All Organizations found and the Total is: ${organizations.length}`,
            data: organizations
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getOrganization = async (req, res) => {
    try {

        const { id } = req.params
        const organization = await organizationModel.findByPk(id,{
            include: [{ model: Stafftable, as: 'staffs', attributes: ['name','staffDp']}, { model: Orders, as: 'orders'},
             { model: Equipment, as: 'Equipments', attributes: ['name','images']}],
             attribute: ['Name']
        });
        if (!organization) {
            return res.status(404).json({
                message: 'Organization not found',
                data: organization
            })
        }

        res.status(200).json({
            message:    `Organization with ID: ${id} found`,
            data: organization
        })

        // 
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};