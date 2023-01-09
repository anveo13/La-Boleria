import orderSchema from "../schemas/ordersSchemas.js";

export default function ordersMiddleware(req, res, next) {
    const { quantity } = req.body
    const validation = orderSchema.validate(req.body)
    if (validation.error) return res.sendStatus(400);

    if (quantity <= 0 || quantity > 5) return res.status(400).send("Digite um numero inteiro entre 1 e 5");
    if (!Number.isInteger(quantity)) return res.status(400).send("Digite um numero inteiro entre 1 e 5");

    next()
};