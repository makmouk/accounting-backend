import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Offer, OfferDocument } from './offer.schema';
import { ItemsService } from '../items/items.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
    private readonly itemsService: ItemsService,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const itemIds = createOfferDto.items.map((item) => item.itemId);
    const itemsExist = await this.itemsService.existMultiple(itemIds);
    if (!itemsExist) {
      throw new NotFoundException('One or more items not found');
    }

    const createdOffer = new this.offerModel(createOfferDto);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().populate('items.itemId').exec();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel
      .findById(id)
      .populate('items.itemId')
      .exec();
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const existingOffer = await this.offerModel
      .findByIdAndUpdate(id, updateOfferDto, { new: true })
      .exec();
    if (!existingOffer) {
      throw new NotFoundException('Offer not found');
    }

    if (updateOfferDto.items) {
      const itemIds = updateOfferDto.items.map((item) => item.itemId);
      const itemsExist = await this.itemsService.existMultiple(itemIds);
      if (!itemsExist) {
        throw new NotFoundException('One or more items not found');
      }
    }

    return existingOffer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.offerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Offer not found');
    }
  }

  async existMultiple(offerIds: string[]): Promise<boolean> {
    const objectIdArray = offerIds.map((id) => new Types.ObjectId(id));
    const result = await this.offerModel
      .aggregate([
        { $match: { _id: { $in: objectIdArray } } },
        { $count: 'count' },
      ])
      .exec();
    return (
      (result.length > 0 && result[0].count === offerIds.length) ||
      !offerIds.length
    );
  }
}
// checking something
