const {list} = require('../models/seeders/seeders');

const express = require('express');

const app = express();
//getting lists
express.urlencoded({extended: false});

app.use(express.json());


const getList = async (req, res) =>{
    try
    {
        const findingList = await list.findAll();
        console.log("lists are displayed")
         res.status(200).json(findingList);

    }
    catch (e) {
        console.error("caught in getlist" , e);
    }

}

const  getListById  = async (req, res) =>{
    try
    {
        const id = parseInt(req.params.id);
        const findingById = await list.findByPk(id)
        console.log("ID's of lists are displayed")

         res.status(200).json(findingById);

    }
    catch (e) {
        console.error("caught in getlistbyID" , e);
    }
}
const postlist = async (req, res) => {
    console.log('Working')
        try {
            const data = req.body;
            const dataposted = await list.create(data);

            res.status(201).json({ message: "Successfully posted the data", dataposted });
            console.log("Data has been posted");
        } catch (e) {
            console.error("Error posting data:", e);
            res.status(500).json({ error: "Failed to post data" });
        }
};


const  updatelist = async (req, res) => {
    console.log("i m before")
    const id= parseInt(req.params.id);
    const data = req.body;

    try {
        const [updatedData] = await list.update(data, {
            where: {
                list_id: id,
            },
            plain: true
        });
            res.status(200).json({"message" : "data updated successfully" , data : updatedData});

    } catch (e) {

        res.json({error: "Failed to update list"});
    }
}

const deletelist = async (req, res) =>
{
    const id = parseInt(req.params.id);
    try
    {
  await list.destroy(
            {
                where: {

                    list_id: id,
                }
            },
            res.status(200).json({"message": "Data has been deleted successfully"})
        )
    }
    catch (e)
    {
        console.error("caught in deletelist" , e);
    }
}

module.exports = {getList , getListById , postlist , updatelist , deletelist}



