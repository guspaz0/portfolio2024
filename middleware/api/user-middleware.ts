// server/middleware/user-middleware.ts
import { getCookie } from 'h3';
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    console.log('middleware server/user-middleware.ts')
    
    const auth_token = getCookie(event, 'auth_token');

    const key = process.env.JWT_KEY
    if (!key) throw new Error('server error: authentication key not found')
    
    const blackList = ['certificados', 'aptitudes', ]
    if (blackList.some(path => event.path.includes(`/api/${path}`))) {
        if (auth_token) {
            jwt.verify(auth_token, key, (err, data) => {
                if (!err) {
                    event.context.auth = auth_token;
                } else {
                    sendRedirect(event, '/login', 401)
                }
            })
        }
    }
});
