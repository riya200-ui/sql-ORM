module.exports = (sequelize,Sequelize) => {
    const Post_Tag = sequelize.define("post_tag", {
        postId : Sequelize.INTEGER,
        tagId: Sequelize.INTEGER,
    },
    {
        timestamps : false
    });
    return Post_Tag;
}