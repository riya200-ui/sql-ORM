module.exports = (sequelize,Sequelize) => {
    //new model User is created first para is medel name andsecond consists of atributs which table col
    const User = sequelize.define("users", {
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
        defaultValue:'test@gmail.com'
    },
    gender:{
        type:Sequelize.STRING
    }
 },{//for remove creted updated at
     //timestamps:false
     //just remove created at
     //updatedAt:false
     //for change name of created
     //createdAt:'create_at',
     //updatedAt:'mofified_at',
    // engine:'MYSAM'
    //tablename:'userdata',
   },
   {

   });
   //Users is db name in mysql
   return User;
}