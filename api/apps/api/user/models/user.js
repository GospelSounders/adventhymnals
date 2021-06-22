'use strict'
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('users', {
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		additionalInfo: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '{}',
		},
		email: {
			type: DataTypes.STRING(126).BINARY,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: {
					args: true,
					msg: 'Please provide a valid email address.'
				},
				len: {
					args: [1, 254],
					msg: 'Please enter an email address shorter than 254 characters'
				}
			}
		},
		// password: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// 	validate: {
		// 		len: {
		// 			args: [6, 32],
		// 			msg: 'Please make your password at least 6 characters long.'
		// 		}
		// 	}
		// },
		// cPassword: {
		// 	type: DataTypes.VIRTUAL
		// },
		authority: {
			type: DataTypes.STRING,
			allowNull: false,
			type: DataTypes.ENUM('SYS_ADMIN', 'SYS_USER'),
			// validate: {
			// 	len: {
			// 		args: [3, 32],
			// 		msg: 'Please give us a correct name'
			// 	}
			// }
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 32],
					msg: 'Please give us a correct first name'
				}
			}
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 32],
					msg: 'Please give us a correct last name'
				}
			}
		},
		gender: {
			type: DataTypes.ENUM('Male', 'Female'),
			defaultValue: 'Male'
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},

	},
		{
			hooks: {
				//beforeCreate:hashPassword,
				//beforeUpdate:hashPassword,
				//beforeSave:hashPassword
			}

		})


	user.associate = function (models) {
		user.hasOne(models.activationCode, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		user.hasOne(models.passwordCode, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		user.hasOne(models.password, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		// console.log(models)
		user.hasMany(models.organizations, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		user.hasMany(models.organizationUser, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		user.hasMany(models.facilityUser, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		user.hasMany(models.logins, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	// 	user.hasOne(models.activationCodes, {
	// 		onDelete: "CASCADE",
	// 		onUpdate: "CASCADE",
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
	// }

	//     User.hasMany(models.Facebook, {
	//     	onDelete: "CASCADE",
	//     	onUpdate: "CASCADE",
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	//     });

	//     User.hasMany(models.Google, {
	//     	onDelete: "CASCADE",
	//     	onUpdate: "CASCADE",
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	//     });

	// 	User.hasMany(models.Emailprofile, {
	//     	onDelete: "CASCADE",
	//     	onUpdate: "CASCADE",
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	//     });

	// User.hasMany(models.AppUser, {
	// 	onDelete: "CASCADE",
	// 	onUpdate: "CASCADE",
	// 	foreignKey: {
	// 		allowNull: false
	// 	}
	// }); 

	// User.hasMany(models.FamilieMember, {
	// 	onDelete: "CASCADE",
	// 	onUpdate: "CASCADE",
	// 	foreignKey: {
	// 		allowNull: false
	// 	}
	// });

	// }


	// User.prototype.comparePass = async function(password){
	// 	return bcrypt.compareAsync(password, this.Password)
	// }


	return user;
}
