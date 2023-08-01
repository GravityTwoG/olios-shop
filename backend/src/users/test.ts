import { plainToInstance } from 'class-transformer';
import { IsEmail, validate } from 'class-validator';

class TestDTO {
  @IsEmail()
  email: string;
}

const user = { email: 'test' };

const instance = plainToInstance(TestDTO, user);

console.log(instance);

validate(instance).then(console.log);
