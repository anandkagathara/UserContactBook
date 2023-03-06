import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  Max
} from 'class-validator';



export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()

  @IsEmail({}, { each: true })
  email: string[];

  @IsNotEmpty()
  @Max(10)
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
