Date.prototype.format = function (format) {
    var reg = /[djDlNwz]|[mnMFt]|[LYy]|[aAghGHisu]|U/g,

        days_names = 'Mon Tue Wed Thu Fri Sat Sun Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' '),
        month_names = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December'.split(' '),

        d = this.getDate(),         //day
        m = this.getMonth() + 1,    //month
        y = this.getFullYear(),     //year
        H = this.getHours(),        //minutes
        M = this.getMinutes(),      //minutes
        S = this.getSeconds(),      //seconds
        MS = this.getMilliseconds(),//milli seconds
        D = this.getDay(),          //китайский день недели
        DN = D ? D : 7,             //нормальный день недели

        pad = function (val, len) {
            val = val.toString();
            len = len || 2;
            while (val.length < len) val = '0' + val;
            return val;
        },

        data = {
            d: pad(d),
            j: d,
            D: days_names[DN - 1],
            l: days_names[DN + 6],
            N: DN,
            w: D,
            z: Math.floor((this - new Date(this.getFullYear(), 0, 0)) / (60 * 60 * 24 * 1000)), //пиздец полный и не точный, но лучше на js нет

            m: pad(m),
            n: m,
            M: month_names[m],
            F: month_names[m + 12],
            t: 32 - new Date(y, m - 1, 32).getDate(),

            L: y % 4 == 0 ? 1 : 0,
            Y: y,
            y: y.toString().substr(2),

            a: H < 12 ? 'am' : 'pm',
            A: H < 12 ? 'AM' : 'PM',
            g: H < 12 ? H : H - 12,
            h: H < 12 ? H : pad(H - 12),
            G: H,
            H: pad(H),
            i: M,
            s: S,
            u: MS,

            U: this.getTime()
        };
    return format.replace(reg, function (symbol) {
        return symbol in data ? data[symbol] : symbol;
    });
};