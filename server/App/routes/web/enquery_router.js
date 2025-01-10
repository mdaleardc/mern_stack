let express = require("express");
let {enqueryInsert, enqueryList, enqueryDelete, enquerySingleRow, enqueryUpdate} = require("../../controllers/web/enquery_controller");
let enqueryRouter = express.Router();

//create
enqueryRouter.post('/insert', enqueryInsert);
// read
enqueryRouter.get('/view', enqueryList);
//delete
enqueryRouter.delete('/delete/:id', enqueryDelete);
// get single query row
enqueryRouter.get('/single-row/:id', enquerySingleRow);
// update 
enqueryRouter.put('/update/:id', enqueryUpdate);


module.exports = enqueryRouter;