import mongoose from 'mongoose'
export const connectDb = () => {
  mongoose
    .connect(`${process.env.local_db_url}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('Db connected')
    })
    .catch(error => {
      console.log(error)
    })
}
