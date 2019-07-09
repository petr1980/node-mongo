const router = require('express').Router();
const Habit = require('../models/habit')


router.get('/', async (req, res) => {
  const data = await Wishlist.fetch()
  res.render('wishlist', {
    title: 'My habits wishlist',
    idWishlist: true,
    data: data.list
  })
})

router.post('/add', async (req, res) => {
  const one = await Habit.getById(req.body.id)
  await req.user.addToCart(one)

  return res.redirect('/')
})

router.delete('/remove/:id', async (req, res) => {
  const wish = await Wishlist.remove(req.params.id)
  res.status(200).json(wish)
})


module.exports = router