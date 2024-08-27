import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './invoice.schema';
import { Model } from 'mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { ItemsService } from 'src/items/items.service';
import { OffersService } from 'src/offers/offers.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private readonly clientsService: ClientsService,
    private readonly itemsService: ItemsService,
    private readonly offersService: OffersService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const clientExists = await this.clientsService.exists(
      createInvoiceDto.clientId,
    );
    if (!clientExists) {
      throw new NotFoundException('Client not found');
    }
    const itemIds = createInvoiceDto.items.map((item) => item.itemId);
    const itemsExist = await this.itemsService.existMultiple(itemIds);
    if (!itemsExist) {
      throw new NotFoundException('One or more items not found');
    }

    const offerIds = createInvoiceDto.offers;
    const offersExist = await this.offersService.existMultiple(offerIds);
    if (!offersExist) {
      throw new NotFoundException('One or more offers not found');
    }

    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    await createdInvoice.save();
    return 'success';
  }

  findAll() {
    return this.invoiceModel
      .find()
      .populate('clientId')
      .populate('items.itemId')
      .populate('offers')
      .exec();
  }

  findOne(id: string) {
    return this.invoiceModel
      .findOne({ _id: id })
      .populate('clientId')
      .populate('items.itemId')
      .populate('offers')
      .exec();
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const existingInvoice = await this.invoiceModel.findById(id);
    if (!existingInvoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (updateInvoiceDto.clientId) {
      const clientExists = await this.clientsService.exists(
        updateInvoiceDto.clientId,
      );
      if (!clientExists) {
        throw new NotFoundException('Client not found');
      }
    }

    if (updateInvoiceDto.items) {
      const itemIds = updateInvoiceDto.items.map((item) => item.itemId);
      const itemsExist = await this.itemsService.existMultiple(itemIds);
      if (!itemsExist) {
        throw new NotFoundException('One or more items not found');
      }
    }

    if (updateInvoiceDto.offers) {
      const offerIds = updateInvoiceDto.offers;
      const offersExist = await this.offersService.existMultiple(offerIds);
      if (!offersExist) {
        throw new NotFoundException('One or more offers not found');
      }
    }

    Object.assign(existingInvoice, updateInvoiceDto);

    await existingInvoice.save();
    return 'success';
  }

  async remove(id: string) {
    await this.invoiceModel.deleteOne({ _id: id }).exec();
    return 'Success';
  }
}
