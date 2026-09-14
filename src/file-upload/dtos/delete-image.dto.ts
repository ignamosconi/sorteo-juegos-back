import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class DeleteImageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\/uploads\//, { message: 'El path debe iniciar con /uploads/' })
  path!: string;
}