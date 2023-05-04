package ngobrol.dto;

public class ContactDto {
    private String userEmail;
    private String contactEmail;

    public ContactDto() {
    }

    public ContactDto(String userEmail, String contactEmail) {
        this.userEmail = userEmail;
        this.contactEmail = contactEmail;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    @Override
    public String toString() {
        return "ContactDto{" +
                "userEmail='" + userEmail + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                '}';
    }
}
