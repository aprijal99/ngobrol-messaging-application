#FROM rabbitmq:3.9.29-management
#RUN rabbitmq-plugins enable --offline rabbitmq_stomp
#EXPOSE 61613

FROM maven:3.9.1-eclipse-temurin-11-alpine as package
WORKDIR package
COPY . .
RUN mvn clean install package spring-boot:repackage

FROM eclipse-temurin:11-jre-alpine as extract
WORKDIR extract
COPY --from=package package/target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:11-jre-alpine
WORKDIR application
COPY --from=extract extract/dependencies/ ./
COPY --from=extract extract/spring-boot-loader/ ./
COPY --from=extract extract/snapshot-dependencies/ ./
COPY --from=extract extract/application/ ./

RUN mkdir "/images"
COPY ./images/ /images/

EXPOSE 8080

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]