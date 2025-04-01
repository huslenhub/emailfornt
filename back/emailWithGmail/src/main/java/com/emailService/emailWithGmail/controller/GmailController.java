package com.emailService.emailWithGmail.controller;

import com.emailService.emailWithGmail.service.GmailInbox;
import com.emailService.emailWithGmail.service.Gmailsend;
import com.emailService.emailWithGmail.service.GmailOutbox;
import com.emailService.emailWithGmail.service.GmailUserName;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/email")
public class GmailController {
    private final Gmailsend gmailsend;
    private final GmailOutbox gmailOutbox;
    private final GmailInbox gmailInbox;
    private final GmailUserName gmailUserName;

    public GmailController(Gmailsend gmailService, GmailInbox gmailInbox, GmailOutbox gmailOutbox, GmailUserName gmailUserName) {
        this.gmailsend = gmailService;
        this.gmailInbox = gmailInbox;
        this.gmailOutbox = gmailOutbox;
        this.gmailUserName = gmailUserName;  // 변수 초기화

    }

    @PostMapping(value = "/send", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> sendEmail(
            @RequestParam("recipient") String recipient,
            @RequestParam("subject") String subject,
            @RequestParam("body") String body,
            @RequestPart(value = "file", required = false) MultipartFile file) {
            try {
                String messageId = gmailsend.sendMail(recipient, subject, body, file);
                return ResponseEntity.ok("Email sent successfully! Message ID: " + messageId);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
            }
    }

    @GetMapping("/inbox")
    public ResponseEntity<List<Map<String, String>>> getInboxEmails() {
        try {
            return ResponseEntity.ok(gmailInbox.getInboxEmails());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/sent")
    public ResponseEntity<List<Map<String, String>>> getSentEmails() {
        try {
            return ResponseEntity.ok(gmailOutbox.getOutboxEmails());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/user")
    public ResponseEntity<String> getRecentEmailSender() {
        try {
            System.out.println("recent-email-sender");
            String emailSender = gmailUserName.getRecentEmailSender();
            return ResponseEntity.ok(emailSender); // 이메일 주소를 문자열로 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("오류 발생: " + e.getMessage());
        }
    }
}
