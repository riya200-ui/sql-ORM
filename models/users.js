const { get } = require("express/lib/response");

module.exports = (sequelize,Sequelize) => {
    //new model User is created first para is medel name andsecond consists of atributs which table col
    const User = sequelize.define("users", {
    name:{
        type:Sequelize.STRING,
        //in setter we set name wuth post
       /* set(value){
            this.setDataValue('name',value+' bhai')
        },

        //in getter we get all data with post name
        get(){
            return this.getDataValue('name')+' panchal';
        }*/
    },
    email:{
        type: Sequelize.STRING,
       // defaultValue:'test@gmail.com',

       //constarits
       allowNull:false,
       //unique:true,

      
        /*set(value){
            this.setDataValue('email',value+' @gmail.com')
        }*/
    },
    gender:{
        type:Sequelize.STRING,
        
         //validate
        validate:{
        //equals : 'male'
        //isIn:[['male','female']]

        equals : {arg: 'male',
        msg:'Please enter Only Male'
      }
    }
    },
    //{//for remove creted updated at
     //timestamps:false
     //just remove created at
     //updatedAt:false
     //for change name of created
     //createdAt:'create_at',
     //updatedAt:'mofified_at',
    // engine:'MYSAM'
    //tablename:'userdata',
   // },
});
   //Users is db name in mysql
   return User;
}