import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ensureAuthority = (req, res) => {
  try {
    let receivedJwt = req.headers["authorization"];

    if (receivedJwt){
        let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
        return decodedJwt;
    } else {
        throw new ReferenceError("jwt must be provided")
    }
    
  } catch (error) {
    return error;
  }
};

export default ensureAuthority;