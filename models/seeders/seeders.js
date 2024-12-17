const {Sequelize , DataTypes} = require( 'sequelize')

const sequelizeConnect = new Sequelize("todolist" , "root" , "ammar12345678" ,
    {
        host: "127.0.0.1",
        dialect: "mysql",
    })

sequelizeConnect.sync()
    .then(() => {
        console.log("Sequelize connected successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });




 const list = sequelizeConnect.define( "list" ,
    {
        list_id:
            {
                type: DataTypes.INTEGER,
                primaryKey: true ,
            },
        task_name: {
            type: DataTypes.STRING,
            allowNull: true
        }


    })

 const status = sequelizeConnect.define("status",
    {

        status_id :
            {
                type: DataTypes.INTEGER,
                allowNull: true,
                autoincrement: true,
            },
        current_status:
            {
                type: DataTypes.BOOLEAN,
                defaultValue : true,
                allowNull: false,
            }
    })

list.hasOne(status)
status.belongsTo(list)


const user = sequelizeConnect.define("user", {

    name:
        {
            type: DataTypes.STRING,
        },
    email:
        {
            type: DataTypes.STRING,
            primaryKey: true ,
        },
    password:
        {
            type: DataTypes.STRING,
        }



})
module.exports = {list , status , user}