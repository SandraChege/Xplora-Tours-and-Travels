export interface addTourDetails {
  tourID: string;
  imageUrl: string;
  tourName: string;
  tourDescription: string;
  tourPrice: number;
  tourStartDate: Date;
  tourEndDateName: Date;
  tourCount: string;
}

export interface fetchAlltours {
  imageUrl: string
  isDeleted: boolean;
  tourCount: number;
  tourDescription: string;
  tourEndDateName: Date;
  tourID: string;
  tourName: string;
  tourPrice: number;
  tourStartDate: Date;
}
