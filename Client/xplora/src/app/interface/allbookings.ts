export interface allbookings {
  bookID: string;
  isDeleted: boolean;
  totalBookCount: number;
  totalprice: number;
  tourID: string;
  userID: string;
}


export interface bookingDetails {
  tourID: String;
  userID: String;
  // bookID: string
  totalprice: string;
  totalBookCount: string;
}

export interface updatebookingDetails {
  tourID: String;
  userID: String;
  bookID: string;
  totalprice: string;
  totalBookCount: string;
}