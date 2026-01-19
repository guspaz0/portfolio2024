import 'reflect-metadata';
import { reactive, toRefs } from 'vue';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Generic form validator composable using class-validator
 * @param formData - reactive form object
 * @param dtoClass - class-validator DTO class
 */
export function useFormValidator<T extends object>(formData: T, dtoClass: new () => T) {
  const errors = reactive<{ [K in keyof T]?: string }>({});

  /**
   * Runs validation and updates the errors object
   * @returns boolean - true if valid, false otherwise
   */
  const validateForm = async (): Promise<boolean> => {
    // Clear previous errors
    Object.keys(errors).forEach(key => delete errors[key as keyof T]);

    // Convert plain object to DTO instance
    const instance = plainToInstance(dtoClass, formData);

    // Run validation
    const validationErrors = await validate(instance);

    if (validationErrors.length > 0) {
      validationErrors.forEach(err => {
        if (err.constraints) {
          errors[err.property as keyof T] = Object.values(err.constraints)[0];
        }
      });
      return false;
    }
    return true;
  };

  return {
    ...toRefs(errors),
    errors,
    validateForm
  };
}