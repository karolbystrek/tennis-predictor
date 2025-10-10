package com.karolbystrek.tennispredictor.dto;

import lombok.Builder;

@Builder
public record LoginResponse(
        String token,
        Long expiresIn
) {
    public static LoginResponse createFor(String token, Long expiresIn) {
        return LoginResponse.builder()
                .token(token)
                .expiresIn(expiresIn)
                .build();
    }
}
