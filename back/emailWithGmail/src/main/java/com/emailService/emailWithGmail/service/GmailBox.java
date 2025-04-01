package com.emailService.emailWithGmail.service;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePart;
import com.google.api.services.gmail.model.MessagePartHeader;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GmailBox {

    private final Gmail gmail;

    public GmailBox(Gmail gmail) {
        this.gmail = gmail;
    }

    public List<Map<String, String>> getEmails(String label) throws Exception {

        List<Map<String, String>> emailsList = new ArrayList<>();

        ListMessagesResponse response;

            response = gmail.users().messages()
                    .list("me")
                    .setLabelIds(Collections.singletonList(label))
                    .setMaxResults(10L)
                    .execute();

        if (response.getMessages() == null) {

            return emailsList;
        }

        int emailsCount = Math.min(10, response.getMessages().size());

        for (int i = 0; i < emailsCount; i++) {

            Message message = response.getMessages().get(i);
            Message fullMessage = gmail.users().messages().get("me", message.getId()).execute();


            String target = label.equals("INBOX") ? getHeader(fullMessage, "From") : getHeader(fullMessage, "To");
            String subject = getHeader(fullMessage, "Subject");
            String date = getHeader(fullMessage, "Date").replaceAll(" \\-\\d{4}", "");
            String body = getBody(fullMessage);

            Map<String, String> emailData = new HashMap<>();
            emailData.put("id", fullMessage.getId());
            emailData.put(label.equals("INBOX") ? "from" : "to", target);
            emailData.put("subject", subject);
            emailData.put("date", date);
            emailData.put("body", body);

            emailsList.add(emailData);
        }
        return emailsList;
    }

    private String getHeader(Message message, String headerName) {
        for (MessagePartHeader header : message.getPayload().getHeaders()) {
            if (header.getName().equalsIgnoreCase(headerName)) {
                return header.getValue();
            }
        }
        return "N/A";
    }

    private String getBody(Message message) {
        if (message.getPayload().getBody() != null && message.getPayload().getBody().getData() != null) {
            return decodeBase64(message.getPayload().getBody().getData());
        }
        if (message.getPayload().getParts() != null) {
            for (MessagePart part : message.getPayload().getParts()) {
                if (part.getMimeType().equalsIgnoreCase("text/plain")) {
                    return decodeBase64(part.getBody().getData());
                } else if (part.getMimeType().equalsIgnoreCase("text/html")) {
                    return decodeBase64(part.getBody().getData());
                }
            }
        }
        return "No Body content";
    }

    private String decodeBase64(String encodedText) {
        return new String(Base64.getUrlDecoder().decode(encodedText));
    }
}