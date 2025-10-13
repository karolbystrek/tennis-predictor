package com.karolbystrek.tennispredictor.model;

public record JwtToken(
        String value,
        Long expiresIn
) {
}
