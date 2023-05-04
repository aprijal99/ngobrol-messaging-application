package ngobrol.dto;

public class UserGroupDto {
    private String userEmail;
    private Integer groupChatId;

    public UserGroupDto() {
    }

    public UserGroupDto(String userEmail, Integer groupChatId) {
        this.userEmail = userEmail;
        this.groupChatId = groupChatId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getGroupChatId() {
        return groupChatId;
    }

    public void setGroupChatId(Integer groupChatId) {
        this.groupChatId = groupChatId;
    }

    @Override
    public String toString() {
        return "UserGroupDto{" +
                "userEmail='" + userEmail + '\'' +
                ", groupChatId=" + groupChatId +
                '}';
    }
}
