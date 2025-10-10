package com.karolbystrek.tennispredictor.exception;

import lombok.Getter;

@Getter
public class UserNotFoundException extends Exception {

    private final String userEmail;

    public UserNotFoundException(String message, String username) {
        super(message);
        this.userEmail = username;
    }
}
