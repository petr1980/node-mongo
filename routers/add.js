const router = require('express').Router()
const Habit = require('../models/habit')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add habit',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    try {
        const habit = new Habit({
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            userId: req.user
            // userId: req.user можно так            
        })
        await habit.save()

        return res.redirect('/habits')
    } catch (error) {
        console.log(error)
    }

    // return res.status(200)


    // return res.send({ data: JSON.stringify(req.body) });
})


module.exports = router