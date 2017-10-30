


function createTable() {

    var principal = document.getElementById("principal").value;
    var apr = document.getElementById("apr").value;
    var paymentAmount = parseInt(document.getElementById("payment-amount").value);

    var endingBalance = 0;
    var counter = 0;

    while (principal > 0) {

        var monthlyInterest = principal * ((apr / 12) / 100);
        principal = principal - (paymentAmount + monthlyInterest);

        if ((principal) < 0) {
            paymentAmount = principal + monthlyInterest;
            principal = 0;
            endingBalance = 0
        }

        else if (principal < paymentAmount) {
            paymentAmount = paymentAmount - principal;
        }
        else {
            endingBalance = principal + monthlyInterest - paymentAmount;
        }

        appenedCells(principal, monthlyInterest, paymentAmount, endingBalance);
        printColumns(principal, monthlyInterest, paymentAmount, endingBalance);
        counter++;

    }
    $("#data-table tr:even").css("backgroundColor", "gray");
}

function appenedCells(principal, monthlyInterest, paymentAmount, endingBalance) {
    var table = document.getElementById("data-table");
    var tr = document.createElement("tr");

    var tdPrincipal = document.createElement("td");
    var text = document.createTextNode(principal.toFixed(2));
    tdPrincipal.appendChild(text);

    var tdMonthly = document.createElement("td");
    var text = document.createTextNode(monthlyInterest.toFixed(2));
    tdMonthly.appendChild(text);

    var tdPayment = document.createElement("td");
    var text = document.createTextNode(paymentAmount.toFixed(2));
    tdPayment.appendChild(text);

    var tdEnding = document.createElement("td");
    var text = document.createTextNode(endingBalance.toFixed(2));
    tdEnding.appendChild(text);

    tr.appendChild(tdPrincipal);
    tr.appendChild(tdMonthly);
    tr.appendChild(tdPayment);
    tr.appendChild(tdEnding);
    tr.className = "rowOdd";

    table.appendChild(tr);
}

function printColumns(principal, monthlyInterest, paymentAmount, endingBalance) {
    console.log("starting, interest ammout, payment, ending balance")
    console.log(principal, monthlyInterest, paymentAmount, endingBalance);
}