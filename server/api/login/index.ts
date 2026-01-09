import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event: any) => {

    try {
        const { email, password } = await readBody(event);

        // Simulate a database check
        const user = {
            email: process.env.ADMIN,
            password: process.env.PASS
        };
        if (email === user.email && password === user.password) {
            const token = generateToken(email);
            setCookie(event, 'auth_token', token, { 
                maxAge: 60 * 60 * 24 * 2, // 2 days
                path: '/',
                httpOnly: true
            });
            return { success: true, token };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error: any) {
        console.log("Error /api/login server event : \n",error)
        throw new Error(error)
        //throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
    }
})

function generateToken(email: string): string {
    // Implement your token generation logic here
    return jwt.sign({ email }, process.env.JWT_KEY as string, {expiresIn: 60 * 60 * 12})
}