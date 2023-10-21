export interface Holiday {
    id: number;
    name: string;
    date?: Date;
    isPresentNeeded: string;
}

export interface HolidayForRender extends Holiday {
    startYear: number;
    isPassed: boolean;
}

export const allData: Holiday[] = [
    { id: 1, name: 'New Year', date: new Date('1700-12-31'), isPresentNeeded: 'Yes' },
    { id: 2, name: 'Old New Year', date: new Date('1700-01-13'), isPresentNeeded: 'No' },
    { id: 3, name: 'Easter', date: new Date('0001-04-16'), isPresentNeeded: 'No' },
    { id: 4, name: 'Radonitsa', isPresentNeeded: 'No' },
    { id: 5, name: 'Midwinter', date: new Date('0000-12-21'), isPresentNeeded: 'No'},
    { id: 6, name: 'Midsommer', date: new Date('0000-06-21'), isPresentNeeded: 'No'},
    { id: 7, name: `Jesus's birthday`, date: new Date('0001-01-07'), isPresentNeeded: 'No'},
    { id: 8, name: `Mother's day`, date: new Date('1996-10-14'), isPresentNeeded: 'Yes'},
    { id: 9, name: `Father's day`, date: new Date('2022-10-21'), isPresentNeeded: 'Yes'},
    { id: 10, name: `Halloween`, date: new Date('0000-10-31'), isPresentNeeded: 'No'},
];