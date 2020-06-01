const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function success() {
        console.log('Connected to book club database');
     },
    function error(err) { 
        console.log(err);
    }
);

module.exports = sequelize;