export interface EditProfileValidationEvent {
    isValid: boolean;
    formValue: GeneralInfoDTO & ContactInfoDTO;
}

export interface GeneralInfoDTO {
    companyATI: string;
    companyINN: string;
    companyKPP: string;
    companyName: string;
    companyORGN: string;
    companyOrganisationType: string;
    companyTaxType: string;
    companyVAT: string;
}

export interface ContactInfoDTO {
    companyCountry: string;
    companyCity: string;
    companyPhone: string;
    companyEmail: string;
}

export interface CompanyInfo extends GeneralInfoDTO, ContactInfoDTO{
    userType: string;
    userId: string;
    companyRequsits: File;
    companyRegistration: File;
    companyInnAccount: File;
}