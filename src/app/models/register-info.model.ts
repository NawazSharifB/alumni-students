export class RegisterInfoModel {
    firstName: string;
    lastName: string;
    imageUrl: string;
    imageFilePath: string;
    occupation: string;
    institute: string;
    nationality: string;
    gender: string;
    contacts: {
        phone: number[];
        email: string[];
        publishedPhone: number[],
        publishedEmail: string[]
    };
    address: {
        road: string;
        village: string;
        postal: string;
        postCode: number,
        district: string;
    };
    username: string;
    password: string;
    primaryPhone: number;
    primaryEmail: string;

}
