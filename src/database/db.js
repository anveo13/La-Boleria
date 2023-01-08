import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection

/* http://localhost:4000/cakes

{
    "name": "Bolo de pote",
    "price": 13.00,
"image":"encurtador.com.br/iDIX0",
    "description": "Bolo de chocolate com recheio de leite ninho"
} */