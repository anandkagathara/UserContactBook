import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Mobile, Email } from './entities/contact.entity';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from './entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Mobile)
    private contactRepository: Repository<Mobile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<any> {
    const { name, email, phone } = createContactDto;
    const user = await this.userRepository.save({ name: name });
    const existingEmails = await this.emailRepository.find({
      where: { email: In(email) },
    });
    if (existingEmails.length > 0) {
      throw new Error('One or more emails already exist');
    }
    const emails = email.map((el) => ({ user_id: user.id, email: el }));
    console.log('emails', emails);
    await this.emailRepository.save(emails);

    const existingPhones = await this.contactRepository.find({
      where: { phone_number: In(phone) },
    });
    if (existingPhones.length > 0) {
      throw new Error('One or more phone numbers already exist');
    }
    const phones = phone.map((el) => ({
      id: 74,
      user_id: user.id,
      phone_number: el,
    }));

    await this.contactRepository.save(phones);

    return user;
  }

  async getContacts(): Promise<User[]> {
    return this.userRepository.find({ relations: ['phone', 'email'] });
  }

  async getContactsList(searchQuery: string): Promise<User[]> {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.phone', 'phone')
        .leftJoinAndSelect('user.email', 'email')
        .where('user.name like :searchQuery', {
          searchQuery: `%${searchQuery}%`,
        })
        .orWhere('phone.phone_number like :searchQuery', {
          searchQuery: `%${searchQuery}%`,
        })
        .orWhere('email.email like :searchQuery', {
          searchQuery: `%${searchQuery}%`,
        });

      const users = await queryBuilder.getMany();
      return users;
    } catch (error) {
      throw new Error(`Failed to retrieve contacts. ${error.message}`);
    }
  }

  async getContactById(id: number): Promise<any> {
    let contacts = await this.getContacts();
    let contact = (await contacts).filter((contact) => contact.id == id);

    return contact;
  }

  async updateContact(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<any> {
    const { name, email, phone } = updateContactDto;

    id = Number(id);
    let contacts = await this.getContacts();
    let contact = contacts.filter((contact) => contact.id == id)[0];

    if (name) {
      contact.name = name;
      await this.userRepository.save(contact);
    }
    if (email) {
      await this.emailRepository.delete({ user_id: id });

      const existingEmails = await this.emailRepository.find({
        where: { email: In(email) },
      });
      if (existingEmails.length > 0) {
        throw new Error('emails already exist');
      }
      const emails = email.map((el) => ({ user_id: id, email: el }));
      await this.emailRepository.save(emails);
    }

    if (phone) {
      await this.contactRepository.delete({ user_id: id });
      const existingPhones = await this.contactRepository.find({
        where: { phone_number: In(phone) },
      });
      if (existingPhones.length > 0) {
        throw new Error('One or more phone numbers already exist');
      }
      const phones = phone.map((el) => ({
        user_id: id,
        phone_number: el,
      }));
      await this.contactRepository.save(phones);
    }
    return contact;
  }

  async deleteContact(id: number): Promise<void> {
    const contact = await this.contactRepository.find({ where: { id: id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.emailRepository.delete({ user_id: id });
    await this.contactRepository.delete({ user_id: id });
    await this.userRepository.delete(id);
  }
}
