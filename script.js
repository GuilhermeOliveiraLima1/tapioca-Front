var inputFillingsDiv = document.querySelector(".inputFillings")
var suggestionDiv = document.querySelector(".suggestion")
var paymentDiv = document.querySelector(".payment")
var foods = ["Tapioca", "Cuscuz", "Sanduiche"]
var selectedFillings = {}
var modalSales = document.querySelector(".modalSales")
var modalPayment = document.querySelector(".modalPayment")
var total
var table = document.querySelector("table")
var msg = document.querySelector(".sales")


async function getFoods(id) {
    var response = await fetch('http://localhost:8080/food?id='+id);
    var data = await response.json();
    
    showBoxes(data,id,data.price)
    selectedFillings = {}
    boxPayment(selectedFillings, id, data.price)
}


function showBoxes(foodAndFillings,id,priceFood) {
    inputFillingsDiv.innerHTML = ""
    var title = document.createElement("p")
    title.innerHTML = `
    Recheios
    `
    inputFillingsDiv.appendChild(title)
    

    for (fillings in foodAndFillings.filings) {
        var fillingDiv = document.createElement("div")
        fillingDiv.classList.add("intup")
        fillingDiv.innerHTML = `
            <input value="${foodAndFillings.filings[fillings].name},${foodAndFillings.filings[fillings].price}" onchange="getFillings(this.value,${id},${priceFood})" type="checkbox" name="fillings" /> ${foodAndFillings.filings[fillings].name}
        `
        inputFillingsDiv.appendChild(fillingDiv)
    }


    if(id == 1){
        suggestionDiv.innerHTML = ""

        var fotoDiv = document.createElement("div")
        fotoDiv.innerHTML = `
            <p>Sugestões da casa</p>

            <div id = foto>
                <img src="tapioca.png" alt="tapioca">
            </div>  
            <ul>
                <li>Frango e requeijão</li>
                <li>Carne presunto e queijo</li>
            </ul>
        `
        suggestionDiv.appendChild(fotoDiv)
    }

    if(id == 2){
        suggestionDiv.innerHTML = ""

        var fotoDiv = document.createElement("div")
        fotoDiv.innerHTML = `
            <p>Sugestões da casa</p>

            <div id = foto>
                <img src="cuscuz.png" alt="cuscuz">
            </div>  
            <ul>
                <li>Frango e queijo</li>
                <li>Calabresa e queijo</li>
            </ul>
        `
        suggestionDiv.appendChild(fotoDiv)
    } 

    if(id == 3){
        suggestionDiv.innerHTML = ""

        var fotoDiv = document.createElement("div")
        fotoDiv.innerHTML = `
            <p>Sugestões da casa</p>

            <div id = foto>
                <img src="image.png" alt="tapioca">
            </div>  
            <ul>
                <li>Carne, calabresa e queijo</li>
                <li>Frango, queijo e presunto</li>
            </ul>
        `
        suggestionDiv.appendChild(fotoDiv)
    }
}

function getFillings(value,id,priceFood){
    var checkbox = document.querySelector(`input[value="${value}"]`)
    var [name, price] = value.split(",")
    if (checkbox.checked){
        selectedFillings[name] = price
    }else{
        delete selectedFillings[name]
    }
    
    boxPayment(selectedFillings,id,priceFood)
}

function boxPayment(value,id,price){
    paymentDiv.innerHTML = ""
    var title   = document.createElement("p")
    title.classList.add("title")
    title.innerHTML = `
    Valor à pagar
    `
    paymentDiv.appendChild(title)

    var food = document.createElement("p")
    food.classList.add("food")
    food.innerHTML = `
        ${foods[id-1]}: R$${price.toFixed(2)}
    `
    paymentDiv.appendChild(food)

    total = price

    for(let [name,price ]of Object.entries(value)){
    var payment = document.createElement("div")
    payment.classList.add("fillingPayment")
    payment.innerHTML=`
    <p>${name}: R$ ${parseFloat(price).toFixed(2)}</p>
    `
    paymentDiv.appendChild(payment)
    total = total + parseFloat(price)
}
    var buttonPayment = document.createElement("div")
    buttonPayment.classList.add("buttonPayment")
    buttonPayment.innerHTML = `
        <p>total a pagar: R$ ${total.toFixed(2)}  <button id="buttonPayment" onclick="openModalPayment()">pagar</button></p>
    `
    paymentDiv.appendChild(buttonPayment)
}

async function getSales(){
    var cpf = document.querySelector("#cpf").value
    var response = await fetch('http://localhost:8080/history?cpf='+cpf)
    var history = await response.json()

table.innerHTML=""
    
    var head = document.createElement("tr")
    head.classList.add("headTable")
    head.innerHTML = `
    <th>Descrição</th>
    <th>Valor</th>
    <th>Data</th>
    `
    table.appendChild(head)
    
    for(sale in history){
        var data = document.createElement("tr")
        data.classList.add("dataTable")
        var date = history[sale].datesale.split(" ")[0]
        var [year, month, day] = date.split(" ")[0].split("-")
        date = `${day}/${month}/${year}`

        data.innerHTML = `
            <td>${history[sale].descripition}</td>
            <td>${history[sale].price.toFixed(2)}</td>
            <td>${date}</td>
        `
        table.appendChild(data)
    }
    
}


async function payment(){
    var cpf = document.querySelector("#cpf").value
    console.log(cpf)
    var idFood = document.querySelector('input[name="filtros"]:checked').value
    console.log(idFood)
    var filings = Object.keys(selectedFillings).join(', ')
    var response = await fetch("http://localhost:8080/payment?idFood="+idFood+"&cpf="+cpf+"&descripition="+foods[idFood-1]+" com " + filings + "&price="+total)
    var data = await response.text()
    var img =""
    if(data === "Pagamento realizado com sucesso"){
    img = "payment"
    }else{
        img ="error"
    }
    modalPayment.innerHTML=""
    var confirmationPayment = document.createElement("h3")
    confirmationPayment.classList.add("confirmationPayment")
    confirmationPayment.innerHTML=`
    ${data}
    <img src="${img}.png" alt="Photopayment" id="Photopayment">
    <button onclick="closeModalPayment()" id="buttonBackPayment">Voltar</button>
    `
    modalPayment.appendChild(confirmationPayment)
}

function openModalSearch(){
    modalSales.style.display = "flex"
    modalSales.showModal
    modalPayment.style.display = "none"
    modalPayment.close
    getSales()
}
function closeModalSearch(){
    modalSales.style.display = "none"
    modalSales.close
}

function openModalPayment(){
    modalPayment.style.display = "flex"
    modalPayment.showModal
    modalSales.style.display = "none"
    modalSales.close
    payment()
}
function closeModalPayment(){
    modalPayment.style.display = "none"
    modalPayment.close
}
getFoods(1)
boxPayment(selectedFillings,1,0)