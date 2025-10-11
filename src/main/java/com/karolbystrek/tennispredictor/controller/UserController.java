package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.UserResponse;
import com.karolbystrek.tennispredictor.model.User;
import com.karolbystrek.tennispredictor.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.karolbystrek.tennispredictor.dto.UserResponse.createFor;
import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @GetMapping(value = "/{username}", produces = APPLICATION_JSON)
    public ResponseEntity<UserResponse> getUser(@PathVariable String username) {
        log.info("Received request to get user with username: {}", username);
        User user = userService.getUserBy(username);
        return ResponseEntity.ok(createFor(user));
    }
}
