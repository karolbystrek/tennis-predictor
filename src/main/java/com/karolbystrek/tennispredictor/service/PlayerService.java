package com.karolbystrek.tennispredictor.service;

import com.karolbystrek.tennispredictor.dto.PlayerRequest;
import com.karolbystrek.tennispredictor.exception.PlayerNotFoundException;
import com.karolbystrek.tennispredictor.model.Player;
import com.karolbystrek.tennispredictor.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerService {

    private final PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayerById(Long playerId) {
        return playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with ID: " + playerId, playerId));
    }

    @Transactional
    public Player createPlayer(PlayerRequest request) {
        Player player = Player.createFrom(request);
        return playerRepository.save(player);
    }

    @Transactional
    public Player updatePlayer(Long playerId, PlayerRequest request) {
        Player existingPlayer = playerRepository
                .findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with ID: " + playerId, playerId));

        existingPlayer.updateFrom(request);

        return playerRepository.save(existingPlayer);
    }

    public void deletePlayer(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException("Player not found with ID: " + playerId, playerId);
        }
        playerRepository.deleteById(playerId);
    }
}
