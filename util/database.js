import mongoose from 'mongoose'
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Databse connected ')
  })
  .catch(() => {
    console.log('connection failed !')
  })

export default mongoose
