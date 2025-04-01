package com.emailService.emailWithGmail.service;

import org.springframework.stereotype.Service;


@Service
public class GmailUserName {
    private final GmailBox gmailBox;

    public GmailUserName(GmailBox gmailBox) {
        this.gmailBox = gmailBox;
    }

    public String getRecentEmailSender() {
        try {
            return gmailBox.getRecentEmailSender();
        } catch (Exception e) {
            return "오류 발생: " + e.getMessage();
        }
    }

}
