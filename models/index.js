const Sequelize = require('sequelize');

//(dbname,user,password,{host,dialect,pool})
//user:root and pass: no password
const sequelize = new Sequelize('nodejs-sql','root','',{
    host:'localhost',
    dialect:'mysql',
    // pool:{max:5,min:0,idle:10000}
    //logging for print in terminal
    logging:true,
    operatorsAliases: false,

});
//check authenticate
sequelize.authenticate()
.then(()=>{
    console.log('connected')
})
.catch(err=> {
    console.log("error"+err);
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./users')(sequelize,Sequelize);

/*db.drop().then(() => {
    console.log('table deleted');
}).finally(() => {
    sequelize.close();
});*/

//if sync then succesfully crete table bt not focresfully
//he force option drops the table if it exists before the creation.only forcefully true for testing purpose
//sync({force:false,match:/nodejs-sql$/})
db.sequelize.sync()
.then(()=>{
    console.log('yes is re-sync')
})
.catch(err=> {
    console.log("error"+err);
});
module.exports =db;
