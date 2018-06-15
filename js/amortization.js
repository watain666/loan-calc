function getAmortization(){
    var iAmount = document.getElementById('amount').value.replace(/\,/gi, '')
    var iApr    = document.getElementById('apr').value
    var iTerm   = document.getElementById('term').value
    if (!iAmount || !iApr || !iTerm) {
        vHideResult()
        return false
    }

    if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }
    form.classList.add('was-validated')

    $("#amortizationtable").show()
    $("#result").show()

    // Init
    $("#month_pay").text('')
    $("#tbody").text('')
    var iPayment = iGetPayment(iAmount, iApr, iTerm)
    month_pay.innerText = "每月付款金額 = $" + iFormatNumber(iPayment.toFixed())

    var iBalance = iAmount
    var iInterest = 0.0
    var iPrincipal = 0.0
    var iTotalInterest = 0.0
    for (i = 1; i <= iTerm; i++) {
        sRow = ''
        iInterest = iBalance * iApr / 1200
        iTotalInterest += Math.ceil(iInterest)
        iPrincipal = iPayment - iInterest
        iBalance -= iPrincipal

        sRow += '<tr><td>'
        sRow += i
        sRow += '</td><td>'
        sRow += (Math.ceil(iBalance) != 1) ? Math.ceil(iBalance) : 0
        sRow += '</td><td>'
        sRow += Math.ceil(iPrincipal)
        sRow += '</td><td>'
        sRow += Math.ceil(iInterest)
        sRow += '</td><td>'
        sRow += Math.ceil(iPayment.toFixed())
        sRow += '</td><td>'
        sRow += i * Math.ceil(iPayment.toFixed())
        sRow += '</td><td>'
        sRow += Math.ceil(iTotalInterest)
        sRow += '</td></tr>'
        $("#tbody").append(sRow)
    }
    return false;
}

function iFormatNumber(n) {
    n += ""
    var arr = n.split(".")
    var re = /(\d{1,3})(?=(\d{3})+$)/g
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "")
}

function iGetPayment(iAmount, iApr, iTerm) {
    var iAcc = 0;
    var iBase = 1 + iApr / 1200;
    for (i = 1; i <= iTerm; i++) {
        iAcc += Math.pow(iBase, -i)
    }
    return iAmount / iAcc;
}

function vHideResult() {
    $("#result").hide()
    $("#amortizationtable").hide()
}