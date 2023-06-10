import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
 
const jwtSecret = process.env.jwt;
const Jwt = {
    Sign : (payload )=>{
         return JWT.sign({user_id : payload}, jwtSecret)
    },
    Verify : (token)=>{
        return JWT.verify(token, jwtSecret)
    }
}


export default Jwt;  