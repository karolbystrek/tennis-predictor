package com.karolbystrek.tennispredictor.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PlayerRequest(

        @NotBlank(message = "First name is required")
        @Size(min = 1, max = 100, message = "First name must be between 1 and 100 characters")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(min = 1, max = 100, message = "Last name must be between 1 and 100 characters")
        String lastName,

        @NotBlank(message = "Hand is required")
        @Pattern(regexp = "^[LRU]$", message = "Hand must be 'L' (Left), 'R' (Right), or 'U' (Unknown)")
        String hand,

        @NotNull(message = "Date of birth is required")
        @Past(message = "Date of birth must be in the past")
        LocalDate dateOfBirth,

        @NotBlank(message = "IOC country code is required")
        @Size(min = 3, max = 3, message = "IOC code must be exactly 3 characters")
        @Pattern(regexp = "^[A-Z]{3}$", message = "IOC code must be 3 uppercase letters")
        String ioc,

        @NotNull(message = "Height is required")
        @Min(value = 100, message = "Height must be at least 100 cm")
        @Max(value = 250, message = "Height must be at most 250 cm")
        Integer height,

        @NotNull(message = "ELO rating is required")
        @Min(value = 1000, message = "ELO must be at least 1000")
        @Max(value = 3000, message = "ELO must be at most 3000")
        Integer elo,

        @NotNull(message = "ELO Hard rating is required")
        @Min(value = 1000, message = "ELO Hard must be at least 1000")
        @Max(value = 3000, message = "ELO Hard must be at most 3000")
        Integer eloHard,

        @NotNull(message = "ELO Grass rating is required")
        @Min(value = 1000, message = "ELO Grass must be at least 1000")
        @Max(value = 3000, message = "ELO Grass must be at most 3000")
        Integer eloGrass,

        @NotNull(message = "ELO Carpet rating is required")
        @Min(value = 1000, message = "ELO Carpet must be at least 1000")
        @Max(value = 3000, message = "ELO Carpet must be at most 3000")
        Integer eloCarpet,

        @NotNull(message = "ELO Clay rating is required")
        @Min(value = 1000, message = "ELO Clay must be at least 1000")
        @Max(value = 3000, message = "ELO Clay must be at most 3000")
        Integer eloClay
) {
}
