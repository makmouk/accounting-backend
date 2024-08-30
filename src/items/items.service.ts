import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemModel(createItemDto);
    await createdItem.save();
    return 'success';
  }

  findAll() {
    return this.itemModel.find();
  }

  findOne(id: string) {
    return this.itemModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    await this.itemModel.updateOne({ _id: id }, updateItemDto).exec();
    return 'success';
  }

  async remove(id: string) {
    await this.itemModel.deleteOne({ _id: id }).exec();
    return 'Success';
  }

  async existMultiple(itemIds: string[]): Promise<boolean> {
    const objectIdArray = itemIds.map((id) => new Types.ObjectId(id));
    const result = await this.itemModel
      .aggregate([
        { $match: { _id: { $in: objectIdArray } } },
        { $count: 'count' },
      ])
      .exec();
    return result.length > 0 && result[0].count === itemIds.length;
  }
}
