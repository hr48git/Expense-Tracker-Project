package com.example.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = userRepository
                .findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (dbUser == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("User not registered or invalid credentials");
        }

        // ✅ Send only required info
        Map<String, Object> response = new HashMap<>();
        response.put("userId", dbUser.getUserId());
        response.put("name", dbUser.getName());
        response.put("email", dbUser.getEmail());

        return ResponseEntity.ok(response);
    }


    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // Email format check (simple)
        if (!user.getEmail().contains("@")) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid email format");
        }

        // Password length check
        if (user.getPassword().length() < 4) {
            return ResponseEntity
                    .badRequest()
                    .body("Password must be at least 4 characters");
        }

        // Existing user check
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body("User already exists");
        }

        return ResponseEntity.ok(userRepository.save(user));
    }


}
