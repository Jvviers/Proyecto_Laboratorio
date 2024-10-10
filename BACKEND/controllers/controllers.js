import Queries from '../queries/queries.js';
import db from '../db.js';

const getUsers = async (req, res) => {
    const [users] = await db.query(Queries.getUsers);
    res.json(users);
}

export default {
    getUsers
}