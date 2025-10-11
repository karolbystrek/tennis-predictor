package com.karolbystrek.tennispredictor.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PredictionRequest(

        @NotNull(message = "Player 1 ID is required")
        Long player1Id,

        @NotNull(message = "Player 2 ID is required")
        Long player2Id,

        @NotBlank(message = "Surface is required")
        String surface,

        @NotBlank(message = "Tournament level is required")
        String tourneyLevel,

        @NotNull(message = "Best of is required")
        Integer bestOf,

        @JsonProperty(value = "round")
        String round
) {
}
