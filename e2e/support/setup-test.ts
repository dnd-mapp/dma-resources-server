import { exec } from 'shelljs';

exec('npx prisma migrate reset -f');
exec('npx prisma db seed');
