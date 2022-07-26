import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    content: String,
    author: String,
    slug: String,
    previewImage: String
  },
  {
    timestamps: true
  }
)
export default mongoose.model('videos', videoSchema)
