package com.emailService.emailWithGmail.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class GmailInbox {
    private final GmailBox gmailBox;

    public GmailInbox(GmailBox gmailBox) {
        this.gmailBox = gmailBox;
    }

    public List<Map<String, String>> getInboxEmails() throws Exception {
        return gmailBox.getEmails("INBOX");
    }
}
