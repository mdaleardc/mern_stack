const enqueryModel = require("../../models/enquery.model")

//create
const enqueryInsert = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
  const createEnquery = await enqueryModel.create({ name, email, phone, message });
  res.status(201).json({status: 1, message: "User enquery created successfully", data: createEnquery});
  } catch (err) {
    res.status(500).json({status: 0, message: err.message});
  }
};

// read
const enqueryList = async (req, res) => {
  try {
  const enqueryData = await enqueryModel.find();
  res.send(enqueryData);
  } catch (err) {
    res.send({status: 0, message: err.message});
  }
}

// delete
const enqueryDelete = async (req, res) => {
  const enqId = req.params.id;
  try {
  const enqueryToDelete = await enqueryModel.deleteOne({_id:enqId});
  res.send({status: 1, message: "Enquery deleted successfully", enquery: enqueryToDelete});
  } catch (err) {
    res.send({status:0, message: err.message});
  }
}

// get single row
const enquerySingleRow = async (req, res) => {
  let enqId = req.params.id;
  try {
  const singleEnquery = await enqueryModel.findOne({_id:enqId});
  res.send({status:1, singleEnquery});
  } catch (err) {
    res.send({status:0, err: err.message});
  }
}

// update 
const enqueryUpdate = async (req, res) => {
  let enqId = req.params.id;
  try {
    const {name, email, phone, message} = req.body;
    const updateObj = {name, email, phone, message};
    const enqueryToUpdate = await enqueryModel.updateOne({_id:enqId}, {$set: updateObj});
    res.send({status: 1, enqueryToUpdate});
    
  } catch (err) {
    res.send({status: 0, err: err.message});
  }
}



module.exports = {enqueryInsert, enqueryList, enqueryDelete, enquerySingleRow, enqueryUpdate};