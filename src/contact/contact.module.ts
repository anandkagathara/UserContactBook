import { Module } from '@nestjs/common';
import { ContactsService } from './contact.service';
import { ContactsController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mobile, Email } from './entities/contact.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Mobile])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactModule {}
