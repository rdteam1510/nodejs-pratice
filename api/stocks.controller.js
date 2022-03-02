import StocksDAO from "../dao/stocksDAO.js"

export default class StocksController {
  static async apiGetStocks(req, res, next) {
    const stocksPerPage = req.query.stocksPerPage ? parseInt(req.query.stocksPerPage, 100) : 200
    const page = req.query.page ? parseInt(req.query.page, 100) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { stocksList, totalNumStocks } = await StocksDAO.getStocks({
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
  // static async apiGetRestaurantById(req, res, next) {
  //   try {
  //     let id = req.params.id || {}
  //     let restaurant = await RestaurantsDAO.getRestaurantByID(id)
  //     if (!restaurant) {
  //       res.status(404).json({ error: "Not found" })
  //       return
  //     }
  //     res.json(restaurant)
  //   } catch (e) {
  //     console.log(`api, ${e}`)
  //     res.status(500).json({ error: e })
  //   }
  // }

  // static async apiGetRestaurantCuisines(req, res, next) {
  //   try {
  //     let cuisines = await RestaurantsDAO.getCuisines()
  //     res.json(cuisines)
  //   } catch (e) {
  //     console.log(`api, ${e}`)
  //     res.status(500).json({ error: e })
  //   }
  // }
}