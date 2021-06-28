module.exports = (sequelize, Sequelize) => {
    const Handout = sequelize.define("handout", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sent: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        hideName: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Handout;
}