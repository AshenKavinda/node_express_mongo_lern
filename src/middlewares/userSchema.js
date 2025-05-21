import joi from "joi";

const passwordComplexity = joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages(
        {
            'string.pattern.base': 'Password must contain at least one lowercase, uppercase, number, and special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 30 characters'
        }
    );


export const publicCreateUserSchema = joi.object({
    name: joi.string().required().min(2).max(50).trim().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
    }),
    email: joi.string().email().required().trim().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required'
    }),
    password: passwordComplexity,
    age: joi.number()
      .integer()
      .min(18)
      .max(120)
      .messages({
        'number.min': 'You must be at least 18 years old',
        'number.max': 'Please enter a valid age'
    })
});

export const privateCreateUserSchema = joi.object({
    name: joi.string().required().min(2).max(50).trim().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
    }),
    email: joi.string().email().required().trim().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required'
    }),
    password: passwordComplexity,
    age: joi.number()
      .integer()
      .min(18)
      .max(120)
      .messages({
        'number.min': 'You must be at least 18 years old',
        'number.max': 'Please enter a valid age'
    }),
    role: joi.string().required().valid('user','admin')
});

export const updateUserSchema = joi.object({
    name: joi.string()
      .min(2)
      .max(50),
    
    age: joi.number()
      .integer()
      .min(18)
      .max(120)

}).min(1);

export const loginSchema = joi.object({
    email: joi.string().required().email().trim(),
    password: passwordComplexity
});