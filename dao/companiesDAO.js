import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let companies

export default class CompaniesDAO {
  static async injectDB(conn) {
    if (companies) {
      return
    }
    try {
      companies = await conn.db(process.env.TRADINGVISION_NS).collection("CompanyInfo")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in companiesDAO: ${e}`,
      )
    }
  }

  static async getCompanies({
    filters = null,
    page = 0,
    companiesPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("CompanyName" in filters) {
        query = { $text: { $search: filters["CompanyName"] } }
      }
      // } else if ("cuisine" in filters) {
      //   query = { "cuisine": { $eq: filters["cuisine"] } }
      // } else if ("zipcode" in filters) {
      //   query = { "address.zipcode": { $eq: filters["zipcode"] } }
      // }
    }

    let cursor

    try {
      cursor = await companies
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { companiesList: [], totalNumCompanies: 0 }
    }

    const displayCursor = cursor.limit(companiesPerPage).skip(companiesPerPage * page)

    try {
      const companiesList = await displayCursor.toArray()
      const totalNumCompanies = await companies.countDocuments(query)

      return { companiesList, totalNumCompanies }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { companiesList: [], totalNumCompanies: 0 }
    }
  }
  static async getCompanyByTicker(ticker) {
    try {
      const pipeline = [
        {
            $match: {
              Ticker: ticker,
            },
        }
          ]
      return await companies.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getCompanyByTicker: ${e}`)
      throw e
    }
  }

  // static async getCuisines() {
  //   let cuisines = []
  //   try {
  //     cuisines = await restaurants.distinct("cuisine")
  //     return cuisines
  //   } catch (e) {
  //     console.error(`Unable to get cuisines, ${e}`)
  //     return cuisines
  //   }
  // }
}