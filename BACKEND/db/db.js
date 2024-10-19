import mysql from 'mysql2/promise';
import data from '../credentials.js';

const db = mysql.createPool(data);

export default db;