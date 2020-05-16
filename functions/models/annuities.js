/**
 * Function that calculates the respective annuity according to the given parameters
 * 
 * @param {*} vp - Present value of entry for the calculation of the annuity
 * @param {*} i - Interest rate for annuiality
 * @param {*} n - Time frame of the annuity
 * 
 * @returns The calculated annuity 
 */
const calculateFee = async (vp, i, n) => {
    let annuity;
    let result;
    i = (i / 100);
    annuity = (1 - (Math.pow((1 + i), -(n)))) / i;
    result = (vp / annuity).toFixed(2);
    return result;
}

/**
 * Function that builds the depreciation table
 * 
 * @param {*} n - Time frame of the annuity
 * @param {*} vp - Present value of entry for the calculation of the annuity
 * @param {*} a - The calculated annuity 
 * @param {*} i - Interest rate for annuiality
 * 
 * @returns Object with complete list corresponding to
    * the depreciation table according to the settings received
 */
const getAmortization = async (n, vp, a, i) => {
    let table = [];
    let interest;
    let amortization;
    i = (i / 100);
    for (let index = 0; index < n; index++) {
        if (index === 0) {
            interest = vp * i;
            amortization = a - interest;
            balance = vp - amortization;
        } else if (index > 0) {
            vp = balance;
            interest = vp * i;
            amortization = a - interest;
            balance = vp - amortization;
        }
        table.push({
            period: index + 1,
            capital: vp,
            interest,
            amortization: (amortization).toFixed(2),
            a,
            balance: (balance).toFixed(2)
        });
    }
    return table;
}

module.exports = {
    calculateFee,
    getAmortization
}