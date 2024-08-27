import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Purchase, PurchaseDocument } from './purchase.schema';
import { Model } from 'mongoose';
import { ItemsService } from 'src/items/items.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
    private readonly itemsService: ItemsService,
    private readonly suppliersService: SuppliersService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const supplierExists = await this.suppliersService.exists(
      createPurchaseDto.supplierId,
    );
    if (!supplierExists) {
      throw new NotFoundException('Supplier not found');
    }

    const itemIds = createPurchaseDto.items.map((item) => item.itemId);
    const itemsExist = await this.itemsService.existMultiple(itemIds);
    if (!itemsExist) {
      throw new NotFoundException('One or more items not found');
    }

    const createdPurchase = new this.purchaseModel(createPurchaseDto);
    return createdPurchase.save();
  }
  async update(
    id: string,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    const existingPurchase = await this.purchaseModel.findById(id);
    if (!existingPurchase) {
      throw new NotFoundException('Purchase not found');
    }

    if (updatePurchaseDto.supplierId) {
      const supplierExists = await this.suppliersService.exists(
        updatePurchaseDto.supplierId,
      );
      if (!supplierExists) {
        throw new NotFoundException('Supplier not found');
      }
    }

    if (updatePurchaseDto.items) {
      const itemIds = updatePurchaseDto.items.map((item) => item.itemId);
      const itemsExist = await this.itemsService.existMultiple(itemIds);
      if (!itemsExist) {
        throw new NotFoundException('One or more items not found');
      }
    }

    Object.assign(existingPurchase, updatePurchaseDto);
    return existingPurchase.save();
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseModel
      .find()
      .populate('supplierId')
      .populate('items.itemId')
      .exec();
  }

  async findOne(id: string): Promise<Purchase> {
    const purchase = await this.purchaseModel
      .findById(id)
      .populate('supplierId')
      .populate('items.itemId')
      .exec();
    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }
    return purchase;
  }

  async remove(id: string): Promise<void> {
    const result = await this.purchaseModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Purchase not found');
    }
  }
}
