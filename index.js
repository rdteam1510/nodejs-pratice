import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import CompaniesDAO from "./dao/companiesDAO.js"
import StocksDAO from "./dao/stocksDAO.js"
import ForPredictionDAO from "./dao/forpredictionDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.TRADINGVISION_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true}
    )
    .catch(err => {
        console.log(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ForPredictionDAO.injectDB(client)
        await StocksDAO.injectDB(client)
        await CompaniesDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })