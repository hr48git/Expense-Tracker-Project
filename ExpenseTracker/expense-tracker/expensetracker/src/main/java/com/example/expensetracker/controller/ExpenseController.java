package com.example.expensetracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.repository.CategoryRepository;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {

        // Amount validation
        if (expense.getAmount() <= 0) {
            return ResponseEntity.badRequest()
                    .body("Amount must be greater than zero");
        }

        // Expense type validation
        if (!expense.getExpenseType().equals("PERSONAL") &&
            !expense.getExpenseType().equals("ORGANIZATIONAL")) {
            return ResponseEntity.badRequest()
                    .body("Invalid expense type");
        }

        // Date validation
        if (expense.getExpenseDate().isAfter(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body("Expense date cannot be in the future");
        }

        // 🔥 IMPORTANT: fetch managed User
        Long userId = expense.getUser().getUserId();
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid user");
        }

        // 🔥 IMPORTANT: fetch managed Category
        Long categoryId = expense.getCategory().getCategoryId();
        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category");
        }

        // Attach managed entities
        expense.setUser(user);
        expense.setCategory(category);

        return ResponseEntity.ok(expenseRepository.save(expense));
    }



    // GET EXPENSES BY USER
    @GetMapping
    public List<Expense> getExpenses(@RequestParam Long userId) {
        return expenseRepository.findByUserUserId(userId);
    }
    
    // TOTAL EXPENSE (OPTIONAL FILTER BY TYPE)
    @GetMapping("/total")
    public Double getTotalExpense(@RequestParam Long userId,
                                  @RequestParam(required = false) String type) {

        if (type != null) {
            return expenseRepository.getTotalAmountByUserAndType(userId, type);
        }
        return expenseRepository.getTotalAmountByUser(userId);
    }

    @GetMapping("/by-category")
    public List<Expense> getExpensesByCategory(@RequestParam Long userId,
                                               @RequestParam Long categoryId) {
        return expenseRepository
                .findByUserUserIdAndCategoryCategoryId(userId, categoryId);
    }

    @GetMapping("/by-date")
    public List<Expense> getExpensesByDate(@RequestParam Long userId,
                                           @RequestParam String from,
                                           @RequestParam String to) {

        return expenseRepository
                .findByUserUserIdAndExpenseDateBetween(
                        userId,
                        LocalDate.parse(from),
                        LocalDate.parse(to)
                );
    }
    
    // DELETE EXPENSE
    @DeleteMapping("/{expenseId}")
    public void deleteExpense(@PathVariable Long expenseId) {
        expenseRepository.deleteById(expenseId);
    }


}
