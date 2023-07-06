function getAmortization(){
    let amount = document.getElementById('amount').value.replace(/\,/gi, '')
    let apr    = document.getElementById('apr').value
    let term   = document.getElementById('term').value
    if (!amount || !apr || !term) {
        hideResult()
        return false
    }

    if (form.checkValidity() === false) {
        figure.preventDefault()
        figure.stopPropagation()
    }
    form.classList.add('was-validated')

    $("#amortizationtable").show()
    $("#result").show()

    // Init
    $("#month_pay").text('')
    $("#tbody").text('')
    let payment = getPayment(amount, apr, term)
    month_pay.innerText = "每月付款金額 = $" + formatNumber(payment.toFixed())

    let balance = amount
    let interest = 0.0
    let principal = 0.0
    let totalInterest = 0.0
    for (i = 1; i <= term; i++) {
        row = ''
        interest = balance * apr / 1200
        totalInterest += Math.ceil(interest)
        principal = payment - interest
        balance -= principal

        row += '<tr><td>'
        row += i
        row += '</td><td>'
        row += (Math.ceil(balance) != 1) ? Math.ceil(balance) : 0
        row += '</td><td>'
        row += Math.ceil(principal)
        row += '</td><td>'
        row += Math.ceil(interest)
        row += '</td><td>'
        row += Math.ceil(payment.toFixed())
        row += '</td><td>'
        row += i * Math.ceil(payment.toFixed())
        row += '</td><td>'
        row += Math.ceil(totalInterest)
        row += '</td></tr>'
        $("#tbody").append(row)
    }
    checkSort()
    return false;
}

function formatNumber(n) {
    n += ""
    let arr = n.split(".")
    let re = /(\d{1,3})(?=(\d{3})+$)/g
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "")
}

function getPayment(amount, apr, term) {
    let iAcc = 0;
    const iBase = 1 + apr / 1200;
    for (i = 1; i <= term; i++) {
        iAcc += Math.pow(iBase, -i)
    }
    return amount / iAcc;
}

function hideResult() {
    $("#result").hide()
    $("#amortizationtable").hide()
}

function reverseTable() {
    const ul = document.getElementById("tbody");
    const list = document.getElementById("tbody").querySelectorAll("tr");
    let ch_list = Array.prototype.slice.call(list);
    ch_list.reverse();
    let str = "";
    for (let i = 0; i < ch_list.length; i++){
        str += ch_list[i].outerHTML;
    }

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
      }
    ul.insertAdjacentHTML('beforeend',str);
}

function checkSort() {
    $("#desc").is(":checked") ? reverseTable() : "";
}
