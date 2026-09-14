import { IsOptional, IsString } from 'class-validator';

export class UpdateSystemConfigDto {
  @IsOptional() @IsString() navbarTitle?: string;
  @IsOptional() @IsString() navbarImagePath?: string;
  @IsOptional() @IsString() adminTabName?: string;
  @IsOptional() @IsString() adminFaviconPath?: string;
  @IsOptional() @IsString() publicTabName?: string;
  @IsOptional() @IsString() publicFaviconPath?: string;
  @IsOptional() @IsString() defaultGroupPrefix?: string;
  @IsOptional() @IsString() publicTitle?: string;
  @IsOptional() @IsString() publicImagePath?: string;
}