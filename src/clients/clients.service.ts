import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/client.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async create(createClientDto: CreateClientDto) {
    const createdClient = new this.clientModel(createClientDto);
    await createdClient.save();
    return 'success';
  }

  findAll() {
    return this.clientModel.find();
  }

  findOne(id: string) {
    return this.clientModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.clientModel.updateOne({ _id: id }, updateClientDto).exec();
    return 'success';
  }

  async remove(id: string) {
    await this.clientModel.deleteOne({ _id: id }).exec();
    return 'Success';
  }

  async exists(clientId: string): Promise<boolean> {
    const client = await this.clientModel.findById(clientId).exec();
    return !!client;
  }
}
