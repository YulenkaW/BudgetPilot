package com.example.demo.controller;

import com.example.demo.model.Budget;
import com.example.demo.repository.BudgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }

    // method to get a specific budget by ID
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable String id) {
        return budgetRepository.findById(id)
                .map(budget -> ResponseEntity.ok().body(budget)) // If found, return 200 OK with the budget
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404 Not Found
    }
 //method to update existing budget 
    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable String id, @RequestBody Budget updatedBudget) {
        return budgetRepository.findById(id)
                .map(budget -> {
                    budget.setAmount(updatedBudget.getAmount());
                    // here to add if we want to update other fields- to create them in setters before that
                    Budget savedBudget = budgetRepository.save(budget);
                    return ResponseEntity.ok(savedBudget);
                })
                .orElse(ResponseEntity.notFound().build());
    }
//delete budget
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable String id) {
        if (budgetRepository.existsById(id)) {
            budgetRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
