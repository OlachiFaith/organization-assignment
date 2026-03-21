const staffModel = require("../models/stafftable");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.js");

exports.addStaff = async (req, res) => {
  const profilePhoto = req.files.profilePhotos;
  const staffDp = req.files.staffDp;

  try {
    const { name, position, salary, Organizationid } = req.body;
    const staffDpResult = await cloudinary.uploader.upload(staffDp[0].path);
    const sd = {
      secureUrl: staffDpResult.secure_url,
      publicId: staffDpResult.public_id,
    };
    console.log(staffDp[0].path)
    fs.unlinkSync(staffDp[0].path);

    const profilePhotoResult = profilePhoto.map((e) => e.path);
    const profilePhotoFile = profilePhotoResult.map(async (e) => {
      return cloudinary.uploader.upload(e);
    });

    const result = await Promise.all(profilePhotoFile);

    const profilePublicIds = [];

    result.forEach((e) => {
      const pp = { secureUrl: e.secure_url, publicId: e.public_id };
      profilePublicIds.push(pp);
    });

    await Promise.all(
      profilePhoto.map((e) => {
        fs.unlinkSync(e.path);
      }),
    );

    const productData = {
        name,
        position,
        salary,
        Organizationid,
        staffDp: sd,
        profilePhotos: profilePublicIds
    };
    
    const product = await staffModel.create(productData);

    res.status(201).json({
        message: 'Product Added Successfully',
        data: product
    })
  } catch (error) {
    console.log(error);
    fs.unlinkSync(staffDp[0].path);

    await Promise.all(
      profilePhoto.map((e) => {
        fs.unlinkSync(e.path);
      }),
    );

    res.status(500).json({
        message: 'server error'
    })
  }
};
