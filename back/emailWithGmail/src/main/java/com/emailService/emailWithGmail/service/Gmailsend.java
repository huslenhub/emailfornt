

package com.emailService.emailWithGmail.service;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.Properties;

import static javax.mail.Message.RecipientType.TO;

@Service
public class Gmailsend {
    private static final String SENDER_EMAIL = "khuslenonlytube@gmail.com";
    private final Gmail gmail;

    public Gmailsend(Gmail gmail) {
        this.gmail = gmail;
    }

    public String sendMail(String recipient, String subject, String body, MultipartFile file) throws Exception {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);
        MimeMessage email = new MimeMessage(session);
        email.setFrom(new InternetAddress(SENDER_EMAIL));
        email.addRecipient(TO, new InternetAddress(recipient));
        email.setSubject(subject);

        MimeBodyPart textPart = new MimeBodyPart();
        textPart.setText(body, "UTF-8");

        MimeMultipart multiPart = new MimeMultipart();
        multiPart.addBodyPart(textPart);

        if(file != null && !file.isEmpty()) {

            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            File uploadFolder = new File(uploadDir);

            // 폴더가 존재하지 않으면 생성
            if (!uploadFolder.exists()) {
                boolean created = uploadFolder.mkdirs(); // 디렉토리 생성
                if (!created) {
                    throw new IOException("❌ 디렉토리 생성 실패: " + uploadDir);
                }
            }

            Path filePath = Path.of(uploadDir, file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("📎 첨부 파일 저장 경로: " + filePath.toAbsolutePath());

            MimeBodyPart filePart = new MimeBodyPart();
            filePart.setDataHandler(new DataHandler(new FileDataSource(filePath.toFile())));
            filePart.setFileName(file.getOriginalFilename());
            multiPart.addBodyPart(filePart);
        }

        email.setContent(multiPart);


        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        email.writeTo(buffer);
        byte[] rawMessageBytes = buffer.toByteArray();
        String encodedEmail = Base64.encodeBase64URLSafeString(rawMessageBytes);
        Message msg = new Message();
        msg.setRaw(encodedEmail);

        msg = gmail.users().messages().send("me", msg).execute();
        FileCleaner.deleteAllFilesInUploads();

        return msg.getId();
    }

    public class FileCleaner {
        public static void deleteAllFilesInUploads() {
            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            File uploadFolder = new File(uploadDir);

            if (uploadFolder.exists() && uploadFolder.isDirectory()) {
                File[] files = uploadFolder.listFiles();
                if (files != null) {
                    for (File file : files) {
                        try {
                            Files.delete(file.toPath());
                            System.out.println("✅ 삭제됨: " + file.getName());
                        } catch (IOException e) {
                            System.err.println("❌ 파일 삭제 실패: " + file.getName());
                        }
                    }
                }
            }
        }
    }


}
