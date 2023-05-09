package ngobrol.repository;

import ngobrol.entity.GroupChat;
import ngobrol.entity.User;
import ngobrol.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserGroupRepository extends JpaRepository<UserGroup, Integer> {
    Optional<List<UserGroup>> findUserGroupsByUser(User user);
    Optional<List<UserGroup>> findUserGroupsByGroupChat(GroupChat groupChat);
    void deleteUserGroupByUserAndGroupChat(User user, GroupChat groupChat);
}
