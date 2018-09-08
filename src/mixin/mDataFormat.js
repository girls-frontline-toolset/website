var MDataFormat = {
    methods: {
        jsonDate (date) {
            if (!date) return null;
            const [day, month, year] = date.split('-');
            return `${year}-${month}-${day}`;
        },
        parseDate (date) {
            if (!date) return null;
            const [month, day, year] = date.split('/');
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
        },
        formatDate (date) {
            if (!date) return null;
            const [year, month,day] = date.split('-');
            return `${day}-${month}-${year}`;
        },
    }
}

export default  MDataFormat;