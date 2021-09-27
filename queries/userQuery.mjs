import { pool } from "../database/index.mjs";

export const getUsers = (_req, res) => {
  pool.query(`SELECT * FROM users ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(results.rows);
  });
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  pool.query(`SELECT * FROM users WHERE id=$1`, [id], (error, results) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(results.rows);
  });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  const Query = `INSERT INTO users (name, email) VALUES ($1, $2)`;

  pool.query(Query, [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    return res.status(201).send(`User created with ID`);
  });
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const Query = `UPDATE users SET name = $1, email = $2 WHERE id = $3`;

  pool.query(Query, [name, email, id], (error, results) => {
    if (error) {
      throw error;
    }
    return res.status(201).send(`User modified with ID: ${id}`);
  });
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  pool.query(`DELETE FROM users WHERE id = $1`, [id], (error, _results) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(`User deleted with ID-${id}`);
  });
};
