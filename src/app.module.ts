import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';


import { Email, Mobile } from './contact/entities/contact.entity';
import { User } from './contact/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'user_contact_book',
      entities: [Mobile,Email,User],
      synchronize: false,
    }),
    ContactModule,
  ],
 

})
export class AppModule {}
