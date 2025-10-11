package com.karolbystrek.tennispredictor.exception;

import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException {

    private final String username;

    public UserNotFoundException(String message, String username) {
        super(message);
        this.username = username;
    }
}
