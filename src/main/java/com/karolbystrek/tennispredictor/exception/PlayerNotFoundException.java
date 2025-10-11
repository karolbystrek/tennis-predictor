package com.karolbystrek.tennispredictor.exception;

import lombok.Getter;

@Getter
public class PlayerNotFoundException extends RuntimeException {
    private final long playerId;

    public PlayerNotFoundException(String message, long playerId) {
        super(message);
        this.playerId = playerId;
    }
}
