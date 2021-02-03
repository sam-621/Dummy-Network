import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IPayload } from 'src/user/interfaces';
import { argon2i, verify } from 'argon2';

@Injectable()
export class AuthService {
	signToken(payload: IPayload) {
		const token: string = jwt.sign(payload, 'jwt-secret', { expiresIn: '3h' });

		return token;
	}

	verifyToken(token: string) {
		const decoded = jwt.verify(token, 'jwt secret');

		return decoded;
	}

	async verifyPassword(hashPass: string, plainPass: string): Promise<boolean> {
		const match: boolean = await verify(hashPass, plainPass, { type: argon2i });

		return match;
	}
}
