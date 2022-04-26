module.exports = (sequelize,Sequelize) => {
    const Tags = sequelize.define("tags", {
        name: Sequelize.STRING
    },
    {
        createdAt:'create_at',
        updatedAt:'modified_at'
    });
    return Tags;
}