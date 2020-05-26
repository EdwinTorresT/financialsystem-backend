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
};

/**
 * Function to calculate the adjusted time, after having made
 * an extraordinary payment that affects the term of the debt
 * 
 * @param {*} s  - Balance of the debt at the moment
 * @param {*} i - Interest rate for annuiality
 * @param {*} a - The calculated annuity
 * @param {*} n - Time frame of the annuity
 * 
 * @returns The new time adjusted by the extraordinary value
 */
const calculateTime = async (s, i, a, n) => {
    let vp;
    let m;
    vp = s * (i);
    vp = ((vp / a) - 1) * (-1);
    vp = Math.log(vp);
    m = (vp / (Math.log((1 + i))) * (-1));
    m = n - m.toFixed(1);
    return Math.trunc(m);
};

/**
 * Function that builds the depreciation table
 * 
 * @param {*} n - Time frame of the annuity
 * @param {*} vp - Present value of entry for the calculation of the annuity
 * @param {*} a - The calculated annuity 
 * @param {*} i - Interest rate for annuiality
 * @param {*} e - Flag for extra payments
 * @param {*} p - List of all extra payments
 * 
 * @returns Object with complete list corresponding to
    * the depreciation table according to the settings received
 */
const getAmortization = async (n, vp, a, i, e, p) => {
    let table = [];
    let t;
    let interest;
    let amortization;
    i = (i / 100);
    if (e) {
        for (let index = 0; index < n; index++) {
            for (let num = 0; num < p.length; num++) {
                if (index === 0) {
                    interest = vp * i;
                    amortization = a - interest;
                    balance = vp - amortization;
                    table.push({
                        period: index + 1,
                        capital: vp,
                        interest,
                        amortization: (amortization).toFixed(2),
                        a,
                        balance: (balance).toFixed(2)
                    });
                } else if (index > 0 && index < (n - 1)) {
                    if ((index + 1) === p[num].period) {
                        if (p[num].type === 1) {
                            vp = balance;
                            interest = vp * i;
                            m = (a + p[num].value)
                            amortization = m - interest;
                            balance = vp - amortization;
                            table.push({
                                period: index + 1,
                                capital: vp,
                                interest,
                                amortization: (amortization).toFixed(2),
                                a: m,
                                balance: (balance).toFixed(2),
                                extra: true
                            });
                            t = (n - p[num].period);
                            await calculateFee(balance, (i * 100), t).then(value => {
                                a = value;
                            });
                        } else {
                            vp = balance;
                            interest = vp * i;
                            m = (a + p[num].value)
                            amortization = m - interest;
                            balance = vp - amortization;
                            table.push({
                                period: index + 1,
                                capital: vp,
                                interest,
                                amortization: (amortization).toFixed(2),
                                a: m,
                                balance: (balance).toFixed(2),
                                extra: true
                            });
                            await calculateTime(balance, i, a, n).then(value => {
                                n = value;
                            });
                        }
                    } else {
                        vp = balance;
                        interest = vp * i;
                        amortization = a - interest;
                        balance = vp - amortization;
                        table.push({
                            period: index + 1,
                            capital: vp,
                            interest,
                            amortization: (amortization).toFixed(2),
                            a,
                            balance: (balance).toFixed(2)
                        });
                    }
                } else if (index === (n - 1) && p[num].type === 2) {
                    console.log("entro");
                    vp = balance;
                    interest = vp * i;
                    a = vp + interest;
                    console.log(a);
                    amortization = a - interest;
                    balance = vp - amortization;
                    table.push({
                        period: index + 1,
                        capital: vp,
                        interest,
                        amortization: (amortization).toFixed(2),
                        a,
                        balance: (balance).toFixed(2),
                        cextra: a
                    });
                    break;
                } else if (index === (n - 1)) {
                    console.log("entro");
                    vp = balance;
                    interest = vp * i;
                    a = vp + interest;
                    console.log(a);
                    amortization = a - interest;
                    balance = vp - amortization;
                    table.push({
                        period: index + 1,
                        capital: vp,
                        interest,
                        amortization: (amortization).toFixed(2),
                        a,
                        balance: (balance).toFixed(2)
                    });
                    break;
                }
            }
            console.log(index, n);
        }
    } else {
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
    }
    return table;
};

module.exports = {
    calculateFee,
    getAmortization
};
