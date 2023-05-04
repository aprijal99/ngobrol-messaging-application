package ngobrol.dto;

public class MessageDto implements Comparable<MessageDto> {
    private String message;
    private String fileUrl;
    private Long createdAt;
    private String senderEmail;
    private String receiverEmail;

    public MessageDto() {
    }

    public MessageDto(String message, String fileUrl, Long createdAt, String senderEmail, String receiverEmail) {
        this.message = message;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
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

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    @Override
    public int compareTo(MessageDto o) {
        return this.createdAt.compareTo(o.getCreatedAt());
    }

    @Override
    public String toString() {
        return "MessageDto{" +
                "message='" + message + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", createdAt=" + createdAt +
                ", senderEmail='" + senderEmail + '\'' +
                ", receiverEmail='" + receiverEmail + '\'' +
                '}';
    }
}
