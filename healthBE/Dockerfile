# Temel image olarak OpenJDK kullanıyoruz
FROM openjdk:17-jdk-slim

# Çalışma dizini oluşturuyoruz
WORKDIR /app

# healthSystem.jar dosyasını Docker konteynerine kopyalıyoruz
COPY target/healthSystem-0.0.1-SNAPSHOT.jar /app/healthSystem.jar

# Konteyner başladığında çalışacak komutu belirtiyoruz
CMD ["java", "-jar", "/app/healthSystem.jar"]

# Konteynerin dinleyeceği portu açıyoruz
EXPOSE 8080
