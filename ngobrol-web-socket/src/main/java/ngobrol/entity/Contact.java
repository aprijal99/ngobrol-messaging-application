package ngobrol.entity;

import javax.persistence.*;

@Entity
public class Contact {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne @JoinColumn(name = "contact_id")
    private User contact;

    public Contact() {
    }

    public Contact(User user, User contact) {
        this.user = user;
        this.contact = contact;
    }

    public Contact(Integer id, User user, User contact) {
        this.id = id;
        this.user = user;
        this.contact = contact;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getContact() {
        return contact;
    }

    public void setContact(User contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", user=" + user +
                ", contact=" + contact +
                '}';
    }
}
