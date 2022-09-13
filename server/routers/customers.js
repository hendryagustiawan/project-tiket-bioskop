const router = require("express").Router();
const ControllerCustomer = require("../controllers/controllerCustomer");
const { authentication } = require("../middelware/auth");

router.post("/register", ControllerCustomer.registerCustomer);
router.post("/login", ControllerCustomer.loginCustomer);
router.post("/login-google", ControllerCustomer.loginGoogle);
router.get("/movie", ControllerCustomer.getMovie);
router.get("/movie/:id", ControllerCustomer.getMovieId);
router.use(authentication);
router.get("/one-customer", ControllerCustomer.getOneCustomer);

module.exports = router;
