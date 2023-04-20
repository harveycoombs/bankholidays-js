// BankHolidays.JS - Written by Harvey Coombs
export class BankHoliday {
    constructor (title, date) {
        this.title = title;
        this.date = date;
    }
}

export class BankHolidays {
    static get(filters) {
        var holidays = [];
        let request = new XMLHttpRequest();

        request.open("GET", "https://www.gov.uk/bank-holidays.json", false);
        request.send();

        try {
            let all = JSON.parse(request.responseText);

            if (all) {
                let selectedRegion = all[filters.region];

                if (selectedRegion) {
                    let filtered = selectedRegion.events;
                    
                    if (filters.before) {
                        filtered = filtered.filter(e => (new Date(e.date) < new Date(filters.before)));
                    }

                    if (filters.after) {
                        filtered = filtered.filter(e => (new Date(e.date) > new Date(filters.after)));
                    }

                    for (let holiday of filtered) {
                        let h = new BankHoliday(holiday.title, holiday.date);
                        holidays.push(h);
                    }
                }
            }
        } catch (ex) {
            throw ex;
        }

        return holidays;
    }
}
