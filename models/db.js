const {list , status} =  require('./seeders/seeders.js')

const express = require('express')
const app = express()
const dbList = [
    { list_id: 1, task_name: 'wash your hands' },
    { list_id: 2, task_name: 'clean your house' },

];

for(const item of dbList)
{
    const dbListt =  list.create(item);
    console.log(dbListt);
}



const db_status = [
    { status_id: 1 , current_status: true},
    { status_id: 2, current_status: false },

];

for(const stat of db_status)
{
    const statusmode =  status.create(stat);
    console.log(statusmode);
}
