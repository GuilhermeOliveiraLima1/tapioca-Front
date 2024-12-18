package com.example.tapioca

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.Optional

@CrossOrigin
@RestController
class TapiocasController(
    val foodsRepository: FoodsRepository,
    val filingsRepository: FilingsRepository,
    val salesRepository: SalesRepository
) {
    @GetMapping("/food")
    fun getFilingsByFoodID(@RequestParam("id") id: Int): Map<String, Any> {
        //Pair<Optional<Foods?>, List<Map<String, Double>>>

        try {
            val food: Optional<Foods?> = foodsRepository.findById(id)
            val filings: List<Map<String, Double>> = filingsRepository.getAllFilingsByFoodId(id)

            val response = mapOf(
                "price" to food.get().price,
                "filings" to filings
            )

            //return Pair(food, filings)
            return response
        } catch (e: Exception) {
            return mapOf("error" to e.message.toString())
        }
    }

    @GetMapping("/history")
    fun getAllSalesCpfClient(@RequestParam("cpf") cpf: String): List<Sales> {
        return salesRepository.getAllSalesCpfClient(cpf)
    }

    @GetMapping("/payment")
    fun payment(
        @RequestParam("idFood") idFood: Int,
        @RequestParam("cpf") cpf: String,
        @RequestParam("descripition") descripition: String,
        @RequestParam("price") price: Double,
    ): String {

        val cpfAux = cpf.replace(" ", "")
        if (!(cpfAux.all { it.isDigit() })||cpfAux.isEmpty())
        return "Compra não foi realizada, verifique o CPF informado e tente novamente"
        try {
            val sale = Sales(
                id = null,
                idfood = idFood,
                cpf = cpfAux,
                datesale = null,
                descripition = descripition,
                price = price
            )
            salesRepository.save(sale)
            return "Pagamento realizado com sucesso"

        } catch (e:Exception ) {
            return "Compra não realizada"
        }
    }

}