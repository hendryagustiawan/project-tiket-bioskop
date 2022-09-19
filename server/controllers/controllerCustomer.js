const { OAuth2Client } = require("google-auth-library");
const { checkPassword } = require("../helpers/bcrypt");
const { encodeData } = require("../helpers/jwt");
const { User, Movie } = require("../models");
const { Op } = require("sequelize");

class ControllerCustomer {
  static async registerCustomer(req, res, next) {
    const { username, password, email, phoneNumber } = req.body;

    const checkEmail = await User.findOne({
      where: { email },
    });
    if (checkEmail) {
      next({ name: "Email already" });
    } else {
      try {
        const customer = await User.create({ username, password, role: "customer", email, password, phoneNumber });

        res.status(200).json({ id: customer.id, username: customer.username, email: customer.email, role: customer.role, phoneNumber: customer.phoneNumber });
      } catch (error) {
        next(error);
      }
    }
  }

  static async loginCustomer(req, res, next) {
    const { email, password } = req.body;

    if (!email && !password) next({ name: "password and email required" });
    if (!email) next({ name: "emailRequired" });
    if (!password) next({ name: "passwordRequired" });
    if (email && password) {
      try {
        const customer = await User.findOne({ where: { email } });
        const check = checkPassword(password, customer.password);

        if (customer && check) {
          const access_token = encodeData({
            id: customer.id,
            email: customer.email,
            role: customer.role,
          });
          res.status(200).json({ access_token });
        } else {
          next({ name: "invalidUser" });
        }
      } catch (error) {
        next(error);
      }
    }
  }

  static async loginGoogle(req, res, next) {
    const token = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let payload;

    client
      .verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      })
      .then((tiket) => {
        payload = tiket.getPayload();

        return User.findOne({
          where: { email: payload.email },
        });
      })
      .then((customer) => {
        if (!customer) {
          return User.create(
            {
              username: payload.name,
              email: payload.email,
              password: "qwerty",
              role: "customer",
              phoneNumber: "62576899879",
            },
            { hooks: false }
          );
        } else {
          return customer;
        }
      })
      .then((data) => {
        const access_token = encodeData({
          id: data.id,
          email: data.email,
          role: data.role,
        });
        res.status(200).json({ access_token });
      })
      .catch((error) => {
        next(error);
      });
  }

  static async getOneCustomer(req, res, next) {
    const id = req.userData.id;
    try {
      const customer = await User.findOne({ where: { id }, attributes: { exclude: ["createdAt", "updatedAt", "password"] } });

      if (!customer) next({ name: "notFound" });
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async getMovie(req, res, next) {
    let { title, page } = req.query;
    try {
      // pagination
      let option = { attributes: { exclude: ["createdAt", "updatedAt"] }, include: ["Production"] };
      if (page) {
        (option.limit = 4), (option.offset = option.limit * page - option.limit);
      }
      // filer by title
      let conditional = {};
      if (title) {
        conditional.title = {
          [Op.iLike]: `%${title}%`,
        };
      }

      option.where = conditional;
      const { count, rows } = await Movie.findAndCountAll(option);

      res.status(200).json({
        totalData: count,
        totalPage: Math.ceil(count / 8),
        rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMovieId(req, res, next) {
    const { id } = req.params;

    try {
      const movie = await Movie.findOne({ where: { id }, attributes: { exclude: ["createdAt", "updatedAt"] }, include: ["Production"] });

      if (!movie) next({ name: "notFound" });

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerCustomer;
