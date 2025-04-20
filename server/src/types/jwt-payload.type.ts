import { JwtPayload as Payload } from 'jsonwebtoken';

type JwtPayload = {
    _id: string;
    role: string;
} & Payload;

export default JwtPayload;
