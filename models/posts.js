module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        content :Sequelize.STRING,
        user_id: Sequelize.INTEGER
    },
    {
        createdAt:'created_at',
        updatedAt:'modified_at'
    });
    return Posts;
}