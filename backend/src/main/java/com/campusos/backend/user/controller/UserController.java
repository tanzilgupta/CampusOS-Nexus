package com.campusos.backend.user.controller;

import com.campusos.backend.user.dto.LoginRequest;
import com.campusos.backend.user.dto.LoginResponse;
import com.campusos.backend.user.dto.RegisterRequest;
import com.campusos.backend.user.dto.RegisterResponse;
import com.campusos.backend.user.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService) {

        this.userService = userService;

    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(

            @Valid @RequestBody RegisterRequest request

    ) {

        return ResponseEntity.ok(
                userService.registerUser(request));

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(

            @Valid @RequestBody LoginRequest request

    ) {

        return ResponseEntity.ok(
                userService.loginUser(request));

    }

}