package com.example.xuanproject.S3;

import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.access-key}")
    private String accessKey;

    @Value("${aws.s3.secret-key}")
    private String secretKey;

    private S3Client s3Client;

    @PostConstruct
    public void init() {
        s3Client = S3Client.builder()
            .region(Region.of(region))
            .credentialsProvider(
                StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
            )
            .build();
    }

    public String upload(String folder, String originalFilename, InputStream inputStream, long contentLength, String contentType) {
        String key = folder + "/" + UUID.randomUUID() + "_" + originalFilename;

        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucket)
            .key(key)
            .contentType(contentType)
            // .acl(ObjectCannedACL.PUBLIC_READ) // 讓上傳的圖片可以公開預覽
            .build();

        s3Client.putObject(request, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(inputStream, contentLength));
        return "https://" + bucket + ".s3." + region + ".amazonaws.com/" + key;
    }

    public void delete(String fileUrl) {
        // 從 URL 取得 key（移除前面的 bucket 網址）
        String prefix = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        if (!fileUrl.startsWith(prefix)) {
            System.out.println("⛔ URL prefix 不符，跳過刪除");
            return;
        }
        String key = fileUrl.substring(prefix.length());
        System.out.println("🗑️ 嘗試刪除 S3 物件: " + key);

        System.out.println("Delete URL: " + fileUrl);
        System.out.println("Expected prefix: " + prefix);
        System.out.println("Key: " + key);

        s3Client.deleteObject(builder -> builder
            .bucket(bucket)
            .key(key)
            .build());
    }

    public void deleteFolderObjects(String folder) {

        String folderPrefix = folder.endsWith("/") ? folder : folder + "/";
    
        System.out.println("🧹 準備刪除 S3 資料夾下所有物件: " + folder);
    
        // 找出所有以 folder 為前綴的物件
        var listResponse = s3Client.listObjectsV2(builder -> builder
            .bucket(bucket)
            .prefix(folderPrefix)
            .build());
    
        listResponse.contents().forEach(obj -> {
            System.out.println("🗑️ 刪除物件: " + obj.key());
    
            s3Client.deleteObject(deleteBuilder -> deleteBuilder
                .bucket(bucket)
                .key(obj.key())
                .build());
        });
    
        if (listResponse.contents().isEmpty()) {
            System.out.println("📂 沒有物件需要刪除");
        }
    }
    
    
}
