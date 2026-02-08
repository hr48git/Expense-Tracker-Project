package com.example.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.example.expensetracker.entity.Expense;
import java.time.LocalDate;


public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserUserId(Long userId);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.userId = :userId")
    Double getTotalAmountByUser(@Param("userId") Long userId);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.userId = :userId AND e.expenseType = :type")
    Double getTotalAmountByUserAndType(@Param("userId") Long userId,
                                       @Param("type") String type);
    

	List<Expense> findByUserUserIdAndCategoryCategoryId(Long userId, Long categoryId);
	
	List<Expense> findByUserUserIdAndExpenseDateBetween(
	        Long userId,
	        LocalDate startDate,
	        LocalDate endDate
	);
}

