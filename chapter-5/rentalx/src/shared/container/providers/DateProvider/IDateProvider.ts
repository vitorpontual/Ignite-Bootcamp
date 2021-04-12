interface IDateProvider {

  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(data: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  comppareIfBefore(start_date: Date, end_date: Date): boolean;


}

export { IDateProvider }
