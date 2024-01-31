export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  stockQuantity: number;
  productPrice: number;
  categories: string[];
  productImage: string;
  manufacturer: string;
  modelNumber: string;
  ratingsAndComments: [];
  promotionsAndDiscounts: {
    promotionDescription: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
  }[];
  salesHistory: {
    orderID: object;
    dateSold: Date;
  }[];
  customTags: string[];
  variantOptions: {
    optionName: string;
    optionValues: string[];
  }[];
  weightAndDimensions: {
    dimensions: {
      height: number;
      length: number;
      width: number;
    };
    weight: number;
  };
}
