package ngobrol.dto;

public class ChatDto {
    private String message;
    private String fileUrl;
    private Long createdAt;
    private String contactOrGroupName;
    private String imageUrl;

    public ChatDto() {
    }

    public ChatDto(String message, String fileUrl, Long createdAt, String contactOrGroupName) {
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.contactOrGroupName = contactOrGroupName;
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

    public String getContactOrGroupName() {
        return contactOrGroupName;
    }

    public void setContactOrGroupName(String contactOrGroupName) {
        this.contactOrGroupName = contactOrGroupName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "ChatDto{" +
                "message='" + message + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", createdAt=" + createdAt +
                ", contactOrGroupName='" + contactOrGroupName + '\'' +
                '}';
    }
}
