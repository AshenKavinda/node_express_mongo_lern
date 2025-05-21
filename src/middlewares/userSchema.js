import joi from "joi";

export const createUserSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    age: joi.number().min(18).required()
});

export const updateUserSchema = joi.object({
    name: joi.string().trim(),
    email: joi.string().email().trim(),
    age: joi.number().min(18)
});