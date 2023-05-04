package ngobrol.entity;

import javax.persistence.*;

@Entity
public class UserGroup {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne @JoinColumn(name = "group_chat_id")
    private GroupChat groupChat;

    public UserGroup() {
    }

    public UserGroup( User user, GroupChat groupChat) {
        this.user = user;
        this.groupChat = groupChat;
    }

    public UserGroup(Integer id, User user, GroupChat groupChat) {
        this.id = id;
        this.user = user;
        this.groupChat = groupChat;
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

    public GroupChat getGroup() {
        return groupChat;
    }

    public void setGroupChat(GroupChat groupChat) {
        this.groupChat = groupChat;
    }

    @Override
    public String toString() {
        return "UserGroup{" +
                "id=" + id +
                ", user=" + user +
                ", groupChat=" + groupChat +
                '}';
    }
}
