import connection from "../database/db.js"
import dayjs from "dayjs";

export async function postOrders(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body
    const createdAt = dayjs().format("YYYY-MM-DD");
    try {
        const findClient = await connection.query(`SELECT * FROM clients WHERE id=$1`, [clientId]);
        if (findClient.rowCount === 0) return res.status(404).send("Não achamos você em nosso, sistema. Por favor refaça o cadastro");
        const findCake = await connection.query(`SELECT * FROM cake WHERE id=$1`, [cakeId])
        if (findCake.rowCount === 0) return res.status(404).send("Não encontramos esse bolo, por favor escolha outro.")

        await connection.query(`
        INSERT INTO orders 
            ("clientId", "cakeId", quantity,  "createdAt", "totalPrice")
        VALUES
            ($1, $2, $3, $4, $5)`,
            [clientId, cakeId, quantity, createdAt, totalPrice])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getOrders(req, res) {
    const date = req.query.date
    try {
        if (!date) {
            const { rows: orders } = await connection.query({
                text: `
                SELECT 
                    c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                    ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                    o.id AS "orderId", o."createdAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice"
                FROM
                    orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cake ca ON ca.id = o."cakeId"`
                , rowMode: "array"
            });
            if (orders.rowCount === 0) return res.status(404).send([])
            res.send(
                orders.map((row) => {
                    const [
                        clientId,
                        clientName,
                        clientAddress,
                        clientPhone,
                        cakeId,
                        cakeName,
                        cakePrice,
                        cakeDescription,
                        cakeImage,
                        orderId,
                        createdAt,
                        orderQuantity,
                        orderTotalPrice
                    ] = row

                    return {
                        client: {
                            id: clientId,
                            name: clientName,
                            address: clientAddress,
                            phone: clientPhone
                        },
                        cake: {
                            id: cakeId,
                            name: cakeName,
                            price: cakePrice,
                            description: cakeDescription,
                            image: cakeImage
                        },
                        orderId: orderId,
                        createdAt: createdAt,
                        quantity: orderQuantity,
                        totalPrice: orderTotalPrice
                    }
                })
            )
        } else {
            const orders = await connection.query({
                text: `
                SELECT 
                c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                o.id AS "orderId", o."createdAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice"
                FROM
                orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cake ca ON ca.id = o."cakeId"
                WHERE o."createdAt" = $1`

                , rowMode: "array"
            }, [date]);
            if (orders.rowCount === 0) return res.status(404).send([])
            res.send(
                orders.rows.map((row) => {
                    const [
                        clientId,
                        clientName,
                        clientAddress,
                        clientPhone,
                        cakeId,
                        cakeName,
                        cakePrice,
                        cakeDescription,
                        cakeImage,
                        orderId,
                        createdAt,
                        orderQuantity,
                        orderTotalPrice
                    ] = row

                    return {
                        client: {
                            id: clientId,
                            name: clientName,
                            address: clientAddress,
                            phone: clientPhone
                        },
                        cake: {
                            id: cakeId,
                            name: cakeName,
                            price: cakePrice,
                            description: cakeDescription,
                            image: cakeImage
                        },
                        orderId: orderId,
                        createdAt: createdAt,
                        quantity: orderQuantity,
                        totalPrice: orderTotalPrice
                    }
                })
            )
        }


    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}


export async function getOrderById(req, res) {
    const { id } = req.params

    try {
        if (id <= 0 || id % 1 != 0) return res.sendStatus(400)
        const findId = await connection.query(` SELECT id FROM orders WHERE id=$1`, [id])
        if (findId.rowCount === 0) return res.status(404).send("Id não existente, informe outro")
        const { rows: orders } = await connection.query({
            text: `
                SELECT 
                c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
                ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
                o.id AS "orderId", o."createdAt" AS createdAt, o.quantity AS "orderQuantity", o."totalPrice" AS "orderTotalPrice"
                FROM
                orders o
                JOIN clients c ON c.id = o."clientId"
                JOIN cake ca ON ca.id = o."cakeId"
                WHERE o.id = ${id}`

            , rowMode: "array"
        });
        res.send(
            orders.map((row) => {
                const [
                    clientId,
                    clientName,
                    clientAddress,
                    clientPhone,
                    cakeId,
                    cakeName,
                    cakePrice,
                    cakeDescription,
                    cakeImage,
                    orderId,
                    createdAt,
                    orderQuantity,
                    orderTotalPrice
                ] = row

                return {
                    client: {
                        id: clientId,
                        name: clientName,
                        address: clientAddress,
                        phone: clientPhone
                    },
                    cake: {
                        id: cakeId,
                        name: cakeName,
                        price: cakePrice,
                        description: cakeDescription,
                        image: cakeImage
                    },
                    orderId: orderId,
                    createdAt: createdAt,
                    quantity: orderQuantity,
                    totalPrice: orderTotalPrice
                }
            })
        )
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }

}