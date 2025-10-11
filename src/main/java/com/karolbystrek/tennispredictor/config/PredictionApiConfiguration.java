package com.karolbystrek.tennispredictor.config;

import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import static io.netty.channel.ChannelOption.CONNECT_TIMEOUT_MILLIS;
import static java.time.Duration.ofSeconds;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Configuration
@Getter
public class PredictionApiConfiguration {

    private static final int CONNECTION_TIMEOUT_MILLIS = 5000;
    private static final int READ_TIMEOUT_SECONDS = 10;
    private static final int WRITE_TIMEOUT_SECONDS = 10;
    private static final int MAX_IN_MEMORY_SIZE = 16 * 1024 * 1024; // 16MB

    @Value("${tennis.predictor.api.base-url}")
    private String baseUrl;

    @Value("${tennis.predictor.api.key}")
    private String key;

    @Value("${tennis.predictor.api.predict-path}")
    private String predictPath;

    @Bean(name = "predictionApiWebClient")
    public WebClient predictionApiWebClient() {
        HttpClient httpClient = HttpClient.create()
                .option(CONNECT_TIMEOUT_MILLIS, CONNECTION_TIMEOUT_MILLIS)
                .responseTimeout(ofSeconds(READ_TIMEOUT_SECONDS))
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(READ_TIMEOUT_SECONDS, SECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(WRITE_TIMEOUT_SECONDS, SECONDS)))
                .secure();

        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(MAX_IN_MEMORY_SIZE))
                .build();

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .exchangeStrategies(strategies)
                .defaultHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .defaultHeader(ACCEPT, APPLICATION_JSON_VALUE)
                .defaultHeader("X-API-Key", key)
                .build();
    }
}
