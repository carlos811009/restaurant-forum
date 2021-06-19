'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Restaurants', Array.from({ length: 50 }, (v, i) =>
    // 如果不想要加()就要加上return，用於回傳資料(官方文件)
    ({
      name: faker.name.findName(),
      tel: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      opening_hours: '08:00',
      // 改用 LoremFlickr圖庫
      image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
      description: faker.lorem.text(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
