import express from 'express'
import storiesController from '../controllers/stories/stories.js'

const router = express.Router()

router.get('/', storiesController.getStories)

export default router
