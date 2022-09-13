const router = require("express").Router();
const routerUser = require("./user");
const routerMovie = require("./movie");
const routerNews = require("./news");
const routerPromotion = require("./promotion");
const routerCustomer = require("./customers");

router.use("/user", routerUser);
router.use("/customers", routerCustomer);
router.use("/movie", routerMovie);
router.use("/news", routerNews);
router.use("/promotion", routerPromotion);

module.exports = router;
