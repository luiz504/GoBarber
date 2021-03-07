import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import { IFindInDayfromProviderDTO } from '../dtos/IFindInDatfromProviderDTO';
import { IFindInMouthfromProviderDTO } from '../dtos/IFindInMouthfromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMouthFromProvider(
    data: IFindInMouthfromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindInDayfromProviderDTO,
  ): Promise<Appointment[]>;
}
