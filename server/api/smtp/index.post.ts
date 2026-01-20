import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"
import { MailRequestDto } from "~/server/entities/email/mailRequestDto"
import emailService from "~/server/entities/email/email.service"

export default defineEventHandler(async (event) => {
    try {
        // Inicializar el servicio de email antes de usarlo
        await emailService.init()

        const body = await readBody(event)
        
        const dto = plainToInstance(MailRequestDto, body)
        const errors = validateSync(dto)
        if (errors.length > 0) return createError({ statusCode: 400, message: 'Validation failed' })

        const message = await emailService.sendEmail(dto);
        if (message.response) {
            return message.response
        }
    } catch (e) {
        console.error(e.message)
        return createError({ 
            statusCode: 500, 
            message: import.meta.dev ? JSON.stringify(e.message) : 'Internal server'
        })
    }
})