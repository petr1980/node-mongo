const { model, Schema } = require('mongoose');

const habit = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Habit', habit)




// const uuid = require('uuid/v4')
// const fsPromises = require('fs').promises;
// const fs = require('fs')
// const path = require('path')

// class Habit {
//     constructor(title, desc, url) {
//         this.title = title
//         this.desc = desc
//         this.img = url
//         this.id = uuid()
//     }

//     async save() {
//         const dataFile = await Habit.readData()
//         const data = { title: this.title, desc: this.desc, img: this.img, id: this.id }
//         dataFile.push(data);

//         Habit.writeData(dataFile)
//     }

//     static readData() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(path.join(__dirname, '..', 'data', 'habits.json'), 'utf-8', (err, content) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(JSON.parse(content))
//                 }
//             })
//         })
//     }

//     static writeData(data) {
//         try {
//             return fsPromises.writeFile(path.join(__dirname, '..', 'data', 'habits.json'), JSON.stringify(data));
//         } catch (error) {
//             console.log(error)
//             return
//         }
//     }

//     static async update(habit) {
//         const dataFile = await Habit.readData();
//         const idx = dataFile.findIndex(item => item.id === habit.id)
//         dataFile[idx] = habit

//         Habit.writeData(dataFile)
//     }

//     static async getOne(id) {
//         const one = await Habit.readData()
//         return one.find(item => item.id === id);
//     }



// }

// module.exports = Habit