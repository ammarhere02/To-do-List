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
    user_id:
    {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true ,
    },
    name:
        {
            type: DataTypes.STRING,
        },
    email:
        {
            type: DataTypes.STRING,

        },
    password:
        {
            type: DataTypes.STRING,
        },
    role:
        {
            type: DataTypes.STRING,
            defaultValue: "user",
        }
})

const roles = sequelizeConnect.define("roles" , {

    role_id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true ,
        },
        role_name:
            {
                type: DataTypes.STRING,
            }
})

const permissions = sequelizeConnect.define("permissions", {

    permission_id:
        {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    permission_name:
        {
            type: DataTypes.STRING
        }

})

const role_permission = sequelizeConnect.define("role_permission", {

    role_id:
        {
            type: DataTypes.INTEGER,
        },
    permission_id:
        {
            type: DataTypes.INTEGER,
        }

})

const user_role = sequelizeConnect.define("user_role", {

    user_id:
        {
            type: DataTypes.INTEGER,
        },
        role_id:
            {
                type: DataTypes.INTEGER,
            }
})

roles.belongsToMany(permissions, { through: role_permission });
 permissions.belongsToMany(roles, { through: role_permission });


user.belongsToMany(roles, { through: user_role });
roles.belongsToMany(user, { through: user_role });

//
// async function check_permission(role_id , permission_name)
// {
//    await roles.findByPk(role_id ,
//        { include :
//                {
//                    model : permissions,
//                    where :{permission_name},
//                }
//     })
// }
//
// check_permission(1 , "create")
//     .then(result => {
//
//
//             console.log("has created the permission " , result)
//     })
//     .then(async() => {
//
//         const adminRole = await roles.findOne({
//             where: {role_name: 'Admin'}
//         })
//         console.log(adminRole)
//
//         const userRole = await roles.findOne({
//             where: {
//                 role_name: 'Client'
//             }
//         })
//
//         const createPermission = await permissions.findOne({
//             where: {permission_name: 'create'}
//
//         })
//         const editPermission = await permissions.findOne({
//             where: {permission_name: 'edit'}
//
//         })
//         const updatePermission = await permissions.findOne({
//             where: {permission_name: 'update'}
//
//         })
//         const deletePermission = await permissions.findOne({
//             where: {permission_name: 'delete'}
//         })
//         // await adminRole.add([createPermission , updatePermission, editPermission , deletePermission])
//         // await userRole.add(createPermission , updatePermission)
//         //     .catch(err => {
//         //         console.error("Error in creating the permission", err);
//         //     })
//     })

module.exports = {list , status , user ,roles ,  permissions ,role_permission , user_role }


