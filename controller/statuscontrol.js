const express = require('express');
const app = express();

const {status} = require('../models/seeders/seeders')

app.use(express.json());

const  getstatus  = async (req, res)=> {

    const stat = await status.findAll()
    res.status(200).json(stat)
    console.log(`ALL the status of the tasks are displayed`);
}

const  getstatuswithid = async (req, res)=>
{

    const id = parseInt(req.params.id);
    const statid = await status.findByPk(id)
    res.status(200).json(statid)
    console.log(`The id of the task is ${id} `);
}

const updatestatus  = async (req, res)=>
{

    await status.destroy({

        where: {current_status : false ,
        }
    })
    res.status(200).json();

}

module.exports = {getstatus , getstatuswithid , updatestatus}
