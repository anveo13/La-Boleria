import joi from 'joi';

const cakesSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().allow("")
});

export default cakesSchema