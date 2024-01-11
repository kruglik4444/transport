export interface EditProfileValidationEvent {
    isValid: boolean;
    formValue: GeneralInfoDTO | ContactInfoDTO
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

}