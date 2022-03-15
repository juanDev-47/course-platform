import { PrismaClient } from '@prisma/client';

declare global {
<<<<<<< HEAD
    var prismaGlobal: PrismaClient
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if(!global.prismaGlobal) {
        global.prismaGlobal = new PrismaClient();
    }
    prisma = global.prismaGlobal;
}

=======
  var prismaGlobal: PrismaClient;
}

let prisma: PrismaClient;
// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}
>>>>>>> main
export default prisma;