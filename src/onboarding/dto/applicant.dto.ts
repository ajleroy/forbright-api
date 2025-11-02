import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ApplicantDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly emailAddress: string;
}