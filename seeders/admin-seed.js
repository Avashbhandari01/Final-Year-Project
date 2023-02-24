'use strict';

const bcrypt = require('bcryptjs');
require('dotenv').config();
const adminPassword = process.env.PASSWORD;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const encryptedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = {
        username: 'admin',
        email: 'admin@gmail.com',
        password: encryptedPassword,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return queryInterface.bulkInsert('admins', [admin], {});
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkDelete('admins', null, {});
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};