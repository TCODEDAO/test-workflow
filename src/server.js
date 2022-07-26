import express from 'express'
import ejs from 'ejs'
import path from 'path'
import mongoose from 'mongoose'
import configViewEngine from './configs/viewEngine'
// router config
import pageRouter from './routes/page.route'

const app = express()
// env config
require('dotenv').config()
// db config
mongoose.connect(
  'mongodb+srv://thanhadmin:thanh13708@thanhdeptrai.bucuf.mongodb.net/main?retryWrites=true&w=majority',
  () => {
    console.log('Your mongodb is starting...')
  }
)

const port = process.env.PORT
// static config

app.use('/static', express.static(path.resolve('src', 'public')))
// view engine config
configViewEngine(app)

app.use('/page', pageRouter)
app.get('/*', (req, res) => {
  res.render('index.ejs', { number: 1 })
})

app.get('/data/pages/videos', (req, res) => {
  ejs
    .renderFile(path.resolve(__dirname, 'views', 'pages', 'videos.ejs'))
    .then((html) => res.send(html.split('<!DOCTYPE html>')[1]))
    .catch((err) => {
      console.log(err)
      return res.send('Tải trang không thành công, vui lòng thử lại')
    })
})

app.listen(port, () => {
  console.log(`Your server start at http://localhost:${port}`)
})
