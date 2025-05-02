import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ['error']
}); 


export default db; 