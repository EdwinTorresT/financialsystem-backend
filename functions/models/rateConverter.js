// Frequencys to manage
const f = [12, 6, 4, 2, 1];
// Onject to frequencys
const freq = {
    1: "Anual",
    2: "Semestral",
    4: "Trimestral",
    6: "Bimestral",
    12: "Mensual"
}

/**
 * Function that given an input rate, converts this
 * to all possibilities, according to the spider diagram.
 * 
 * @param {*} type - Type of rate to be converted
 * @param {*} frequency - Frequency of the rate to be converted
 * @param {*} method - Method of payment of the rate to be converted
 * @param {*} rate -Input value for the interest rate
 * 
 * @returns Return the object with all the converted fees,
    * with their respective frequency and value.
 */
const convertAllCosts = async (type, frequency, method, rate) => {
    // convert overdue rate
    if (f.includes(Number(frequency))) {
        let results = [];
        if (type === "Efectiva") {
            let vencidas = [];
            let anticipadas = [];
            if (method === "Vencida") {
                let i = 1 + (rate / 100);
                for (let index = 0; index < f.length; index++) {
                    let n = frequency / f[index];
                    let r = (Math.pow(i, n)) - 1;
                    vencidas.push(r);
                    results.push({ title: 'Efectiva Vencida', frequency: freq[f[index]], rate: (r * 100) });
                    let rv = r * f[index];
                    results.push({ title: 'Nominal Vencida', frequency: freq[f[index]], rate: (rv * 100) });
                }
                for (let index = 0; index < vencidas.length; index++) {
                    let r = vencidas[index] / (1 + vencidas[index]);
                    results.push({ title: 'Efectiva Anticipada', frequency: freq[f[index]], rate: (r * 100) });
                    let ra = r * f[index];
                    results.push({ title: 'Nominal Anticipada', frequency: freq[f[index]], rate: (ra * 100) });
                }
            } else if (method === "Anticipada") {
                let i = 1 + (rate / 100) / (1 - (rate / 100));
                for (let index = 0; index < f.length; index++) {
                    let n = frequency / f[index];
                    let r = (Math.pow(i, n)) - 1;
                    anticipadas.push(r);
                    results.push({ title: 'Efectiva Vencida', frequency: freq[f[index]], rate: (r * 100) });
                    let rv = r * f[index];
                    results.push({ title: 'Nominal Vencida', frequency: freq[f[index]], rate: (rv * 100) });
                }
                for (let index = 0; index < anticipadas.length; index++) {
                    let r = anticipadas[index] / (1 + anticipadas[index]);
                    results.push({ title: 'Efectiva Anticipada', frequency: freq[f[index]], rate: (r * 100) });
                    let ra = r * f[index];
                    results.push({ title: 'Nominal Anticipada', frequency: freq[f[index]], rate: (ra * 100) });
                }
            } else {
                throw new Error("method not exist");
            }
        } else if (type === "Nominal") {
            let vencidas = [];
            let anticipadas = [];
            if (method === "Vencida") {
                for (let index = 0; index < f.length; index++) {
                    let r = (rate / 100) / f[index];
                    vencidas.push(r)
                    results.push({ title: 'Efectiva Vencida', frequency: freq[f[index]], rate: (r * 100) });
                    let rv = r * f[index];
                    results.push({ title: 'Nominal Vencida', frequency: freq[f[index]], rate: (rv * 100) });
                }
                for (let index = 0; index < vencidas.length; index++) {
                    let r = vencidas[index] / (1 + vencidas[index]);
                    results.push({ title: 'Efectiva Anticipada', frequency: freq[f[index]], rate: (r * 100) });
                    let ra = r * f[index];
                    results.push({ title: 'Nominal Anticipada', frequency: freq[f[index]], rate: (ra * 100) });
                }
            } else if (method === "Anticipada") {
                for (let index = 0; index < f.length; index++) {
                    let r = (rate / 100) / f[index];
                    results.push({ title: 'Efectiva Anticipada', frequency: freq[f[index]], rate: (r * 100) });
                    let rv = r / (1 - r);
                    anticipadas.push(rv);
                    results.push({ title: 'Efectiva Vencida', frequency: freq[f[index]], rate: (rv * 100) });
                }
                for (let index = 0; index < anticipadas.length; index++) {
                    let r = anticipadas[index] * f[index];
                    results.push({ title: 'Nominal Vencida', frequency: freq[f[index]], rate: (r * 100) });
                    let ra = (anticipadas[index] / (1 + anticipadas[index])) * f[index];
                    results.push({ title: 'Nominal Anticipada', frequency: freq[f[index]], rate: (ra * 100) });
                }
            } else {
                throw new Error("method not exist");
            }
        } else {
            throw new Error("Type not exist");
        }
        return results;
    } else {
        throw new Error("Frequency is out");
    }
}

module.exports = {
    convertAllCosts
}