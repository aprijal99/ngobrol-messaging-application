package ngobrol.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class GroupChat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;
    @Column(nullable = false, length = 100)
    private String name;
    private String description;
    private String imageUrl;
    private Timestamp createdAt;

    public GroupChat() {
    }

    public GroupChat(String name, String description, String imageUrl, Timestamp createdAt) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    public GroupChat(Integer groupId, String name, String description, String imageUrl, Timestamp createdAt) {
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "GroupChat{" +
                "id=" + groupId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
