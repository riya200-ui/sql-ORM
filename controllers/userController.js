var db = require('../models');
const  {Sequelize,Op, QueryTypes} = require('sequelize');
const {response} = require('express');
const { User } = require('../models');

//const users = require('../models/users');
// const Users = db.users if we use this in await db.Users then give deprication warnng

var addUser = async (req,res)=> {
    
    //const user=({name:'Test',email:'test@gmail.com'});
    
    /*const blulk = [
    {name:'deepa',email:'test@gmail.com'},
    {name:'riya',email:'tes@gmail.com'},
    {name:'dev',email:'te@gmail.com'},
    {name:'diya',email:'t@gmail.com'},
    ];

    //db.User require model-index.js 
    //db=const name User(db.User = require('./users')(sequelize,Sequelize)) user where we add data
    //bulkCreate creates table rows in blulkCreate instaed of create
    
    await db.User.bulkCreate(blulk)
    .then(()=>{
        console.log('sucessfully')
    })
    .catch(err=> {
        console.log("error");
    });*/
    
    let data = db.User.build({name:'est',email:'est@gmail.com'});
    await data.save()

    //data.destroy();
    //console.log(data.dataValues);

    //data.name = 'dummy';
    //data.reload();

    .then(()=> {
        console.log('build data');
        console.log(data);
    }).catch((err) => {
        console.log("error");
    });
    let response = {
        data:'ok'
    }
    //db with id 2,by defalut returns lots of metadata,to turn off use plain
    
    
    /*db.UserfindById(2)
    .then((db) => {
        console.log(db.get({plain:true}));
        console.log('****************')
        console.log(`id${db.id}, email:${db.email}`);
    }).catch((err) => {
    console.log("error")
    })*/
}

var crudOperation  = async(req,res)=> {

     //insert
    const data= await db.User.create({name:'Test',email:'test@gmail.com'})
    console.log(data.id);

    //update
    /*const data = await db.User.update({name:'priya',email:'riya@gmail.com'},{
        where:{id:2}
    });
    console.log('sucess');*/

    //delete for delete perticul row in table
    /*const data = await db.User.destroy({
        where:{id:2}
    });
    console.log('sucess');*/

    //truncate -for delete whole table
    /*const data = await db.User.destroy({
        truncate:true
    });
    console.log('sucess');*/

    //find
    /*const data = await db.User.findAll({});
    let response ={
        data:data
    }*/
    let response ={
        data:'ok crud'
    }
    res.status(200).json(response);
     
}

var querydata = async(req,res) => {

    const data = await db.User.create(
        {name:'devarsh',email:'dev@gmail.com','gender':'male'},
        {fields:['email','gender']}
    )
    console.log('query create')

    //select
    /*let data = await db.User.findAll({
        attributes:[
            'name',
            ['email','emailID'],
            'gender',
            //[Sequelize.fn('Count', Sequelize.col('email')),'emailCount']
            //Conacat email with id ,if we space ' ID' then print like this
            [Sequelize.fn('CONCAT', Sequelize.col('email'),' ID'),'emailCount']
        ]
    });*/
      
    //include and exclude
    /*let data = await db.User.findAll({
      attributes:{
          exclude:['createdAt','updatedAt'],
          include:[
            [Sequelize.fn('CONCAT', Sequelize.col('email'),' ID'),'emailCount']
          ]
      },
    });*/

    //------condition-------//
    /*let data = await db.User.findAll({
        where:{
            //id:2
            id:{
                [Op.gt]:5
                },
            email:{
                [Op.like]:'%@gmail.com%'
                },
        },

        order:[
            ['email','DESC']
        ],
        group:['email','name'],
        limit:2,
        //offset means id=op.gt=5+1
        offset:1
    });*/

    //let data = await db.User.count({});
    let response ={
        data:data
    }
    res.status(200).json(response);
};

var finderData = async (req,res)=> {
    //let data = await db.User.findAll({});
    //let data = await db.User.findOne({}); 
    //let data = await db.User.findByPk(4);
    //let data = await db.User.findAndCountAll({
     //   where:{
      //      email:'dev@gmail.com'
      //  }
    //});

    let [data,created] = await db.User.findOrCreate({
        where:{name:'dummy'},
        defaults:{
            email:'dummy@gmail.com',
            gender:'male'
        }
    })
    let response = {
        data : data,
        add:created
    }
    res.status(200).json(response);
}

var setterGetter = async(req,res) => {
   // let data = await db.User.create({name:'manu',email:'manu@gmail.com',gender:'male'});
    let data = await db.User.findAll({});
    
    let response = {
        data:data
    }
    res.status(200).json(response);
}

var validationCont = async(req,res)=> {
    try{
        let data = await db.User.create({name:'jinal',email:'jinal@gmail.com',gender:'female'});
        console.log('sucesssfully')
    }catch(e){
        console.log('error');

        const messages = {};
        e.errors.forEach((error) => {
            let message;
            console.log(error);
            switch (error.validatorkey){
                case 'not_unique':
                    message = 'Duplicate Email';
                    break;

                case 'isIn':
                    message = 'Gender Not in Male/Female';
                    break;
                    
                case 'equals':
                    message = 'Gender Not  Male';
                    console.log(message);
                    break;    
            }
            messages[error.path]= message;
        })

    }
    
    let response = {
        data: 'data'
    }

    res.status(200).json(response);
} 

var rawQuery = async(req,res)=> {
    try{
        console.log('yess');
        //db.User = require('./users')(sequelize,Sequelize); this users is require
        let data = await db.sequelize.query("Select * from users  where gender = $gender ", {
        type: QueryTypes.SELECT,  
        model: User,
        mapToModel : true,
        raw: true,
       // replacements :{searchEmail:'%@gmail.com'} //email LIKE :searchEmail 
       // replacements :{gender:['male','female']} //gender IN(:gender)
        // replacements :{gender:['male','female']} //gender IN(:gender)
        //replacements :['female'] //gender = ? 
       // replacements : {gender:'male'} //gender = :gender
        bind:{gender:'male'}
    });
  
    let response = {
        data : 'data',
        record: data
    }
    res.status(200).json(response);
}catch{ 
    console.log('raw query error');
}

    

    
}

module.exports ={ 
    addUser ,
    crudOperation ,
    querydata,
    finderData,
    setterGetter,
    validationCont,
    rawQuery
}
