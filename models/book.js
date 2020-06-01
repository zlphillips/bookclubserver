module.exports = function(sequelize, DataTypes){
    return sequelize.define('book', {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        genre: DataTypes.STRING,
        length: DataTypes.INTEGER,
        review: DataTypes.STRING,
        owner: DataTypes.INTEGER,
    })
}