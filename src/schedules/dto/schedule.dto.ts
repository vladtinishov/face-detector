export class CreateScheduleDto {
  roomId: number;
  startDateTime: Date;
  endDateTime: Date;
}

export class UpdateScheduleDto {
  roomId: number;
  startDateTime: Date;
  endDateTime: Date;
}
