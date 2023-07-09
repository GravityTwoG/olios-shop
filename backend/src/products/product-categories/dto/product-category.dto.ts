import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IsNullable } from 'src/common/validators/IsNullable';

export class ProductCategoryDTO {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  iconUrl: string;

  @IsNumber()
  @IsNullable()
  @ApiProperty()
  parentId: number | null;

  @IsNumber({}, { each: true })
  @ApiProperty()
  children: number[];
}
