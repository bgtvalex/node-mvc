const Contact = require('../models/contact')
const createPath = require('../helpers/create-path')

const getContacts = (req, res) => {
  const title = 'contacts'
  Contact
    .find()
    .then(contacts =>  res.render(createPath('contacts'), { contacts, title }))
    .catch(err => {
      console.log(err)
      res.render(createPath('error'), { title: 'error' })
    })
}

module.exports = {
  getContacts
}