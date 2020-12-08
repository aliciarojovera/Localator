
var listDate = [];
var startDate = '2017-02-01';
var endDate = '2017-08-10';
var dateMove = new Date(startDate);
var strDate = startDate;

while (strDate < endDate) {
    var strDate = dateMove.toISOString().slice(0, 10);
    listDate.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
};

function diaSemana(day, month, year) {
    var dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    var dt = new Date(month + ' ' + day + ', ' + year + ' 12:00:00');
    console.log(dias[dt.getUTCDay()]);
};
for (let i = 0; i < listDate.length; i++) {

    const a = listDate[i]
    const year = a.substring(0, 4)
    const month = a.substring(5, 7)
    const day = a.substring(8, 10)
    diaSemana(day, month, year)
}
console.log(listDate)