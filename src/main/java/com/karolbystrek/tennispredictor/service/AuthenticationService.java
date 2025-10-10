package com.karolbystrek.tennispredictor.service;

import com.karolbystrek.tennispredictor.dto.LoginRequest;
import com.karolbystrek.tennispredictor.dto.SignupRequest;
import com.karolbystrek.tennispredictor.exception.UserNotFoundException;
import com.karolbystrek.tennispredictor.model.User;
import com.karolbystrek.tennispredictor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.karolbystrek.tennispredictor.model.User.Role.USER;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User registerUser(SignupRequest request) {
        final User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(USER)
                .build();

        return userRepository.save(user);
    }

    public User authenticate(LoginRequest request) throws UserNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                ));

        return userRepository
                .findByUsername(request.username())
                .orElseThrow(() -> new UserNotFoundException("User not found", request.username()));
    }
}
