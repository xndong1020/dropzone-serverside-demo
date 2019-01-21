const fs = require('fs')
const path = require('path')

const saveFileAsync = (data, name) => {
  const filePath = `${path.join(__dirname, '../uploads/').toString()}${name}`
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = {
  saveFileAsync
}
