const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userCotroller = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    if (name === '' || email === '' || password === '') {
      req.flash('error_messages', '每個欄位請正確填寫')
      return res.redirect('signup')
    }
    if (password !== passwordCheck) {
      req.flash('error_messages', '兩次密碼不相同')
      return res.redirect('signup')
    }
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          req.flash('error_messages', '此email已經註冊')
          return res.redirect('signup')
        }

        User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
          .then(user => {
            req.flash('success_message', '帳號建立成功')
            return res.redirect('/signin')
          })
      })
  }
}

module.exports = userCotroller