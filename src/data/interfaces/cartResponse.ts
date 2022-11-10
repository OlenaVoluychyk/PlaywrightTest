import { AxiosResponse } from 'axios';

export interface CartItemResponse extends AxiosResponse { 
  alternativeColorVariations: AlternativeColor[];
  alternativeSizeVariations: AlternativeSize[];
  brand: string;
  categories: Categories[];
  color: Color;
  colorversionId: number;
  discountValue: number;
  ean: string;
  frontColor: FrontColor;
  frontendId: string;
  id: number;
  mainImageFilename: string;
  mainImageVersion: string;
  maxQuantity: number;
  name: string;
  packageSize: string;
  pbbCode: string;
  price: number;
  priceIsDiscounted: boolean;
  priceMinimal: null | number;
  priceRegular: number;
  quantity: number;
  size: number;
  sizeId: number;
  slug: string;
  subtitle: string;
  totalPrice: number;
  totalPriceRegular: number;
  variationId: number;
}

interface AlternativeColor {
  color: Color;
  frontColor: FrontColor;
  id: number;
}

interface AlternativeSize {
  availableForBuy: boolean;
  id: number;
  name: string;
  productVariationId: number;
}

interface Categories {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
  colorPbbCode: string;   
}

interface FrontColor {
  background: string;
  id: number;
  isSelected: boolean;
  name: string;
  productsCount: null | number;
}