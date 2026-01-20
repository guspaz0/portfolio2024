import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CustomValidationError } from '~/server/exceptions/CustomValidationError';
import { LoginRequestDto } from '~/server/utils/loginRequestDto';

export default defineEventHandler(async (event: any) => {

    try {
        const body = await readBody<Record<keyof LoginRequestDto, string>>(event);
        const dto = plainToInstance(LoginRequestDto, body);
        const errors = validateSync(dto)
        if (errors.length > 0) throw new CustomValidationError(errors)
        // Simulate a database check
        const user = {
            email: process.env.ADMIN,
            password: process.env.PASS
        };
        if (dto.email === user.email && dto.password === user.password) {
            await setUserSession(event, {
                user: {
                    email: dto.email,
                    name: dto.email
                },
                lastLoggedIn: new Date()
            })
            return { success: true };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error: any) {
        throw createError({ statusCode: 401, message: error.message })
    }
})