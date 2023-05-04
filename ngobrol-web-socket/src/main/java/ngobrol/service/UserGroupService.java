package ngobrol.service;

import ngobrol.entity.GroupChat;
import ngobrol.entity.User;
import ngobrol.entity.UserGroup;

import java.util.List;

public interface UserGroupService {
    void saveUserGroup(UserGroup userGroup);
    List<UserGroup> findUserGroupsByUser(User user);
    List<UserGroup> findUserGroupsByGroup(GroupChat groupChat);
    List<GroupChat> extractGroups(List<UserGroup> userGroups);
    UserGroup dtoToEntity(User user, GroupChat groupChat);
}
