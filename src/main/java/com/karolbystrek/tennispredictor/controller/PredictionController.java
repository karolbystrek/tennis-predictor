package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.PredictionRequest;
import com.karolbystrek.tennispredictor.dto.PredictionResponse;
import com.karolbystrek.tennispredictor.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping(consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<PredictionResponse> makePrediction(@Valid @RequestBody PredictionRequest request) {
        var response = predictionService.makePredictionFor(request);
        return ResponseEntity.ok(response);
    }
}
