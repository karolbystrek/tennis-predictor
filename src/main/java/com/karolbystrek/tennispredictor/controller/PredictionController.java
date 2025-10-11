package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.PredictionRequest;
import com.karolbystrek.tennispredictor.dto.PredictionResponse;
import com.karolbystrek.tennispredictor.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<PredictionResponse> makePrediction(@Valid @RequestBody PredictionRequest request) {
        var response = predictionService.makePredictionFor(request);
        return ResponseEntity.ok(response);
    }
}
