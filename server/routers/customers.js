const router = require("express").Router();
const ControllerCustomer = require("../controllers/controllerCustomer");
const { authentication } = require("../middelware/auth");

router.post("/register", ControllerCustomer.registerCustomer);
router.post("/login", ControllerCustomer.loginCustomer);
router.post("/login-google", ControllerCustomer.loginGoogle);
router.get("/movie", ControllerCustomer.getMovie);
router.get("/movie/:id", ControllerCustomer.getMovieId);
router.post("/payment", ControllerCustomer.payment);
router.use(authentication);
router.get("/one-customer", ControllerCustomer.getOneCustomer);
router.post("/booking/:id", ControllerCustomer.addBooking);
router.get("/booking", ControllerCustomer.getBooking);

module.exports = router;
