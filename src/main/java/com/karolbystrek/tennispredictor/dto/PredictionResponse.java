package com.karolbystrek.tennispredictor.dto;

public record PredictionResponse(
        String player1Name,
        String player2Name,
        Float player1WinProbability,
        Float player2WinProbability,
        String winnerName,
        Long winnerId,
        Float confidence
) {
}
