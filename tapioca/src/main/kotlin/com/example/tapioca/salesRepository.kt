package com.example.tapioca

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

@Entity
@Table(name = "sales")
data class Sales(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?,
    val idfood: Int,
    val cpf: String,
    @Column(name = "datesale", insertable = false, updatable = false)
    val datesale: String? = null,
    val descripition: String,
    val price: Double
)


interface SalesRepository : JpaRepository<Sales, Int> {
    @Query("SELECT * from sales WHERE cpf = :cpf", nativeQuery = true)
    fun getAllSalesCpfClient(@Param("cpf") cpf: String):List<Sales>
}