const express = require('express')
const Chance = require('chance');
const app = express()



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


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})