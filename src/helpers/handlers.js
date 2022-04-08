import { check, validationResult } from "express-validator";

export const handleError = (error, res) => {
  res.status(500).json({
    message: "An error ocurred",
    error: error.toString(),
  });
};

export const handleValidationResult = (req, res) => {
  const request = validationResult(req);
  if (!request.isEmpty()) return res.status(422).json(request);
};
