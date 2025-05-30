########################################
# 1) Build the JAR with Maven + JDK21 #
########################################
FROM maven:3.10.1-eclipse-temurin-21 AS build

WORKDIR /workspace
COPY pom.xml mvnw ./
COPY .mvn ./
COPY src ./src

# Download dependencies & build
RUN ./mvnw clean package -DskipTests

########################################
# 2) Create a slim runtime image      #
########################################
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the fat JAR from the build stage
COPY --from=build /workspace/target/top_movies-0.0.1-SNAPSHOT.jar ./app.jar

# Expose Spring Boot’s default port
EXPOSE 8080

# Launch the app
ENTRYPOINT ["java","-jar","app.jar"]
