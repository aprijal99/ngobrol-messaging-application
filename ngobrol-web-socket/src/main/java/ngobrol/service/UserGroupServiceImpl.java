package ngobrol.service;

import ngobrol.dto.UserGroupDto;
import ngobrol.entity.GroupChat;
import ngobrol.entity.User;
import ngobrol.entity.UserGroup;
import ngobrol.repository.UserGroupRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserGroupServiceImpl implements UserGroupService {
    private final UserGroupRepository userGroupRepository;

    public UserGroupServiceImpl(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @Override
    public void saveUserGroup(UserGroup userGroup) {
        userGroupRepository.save(userGroup);
    }

    @Override
    public List<UserGroup> findUserGroupsByUser(User user) {
        return userGroupRepository.findUserGroupsByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Groups not found"));
    }

    @Override
    public List<UserGroup> findUserGroupsByGroup(GroupChat groupChat) {
        return userGroupRepository.findUserGroupsByGroupChat(groupChat)
                .orElseThrow(() -> new EntityNotFoundException("Groups not found"));
    }

    @Override
    public List<GroupChat> extractGroups(List<UserGroup> userGroups) {
        return userGroups.stream().map(UserGroup::getGroup).collect(Collectors.toList());
    }

    @Override
    public UserGroup dtoToEntity(User user, GroupChat groupChat) {
        return new UserGroup(user, groupChat);
    }

    @Override
    public Integer deleteUserGroup(User user, GroupChat groupChat) {
        return userGroupRepository.deleteUserGroupByUserAndGroupChat(user, groupChat);
    }

    @Override
    public void deleteUserGroupsByGroupChat(GroupChat groupChat) {
        userGroupRepository.deleteUserGroupsByGroupChat(groupChat);
    }
}
