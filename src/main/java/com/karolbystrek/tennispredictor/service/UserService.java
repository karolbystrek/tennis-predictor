package com.karolbystrek.tennispredictor.service;

import com.karolbystrek.tennispredictor.exception.UserNotFoundException;
import com.karolbystrek.tennispredictor.model.User;
import com.karolbystrek.tennispredictor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public User getUserBy(String username) {
        log.info("Fetching user with username: {}", username);
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found", username));
    }
}
