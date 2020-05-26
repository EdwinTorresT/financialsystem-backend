const Papa = require('papaparse');

/**
 * 
 * @param {*} data 
 */
const exportCSV = async (data) => {
    let file;
    if (data) {
        file = Papa.unparse(data);
        return file;
    } else {
        throw new Error('data is undefined');
    }
};

module.exports = {
    exportCSV
}