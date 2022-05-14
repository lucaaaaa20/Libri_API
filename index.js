const express = require('express')
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const port = 3000
const host = "localhost"

let listaLibri = [
    {
        isbn: 1,
        autore: "Giovanni",
        titolo: "Libro 1"
    },
    {
        isbn: 2,
        autore: "alessio",
        titolo: "Libro 2"
    },
    {
        isbn: 3,
        autore: "Gigi",
        titolo: "Libro 3"
    },
]

app.listen(port, host, () => {
    console.log("Sono in ascolto! ")
})

//LISTA LIBRI
app.get("/libri/lista", (req, res) => {
    res.json(listaLibri)
})

//DETTAGLIO LIBRO
app.get("/libri/:isbn", (req, res) => {
    for (let [idx, item] of listaLibri.entries()) {
        if (item.isbn == req.params.isbn) {
            res.json(item)
        }
    }
    res.json({ status: "error: elemento non presente" })
})

//AGGIUNTA LIBRO
app.post("/libri/inserimento", (req, res) => {
    let libro = {
        isbn: req.body.isbn,
        autore: req.body.autore,
        titolo: req.body.titolo
    }
    let bool = false
    for (let [idx, item] of listaLibri.entries()) {
        if (req.body.isbn == item.isbn) {
            bool = true;
        }
    }
    if (bool == false){
        listaLibri.push(libro)
        res.json({ status: "success" })
    }
    else{
        res.json({ status: "errore: l'isbn inserito è già presente" })
    }
})

//MODIFICA LIBRO
app.put("/libri/:isbn", (req, res) => {
    for (let [idx, item] of listaLibri.entries()) {
        if (req.params.isbn == item.isbn) {
            item.isbn = req.body.isbn
            item.autore = req.body.autore
            item.titolo = req.body.titolo
            res.json({ status: "success" })
        }
    }
    res.json({ status: "errore: elemento non presente" })
})

//ELIMINA LIBRO
app.delete("/libri/elimina/:isbn", (req, res) => {
    for (let [idx, item] of listaLibri.entries()) {
        if (req.params.isbn == item.isbn) {
            listaLibri.splice(idx, 1)
            res.json({ status: "success" })
        }
    }
    res.json({ status: "error: elemento non presente" })
})










