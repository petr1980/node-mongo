const router = require('express').Router()
const Habit = require('../models/habit')


router.get('/', async (req, res) => {
    // const habits = await Habit.find().populate('userId', 'email')   

    const habits = await Habit.find()

    res.render('list', {
        title: 'Habits list',
        isList: true,
        habits
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const info = await Habit.findById(id)
    res.render('habit-info', {
        layout: 'empty',
        title: `Habit:  ${info.title}`,
        info
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) return res.redirect('/')

    const id = req.params.id;
    const habit = await Habit.findById(id)
    res.render('edit', {
        title: `Edit:  ${habit.title}`,
        habit
    })
})

router.post('/edit', async (req, res) => {
    const { id, title, desc, img } = req.body;
    try {
        await Habit.findByIdAndUpdate(id, { title, desc, img })
        res.redirect('/habits')
    } catch (error) {
        console.log(error)

    }
})

router.post('/remove', async (req, res) => {
    try {
        await Habit.deleteOne({ _id: req.body.id })
        res.redirect('/habits')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router