const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const routerHome = require('./routers/home')
const habits = require('./routers/habits')
const routerAdd = require('./routers/add')
const wishlist = require('./routers/wishlist')

const User = require('./models/user')



const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'))

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5d235642d2b30b7767144d34')
    req.user = user;
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'static')))

app.use(express.urlencoded({ extended: false }))

app.use('/', routerHome)
app.use('/habits', habits)
app.use('/add', routerAdd)
app.use('/wishlist', wishlist)

async function runDatabase() {
  try {
    // const db = 'mongodb+srv://Peter-user:7IueMBg7hi1HQo21@cluster0-zkesq.mongodb.net/habits'
    const db = 'mongodb://Peter-habits:7IueMBg7hi1HQo21@cluster0-shard-00-00-zkesq.mongodb.net:27017,cluster0-shard-00-01-zkesq.mongodb.net:27017,cluster0-shard-00-02-zkesq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    await mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'user@ukr.net',
        name: 'Fedor',
        wishlist: { items: [] }
      })
      await user.save()
    }

    app.listen(port, () => { console.log(`Server is running: ${port}`) })
  } catch (error) {
    console.log(error)
  }
}
runDatabase()

