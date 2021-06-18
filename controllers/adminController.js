const db = require('../models')
const Restaurant = db.Restaurant


const adminController = {

  getRestaurants: (req, res) => {
    return Restaurant.findAll({
      raw: true,
      nest: true
    })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })

  },
  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },

  postRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Restaurant.create({
      name, tel, address, opening_hours, description
    })
      .then((restaurant) => {
        req.flash('success_messages', 'restaurant was successfully created')
        res.redirect('/admin/restaurants')
      })
  },
}
module.exports = adminController