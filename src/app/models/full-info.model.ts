export class FullInfoModel {
    firstName: string;
    lastName: string;
    gender: string;
    institute: string;
    nationality: string;
    occupation: string;
    primaryEmail?: string;
    primaryPhone?: number;
    role: string;
    uid: string;
    username?: string;
    address: {
      district: string;
      postCode: number;
      postal: string;
      village: string;
      road: string;
    };
    contacts: {
      email?: string[],
      phone?: number[],
      publishedEmail: string[],
      publishedPhone: number[]
    };
}
