declare type SignatureMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

declare type ApiSignatureType = {
  method?: SignatureMethodType;
  path?: string;
  version?: string;
  status?: number;
  summary: string;
  disable?: boolean;
  isPagination?: boolean;
};

declare type PaginationMetaType = {
  total_docs: number;
  take: number;
  total_pages: number;
  page: number;
  paging_counter?: number;
  has_prev_page: boolean;
  has_next_page: boolean;
  prev: number;
  next: number;
};

declare type UserStatusType = 'active' | 'suspended';
declare type UserKindType = 'athlete' | 'coach';
declare type PermissionDepartmentType = 'admin' | 'user';

declare type AppMimeType = 'image/png' | 'image/jpeg' | 'image/jpg' | 'image/gif' | 'image/svg';
declare type BufferedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
};

declare type CarLicense = string[];

declare type GoogleAuthToken = {
  access_token: string;
  id_token: string | number;
};

declare type GoogleAuthUserInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: string;
  locale: string;
  hd: string;
};

declare type TSmsPattern = 'otp' | 'forget' | 'purchased-plan' | 'new-program'