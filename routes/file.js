const express = require('express')
const { saveFileAsync } = require('../utils/FileManage')
const router = express.Router()

/* GET file listing. */
router.post('/', (req, res) => {
  const { my_field } = req.body // retrieve your custom fields from req.body
  const { files } = req.files // retrieve your files from req.files

  console.log(my_field, files)

  if (!files) res.send('no file has been uploaded')

  // only one file has been uploaded
  if (files && !Array.isArray(files)) {
    const { my_field, name, data } = files
    saveFileAsync(data, name)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    res.send('file has been uploaded')
  }

  // more than one file has been uploaded
  if (files && Array.isArray(files)) {
    files.forEach(async (file, idx) => {
      const { name, data } = file
      try {
        await saveFileAsync(data, name)
      } catch (e) {
        console.log(e)
      }
    })
    res.send('files have been uploaded')
  }
})

module.exports = router
