import { DATABASE_URL } from '$env/static/private';
import {PrismaClient} from '@prisma/client/edge'


export const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } }
});