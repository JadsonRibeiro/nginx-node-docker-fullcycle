const mysql = require('mysql')
const express = require('express')
const app = express()

const PORT = 3000

const db_config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

app.get('/', (req, res) => {
    const connection = mysql.createConnection(db_config)
    connection.query('SELECT * FROM `people`', '', function(err, results) {
        if(err) {
            console.log('Erro', err)
            return res.send('Erro')
        }
        let resultsString = ''
        for (let index = 0; index < results.length; index++) {
            const result = results[index];
            resultsString = `${result.name}, ${resultsString} `
        }
        return res.send('<h1>Full Cycle Rocks!</h1> <br />- Lista de nomes cadastrados no banco de dados <br />' + resultsString)
    })
})

app.get('/insert', (req, res) => {
    const connection = mysql.createConnection(db_config)
    const sql = `INSERT INTO people(name) values('Jadson')`
    connection.query(sql)
    connection.end()
    return res.send('Row inserted')
})

app.listen(PORT, () => {
    const connection = mysql.createConnection(db_config)
    connection.query('CREATE TABLE IF NOT EXISTS people (name VARCHAR(255))', '', function(err, results) {
        if(err) {
            console.log('Erro', err)
        }
        console.log(`App listening on port ${PORT}`)
    })
})