package com.karolbystrek.tennispredictor.dto;

import com.karolbystrek.tennispredictor.model.JwtToken;
import com.karolbystrek.tennispredictor.model.User;
import lombok.Builder;

import static com.karolbystrek.tennispredictor.dto.UserResponse.createUserResponseFor;

@Builder
public record LoginResponse(
        UserResponse user,
        JwtToken jwtToken
) {
    public static LoginResponse createLoginResponseFor(User user, JwtToken token) {
        return LoginResponse.builder()
                .user(createUserResponseFor(user))
                .jwtToken(token)
                .build();
    }
}
