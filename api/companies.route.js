import express from "express"
import CompaniesCtrl from "./companies.controller.js"
import StocksCtrl from "./stocks.controller.js"
// import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/companies").get(CompaniesCtrl.apiGetCompanies)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router.route("/stocks").get(StocksCtrl.apiGetStocks)
// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview)

export default router