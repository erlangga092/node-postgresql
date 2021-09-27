import { pool } from "../database/index.mjs";

export const getProducts = (req, res, next) => {
  pool.query(`SELECT * FROM products ORDER BY id ASC`, (error, results) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }
    return res.status(200).send({
      success: true,
      data: results.rows,
      error: 0,
    });
  });
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  pool.query(`SELECT * FROM products WHERE id = $1`, [id], (error, results) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }

    if (results.rowCount < 1) {
      return res.status(200).send({
        success: true,
        data: {
          message: `ID product not found!`,
        },
        error: 0,
      });
    }

    return res.status(200).send({
      success: true,
      data: results.rows,
      error: 0,
    });
  });
};

export const createProduct = (req, res) => {
  const { name, description, price, image_url } = req.body;
  const Query = `INSERT INTO products (name, description, price, image_url) values ($1, $2, $3, $4)`;

  if (req.file) {
    console.log(file);
  }

  pool.query(Query, [name, description, price, image_url], (error, results) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }

    if (results.rowCount > 0) {
      return res.status(201).send({
        success: true,
        data: {
          message: `Product Created Successfully`,
        },
        error: 0,
      });
    }
  });
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);

  pool.query(`DELETE FROM products WHERE id = $1`, [id], (error, results) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }

    if (results.rowCount > 0) {
      return res.status(200).send({
        success: true,
        data: {
          message: `Product Deleted Successfully`,
        },
        error: 0,
      });
    }
  });
};
