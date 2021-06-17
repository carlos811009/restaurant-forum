const adminController = {
  getRestautants: (req, res) => {
    return res.render('admin/restaurants')
  }
}

module.exports = adminController