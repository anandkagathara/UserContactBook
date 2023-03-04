import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dto/create-contact.dto';
import { User } from './entities/user.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post('/create')
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const contact = await this.contactsService.createContact(
        createContactDto,
      );
      return {
        status: 201,
        message: 'Contact created successfully',
        data: contact,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/list')
  async getContactsList(@Query('searchQuery') searchQuery: string) {
    try {
      const contact = await this.contactsService.getContactsList(searchQuery);
      return { message: 'Contact list fatch successfully', data: contact };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  async getContactById(@Param('id') id: number): Promise<any> {
    const contact = await this.contactsService.getContactById(id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return { status: 200, data: contact };
  }

  @Put('/:id')
  async updateContact(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<any> {
    try {
      const contact = await this.contactsService.updateContact(
        id,
        updateContactDto,
      );
      return {
        status: 200,
        message: 'Contact updated successfully',
        data: contact,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/delete/:id')
  async deleteContact(@Param('id') id: number): Promise<any> {
    const contact = await this.contactsService.deleteContact(id);

    return {
      status: 200,
      message: 'Contact deleted successfully',
      data: contact,
    };
  }
}
