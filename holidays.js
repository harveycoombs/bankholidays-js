// BankHolidays.JS - Written by Harvey Coombs
export class BankHolidays {
    static async get(filters) {
        fetch("https://www.gov.uk/bank-holidays.json").then(response => response.json()).then((all) => {
            if (!all) {
                resolve([]);
                return;        
            }

            let holidays = [];
            let selectedRegion = all[filters.region];

            let filtered = selectedRegion?.events;

            if (filters.before) filtered = filtered?.filter(e => (new Date(e.date) < new Date(filters.before))) ?? [];
            if (filters.after) filtered = filtered?.filter(e => (new Date(e.date) > new Date(filters.after))) ?? [];

            for (let holiday of filtered) {
                holidays.push({
                    title: holiday.title,
                    date: holiday.date
                });
            }

            resolve(holidays);
        }).catch((ex) => {
            reject(ex);
        });
    }
}
