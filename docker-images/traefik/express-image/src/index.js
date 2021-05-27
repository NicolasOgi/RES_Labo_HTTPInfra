const express = require('express')
const Chance = require('chance');
const app = express()
const { v4: uuidv4 } = require('uuid');


const uid = uuidv4();

function generateAnimalList(){
    const chance = new Chance();
    const number = chance.integer({
        min: 1,
        max: 12
    })
    let output = [];
    for (let i = 0; i < number; i++) {
        output.push({
            type: chance.animal(),
            country : chance.country({full: true}),
            price : chance.dollar()
        })
    }
    return output;
}

app.get('/', (req, res) => {
    res.send(generateAnimalList())
})

app.use('*', (req, res, next) => {
    res.status(404).send(uid);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
