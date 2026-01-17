import { ValidationError } from "class-validator";

export class CustomValidationError extends Error {

    constructor(message: ValidationError[]) {
        super(JSON.stringify(message))
    }
}