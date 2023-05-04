package ngobrol.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 2000)
    private String message;
    private String fileUrl;
    private Timestamp createdAt;
    @ManyToOne @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne @JoinColumn(name = "receiver_id")
    private User receiver;

    public Message() {
    }

    public Message(String message, String fileUrl, Timestamp createdAt, User sender, User receiver) {
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.sender = sender;
        this.receiver = receiver;
    }

    public Message(Integer id, String message, String fileUrl, Timestamp createdAt, User sender, User receiver) {
        this.id = id;
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.sender = sender;
        this.receiver = receiver;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", createdAt=" + createdAt +
                ", sender=" + sender +
                ", receiver=" + receiver +
                '}';
    }
}
