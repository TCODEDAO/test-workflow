import express from 'express'
import pageController from '../controllers/page.controller'

const router = express.Router()

router.get('/home', pageController.getHome)
router.get('/image', pageController.getImage)
router.get('/video/:slug', pageController.getVideo)
export default router
