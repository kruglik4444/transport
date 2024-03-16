export enum CargoStatus {
    CREATED = 'Создан',
    ON_APPROVAL = 'На согласовании',
    IN_WORK = 'В работе',
    PAYMENT = 'Ожидание оплаты',
    DONE = 'Выполнен',
}

export enum TransportStatus {
    FREE = 'Свободен',
    IN_WORK = 'В рейсе',
    REPAIR = 'В ремонте',
    VACATION = 'В отпуске',
}