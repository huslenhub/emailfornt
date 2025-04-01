package com.emailService.emailWithGmail.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class GmailOutbox {
    private final GmailBox gmailBox;

    public GmailOutbox(GmailBox gmailBox) {
        this.gmailBox = gmailBox;
    }

    public List<Map<String, String>> getOutboxEmails() throws Exception {
        return gmailBox.getEmails("SENT");
    }
}
