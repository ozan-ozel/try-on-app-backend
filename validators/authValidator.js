import Joi from "joi";

// Define the schema for passCode validation
const passCodeSchema = Joi.object({
  passCode: Joi.string()
    .pattern(/^[A-Za-z0-9]{6,20}$/) // Passcode must be alphanumeric and 6-20 characters long
    .required()
    .messages({
      "string.empty": "Passcode is required.",
      "string.pattern.base":
        "Passcode must be alphanumeric and between 6 to 20 characters.",
    }),
});

// Middleware for validating passCode
const validatePassCode = (req, res, next) => {
  const { error } = passCodeSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next(); // Proceed to the next middleware/controller if validation succeeds
};

export default { validatePassCode };
