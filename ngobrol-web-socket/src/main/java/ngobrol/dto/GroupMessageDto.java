package ngobrol.dto;

public class GroupMessageDto {
    private String message;
    private String fileUrl;
    private Long createdAt;
    private String senderEmail;
    private String senderName;
    private String imageUrl;
    private Integer groupId;

    public GroupMessageDto() {
    }

    public GroupMessageDto(String message, String fileUrl, Long createdAt, String senderEmail, String senderName, String imageUrl, Integer groupId) {
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.senderEmail = senderEmail;
        this.senderName = senderName;
        this.imageUrl = imageUrl;
        this.groupId = groupId;
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

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "GroupMessageDto{" +
                "message='" + message + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", createdAt=" + createdAt +
                ", senderEmail='" + senderEmail + '\'' +
                ", senderName='" + senderName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", groupId=" + groupId +
                '}';
    }
}
