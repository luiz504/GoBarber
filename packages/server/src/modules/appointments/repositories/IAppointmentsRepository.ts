import Appointment from '../infra/typeorm/entities/Appointment';

export interface IAppointmentsRepository {
  // create(): Promise<Appointment | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
