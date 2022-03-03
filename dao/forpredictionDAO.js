import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let stocks

export default class ForPredictionDAO {
  static async injectDB(conn) {
    if (stocks) {
      return
    }
    try {
      stocks = await conn.db(process.env.TRADINGVISION_NS).collection("ForPrediction")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in forpredictedDAO: ${e}`,
      )
    }
  }

  static async getForPrediction({
    filters = null,
    page = 0,
    stocksPerPage = 300,
  } = {}) {
    let query
    if (filters) {
      if ("Ticker" in filters) {
        query = { $text: { $search: filters["Ticker"] } }
      }
      // } else if ("cuisine" in filters) {
      //   query = { "cuisine": { $eq: filters["cuisine"] } }
      // } else if ("zipcode" in filters) {
      //   query = { "address.zipcode": { $eq: filters["zipcode"] } }
      // }
    }

    let cursor

    try {
      cursor = await stocks
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { stocksList: [], totalNumStocks: 0 }
    }

    const displayCursor = cursor.limit(stocksPerPage).skip(stocksPerPage * page)

    try {
      const stocksList = await displayCursor.toArray()
      const totalNumStocks = await stocks.countDocuments(query)

      return { stocksList, totalNumStocks }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { stocksList: [], totalNumStocks: 0 }
    }
  }

}