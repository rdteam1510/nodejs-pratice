import CompaniesDAO from "../dao/companiesDAO.js"

export default class CompaniesController {
  static async apiGetCompanies(req, res, next) {
    const companiesPerPage = req.query.companiesPerPage ? parseInt(req.query.companiesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { companiesList, totalNumCompanies } = await CompaniesDAO.getCompanies({
      filters,
      page,
      companiesPerPage,
    })

    let response = {
      companies: companiesList,
      page: page,
      filters: filters,
      entries_per_page: companiesPerPage,
      total_results: totalNumCompanies,
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