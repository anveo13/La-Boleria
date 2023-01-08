import connection from "../database/db.js"

export async function postCakes(req, res) {
    const { name, price, description, image } = req.body

    try {
        const findName = await connection.query(`SELECT name FROM cake WHERE name=$1`, [name]);
        if (findName.rowCount) return res.status(409).send("Bolo já cadastrado")
        
        await connection.query(`INSERT INTO cake (name, price, description, image) VALUES ($1, $2, $3, $4)`, [name, price, description, image]);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)

    }
};
