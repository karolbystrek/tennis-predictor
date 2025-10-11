package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.PlayerRequest;
import com.karolbystrek.tennispredictor.model.Player;
import com.karolbystrek.tennispredictor.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private static final Logger log = LoggerFactory.getLogger(PlayerController.class);

    private final PlayerService playerService;

    @GetMapping(produces = APPLICATION_JSON)
    public ResponseEntity<List<Player>> getAllPlayers() {
        log.info("Fetching all players");
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    @GetMapping(value = "/{playerId}", produces = APPLICATION_JSON)
    public ResponseEntity<Player> getPlayerById(@PathVariable Long playerId) {
        log.info("Fetching player with ID: {}", playerId);
        var Player = playerService.getPlayerById(playerId);
        return ResponseEntity.ok(Player);
    }

    @PostMapping(consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<Player> createPlayer(@Valid @RequestBody PlayerRequest request) {
        log.info("Creating player for request: {}", request);
        final var newPlayer = playerService.createPlayer(request);
        return ResponseEntity.status(CREATED).body(newPlayer);
    }

    @PutMapping(value = "/{playerId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<Player> updatePlayer(@PathVariable Long playerId, @Valid @RequestBody PlayerRequest request) {
        log.info("Updating player with ID: {} for request: {}", playerId, request);
        final var updatedPlayer = playerService.updatePlayer(playerId, request);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping(value = "/{playerId}", produces = APPLICATION_JSON)
    public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
        log.info("Deleting player with ID: {}", playerId);
        playerService.deletePlayer(playerId);
        return ResponseEntity.noContent().build();
    }
}
