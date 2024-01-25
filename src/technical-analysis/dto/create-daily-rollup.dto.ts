import { IsString, Length, IsDateString } from 'class-validator';

export class CreateDailyRollupDto {
  @IsDateString()
  readonly date: string;

  @IsString()
  @Length(3, 5) // Example: Symbol length validation
  readonly symbol: string;
}
