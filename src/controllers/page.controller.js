import ejs from 'ejs'
import path from 'path'
import Video from '../models/video.model'

const pageController = {
  getHome: async (req, res) => {
    const videos = await Video.find({})
    ejs
      .renderFile(path.resolve('src/views/pages/home.ejs'), { videos })
      .then((html) => {
        res.send(html)
      })
      .catch((err) => {
        console.log(err)
        res.send('Co loi xay ra!')
      })
  },
  getImage: (req, res) => {
    ejs
      .renderFile(path.resolve('src/views/pages/image.ejs'))
      .then((html) => {
        res.send(html)
      })
      .catch(() => {
        res.send('Co loi xay ra!')
      })
  },
  getVideo: async (req, res) => {
    const video = await Video.findOne({
      slug: req.params.slug
    })
    ejs
      .renderFile(path.resolve('src/views/pages/video.ejs'), { video })
      .then((html) => {
        res.send(html)
      })
      .catch((err) => {
        console.log(err)
        res.send('Co loi xay ra!')
      })
  },
  uploadVideo: async (req, res) => {
    const newVideo = new Video({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      author: 'Admin Thanh',
      slug: req.body.slug
    })
    try {
      await newVideo.save()
      return res
        .status(200)
        .json({ isSuccess: true, message: 'thêm video thành công' })
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: true, message: 'thêm video không thành công' })
    }
  }
}
export default pageController
