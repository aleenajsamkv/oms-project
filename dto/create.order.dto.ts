import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create.orderitem.dto";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}