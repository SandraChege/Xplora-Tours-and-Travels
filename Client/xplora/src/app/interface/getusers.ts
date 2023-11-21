export interface AllUserDetails {
  userName: string;
  email: string;
  phone_no: string;
  role: string;
  password: string;
  Welcomed: boolean;
    isDeleted: boolean;
  resetPassword: boolean;
  userID: string;
}
export interface profileUserDetails {
  Welcomed: Boolean;
  email: string;
  isDeleted: boolean;
  resetPassword: boolean;
  role: string;
  userID: string;
  userName: string;
}