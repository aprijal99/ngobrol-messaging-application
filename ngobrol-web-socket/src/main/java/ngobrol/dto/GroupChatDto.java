package ngobrol.dto;

import java.util.List;

public class GroupChatDto {
    private Integer groupId;
    private String name;
    private String description;
    private String imageUrl;
    private Integer userNumber;
    private List<UserDto> users;
    private Long createdAt;

    public GroupChatDto() {
    }

    public GroupChatDto(Integer groupId, String name, String description, String imageUrl, Long createdAt) {
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    public GroupChatDto(Integer groupId, String name, String description, String imageUrl, Integer userNumber, List<UserDto> users, Long createdAt) {
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userNumber = userNumber;
        this.users = users;
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

    public Integer getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(Integer userNumber) {
        this.userNumber = userNumber;
    }

    public List<UserDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserDto> users) {
        this.users = users;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "GroupChatDto{" +
                "groupId=" + groupId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", userNumber=" + userNumber +
                ", users=" + users +
                ", createdAt=" + createdAt +
                '}';
    }
}
