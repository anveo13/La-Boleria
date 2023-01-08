import  cakesSchema  from "../schemas/cakesSchemas.js";
import  linkSchema  from "../schemas/linkSchema.js";

export function cakesMiddleware (req,res,next){
    const { name, price, description, image } = req.body;
    const validationLink = linkSchema.validate ({ image });
   
    if (validationLink.error) return res.status(422).send(validationLink.error)
    const validation = cakesSchema.validate({ name, price, description })
    if (validation.error) return res.status(400).send(validation.error)


    if (name.length <= 2) return res.sendStatus(400);
    if (price < 0) return res.sendStatus(400);

    next();
}