import cakesSchema from "../schemas/cakesSchemas.js";
import linkSchema from "../schemas/linkSchema.js";

export function cakesMiddleware(req, res, next) {
    const { name, price, description, image } = req.body;
    const validationLink = linkSchema.validate({ image });
    if (validationLink.error) return res.status(422).send("Coloque uma imagem valida")

    const validation = cakesSchema.validate({ name, price, description })
    if (validation.error) return res.status(400).send("Coloque uma descrição valida")


    if (name.length <= 2) return res.status(400).send("Minimo 2 caracteres para o nome");
    if (price <= 0) return res.status(400).send("Preço não pode ser menor ou igual a 0");

    next();
}