package com.karolbystrek.tennispredictor.controller;

import com.karolbystrek.tennispredictor.dto.PlayerRequest;
import com.karolbystrek.tennispredictor.model.Player;
import com.karolbystrek.tennispredictor.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping(produces = APPLICATION_JSON)
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    @PostMapping(consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<Player> createPlayer(@Valid @RequestBody PlayerRequest request) {
        final var createdPlayer = playerService.createPlayer(request);
        return ResponseEntity.status(CREATED).body(createdPlayer);
    }

    @PutMapping(value = "/{playerId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<Player> updatePlayer(@PathVariable Long playerId, @Valid @RequestBody PlayerRequest request) {
        final var updatedPlayer = playerService.updatePlayer(playerId, request);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping(value = "/{playerId}", produces = APPLICATION_JSON)
    public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.noContent().build();
    }
}
