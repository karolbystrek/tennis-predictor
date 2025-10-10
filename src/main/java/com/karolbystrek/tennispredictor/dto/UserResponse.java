package com.karolbystrek.tennispredictor.dto;

import com.karolbystrek.tennispredictor.model.User;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse(
        String username,
        String email,
        LocalDateTime createdAt
) {
    public static UserResponse createFor(User user) {
        return UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
