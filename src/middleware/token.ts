import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

function authenticateToken(req: CustomRequest, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return 
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    console.error(error);
  }
}

export { authenticateToken };
