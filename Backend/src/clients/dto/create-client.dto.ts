import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Acme Corp', description: 'Name of the client company or person' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'contact@acme.com', description: 'Contact email of the client' })
  @IsEmail()
  email: string;
}
