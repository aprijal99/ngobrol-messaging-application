package ngobrol.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class GroupMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 2000)
    private String message;
    private String fileUrl;
    private Timestamp createdAt;
    @ManyToOne @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne @JoinColumn(name = "group_id")
    private GroupChat groupChat;

    public GroupMessage() {
    }

    public GroupMessage(String message, String fileUrl, Timestamp createdAt, User sender, GroupChat groupChat) {
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.sender = sender;
        this.groupChat = groupChat;
    }

    public GroupMessage(Integer id, String message, String fileUrl, Timestamp createdAt, User sender, GroupChat groupChat) {
        this.id = id;
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.sender = sender;
        this.groupChat = groupChat;
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

    public GroupChat getGroupChat() {
        return groupChat;
    }

    public void setGroupChat(GroupChat groupChat) {
        this.groupChat = groupChat;
    }

    @Override
    public String toString() {
        return "GroupMessage{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", createdAt=" + createdAt +
                ", sender=" + sender +
                ", group=" + groupChat +
                '}';
    }
}
