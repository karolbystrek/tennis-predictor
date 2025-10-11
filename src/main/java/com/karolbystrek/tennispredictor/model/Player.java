package com.karolbystrek.tennispredictor.model;

import com.karolbystrek.tennispredictor.dto.PlayerRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

import static jakarta.persistence.GenerationType.IDENTITY;
import static java.time.LocalDate.now;

@Entity
@Table(name = "players")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Player {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "player_id")
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "hand", nullable = false)
    private String hand;

    @Column(name = "dob", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "ioc", nullable = false)
    private String ioc;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "rank_points")
    private Integer rankPoints;

    @Column(name = "elo", nullable = false)
    private Integer elo;

    @Column(name = "elo_hard", nullable = false)
    private Integer eloHard;

    @Column(name = "elo_grass", nullable = false)
    private Integer eloGrass;

    @Column(name = "elo_carpet", nullable = false)
    private Integer eloCarpet;

    @Column(name = "elo_clay", nullable = false)
    private Integer eloClay;

    public static Player createFrom(PlayerRequest request) {
        return Player.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .hand(request.hand())
                .dateOfBirth(request.dateOfBirth())
                .ioc(request.ioc())
                .height(request.height())
                .age(calculateAge(request.dateOfBirth()))
                .elo(request.elo())
                .eloHard(request.eloHard())
                .eloGrass(request.eloGrass())
                .eloCarpet(request.eloCarpet())
                .eloClay(request.eloClay())
                .build();
    }

    public void updateFrom(PlayerRequest request) {
        this.firstName = request.firstName();
        this.lastName = request.lastName();
        this.hand = request.hand();
        this.dateOfBirth = request.dateOfBirth();
        this.ioc = request.ioc();
        this.height = request.height();
        this.age = calculateAge(request.dateOfBirth());
        this.elo = request.elo();
        this.eloHard = request.eloHard();
        this.eloGrass = request.eloGrass();
        this.eloCarpet = request.eloCarpet();
        this.eloClay = request.eloClay();
    }

    private static Integer calculateAge(LocalDate dateOfBirth) {
        return Period.between(dateOfBirth, now()).getYears();
    }
}
