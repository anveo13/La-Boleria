import clientSchema from "../schemas/clientsSchemas.js";


export default function clientsMiddleware(req, res, next) {
    const { name, phone, adress } = req.body
    const validation = clientSchema.validate(req.body)
    if (validation.error) return res.status(400).send("O campo 'nome' e 'endereço' não podem estar vazios");


    if (isNaN(phone)) return res.status(400).send("Preencha o campo telefone, use somente numeros.");
    if (phone.length < 10 || phone.length > 11) return res.status(400).send("Digite um numero valido, com 11 ou 10 digitos");


    next();
}