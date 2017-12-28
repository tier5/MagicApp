module.exports =(sequelize,DataTypes) =>{
    var User = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull:false,
	    	validate: {
		    	notEmpty: true,
		    	notNull: true,
		    	isEmail: true
		    },
		    unique: true
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull:false,
	    	validate: {
		    	notEmpty: true,
		    	notNull: true
		    }
	    },
      });
      User.sync({force: true}).then(() => {
        // table is created
      })
    
      return User;

} 


