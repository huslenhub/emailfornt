package com.emailService.emailWithGmail.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static com.google.api.services.gmail.GmailScopes.*;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.List;

@Configuration
public class GmailConfig {

    @Bean
    public Gmail gmailService() throws GeneralSecurityException, IOException {
        NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        GsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        Credential credential = getCredentials(httpTransport, jsonFactory);

        return new Gmail.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName("Test Mailer")
                .build();
    }

    private Credential getCredentials(final NetHttpTransport httpTransport, GsonFactory jsonFactory) throws IOException {
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(jsonFactory,
                new InputStreamReader(GmailConfig.class.getResourceAsStream("/client_secret_209037642716-e6nsbpane9pvl0bp3686bcnkgogkih1d.apps.googleusercontent.com.json")));

        List<String> SCOPES = List.of(GMAIL_SEND, GMAIL_READONLY);

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, jsonFactory, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(Paths.get("tokens").toFile()))
                .setAccessType("offline")
                .build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

}
