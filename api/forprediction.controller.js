import ForPredictionDAO from "../dao/forpredictionDAO.js"

export default class ForPredictionController {
  static async apiGetStocks(req, res, next) {
    const stocksPerPage = req.query.stocksPerPage ? parseInt(req.query.stocksPerPage, 300) : 100
    const page = req.query.page ? parseInt(req.query.page, 300) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { stocksList, totalNumStocks } = await ForPredictionDAO.getForPrediction({
      filters,
      page,
      stocksPerPage,
    })

    let response = {
      stocks: stocksList,
      page: page,
      filters: filters,
      entries_per_page: stocksPerPage,
      total_results: totalNumStocks,
    }
    res.json(response)
  }
}