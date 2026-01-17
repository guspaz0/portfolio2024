import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { CustomValidationError } from "../exceptions/CustomValidationError";

export function useParseFormData<T extends object>(dtoClass: new () => T, body: FormData) {
    let RequestBody: Record<string, any> = {};
    body.entries().forEach(([key,value]) => RequestBody[key] = value)
    
    const dto = plainToInstance(dtoClass, RequestBody)
    const errors = validateSync(dto)
    if (errors.length > 0) throw new CustomValidationError(errors)
    return {
        dto,
        errors
    }
}