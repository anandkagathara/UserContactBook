import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';



export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  
  @IsEmail({}, { each: true })
  email: string[];

  @IsNotEmpty()
  @IsPhoneNumber(undefined, { each: true })
  phone: string[];
}


export class UpdateContactDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string[];

  @IsOptional()
  @IsPhoneNumber()
  phone?: string[];
}
