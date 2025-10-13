package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.LoginRequest;
import com.karolbystrek.tennispredictor.dto.LoginResponse;
import com.karolbystrek.tennispredictor.dto.SignupRequest;
import com.karolbystrek.tennispredictor.dto.UserResponse;
import com.karolbystrek.tennispredictor.exception.UserNotFoundException;
import com.karolbystrek.tennispredictor.model.JwtToken;
import com.karolbystrek.tennispredictor.model.User;
import com.karolbystrek.tennispredictor.service.AuthenticationService;
import com.karolbystrek.tennispredictor.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.karolbystrek.tennispredictor.dto.LoginResponse.createLoginResponseFor;
import static com.karolbystrek.tennispredictor.dto.UserResponse.createUserResponseFor;
import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    private final JwtService jwtService;
    private final AuthenticationService authService;


    @PostMapping(value = "/signup", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody SignupRequest request) {
        log.info("Received signup request: {}", request);
        User registeredUser = authService.registerUser(request);
        return ResponseEntity.ok(createUserResponseFor(registeredUser));
    }

    @PostMapping(value = "/login", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) throws UserNotFoundException {
        log.info("Received login request for user: {}", request.username());
        User authenticatedUser = authService.authenticate(request);
        JwtToken token = jwtService.generateToken(authenticatedUser);
        return ResponseEntity.ok(createLoginResponseFor(authenticatedUser, token));
    }
}
