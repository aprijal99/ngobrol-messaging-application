package ngobrol.service;

import ngobrol.dto.GroupChatDto;
import ngobrol.dto.UserDto;
import ngobrol.entity.GroupChat;
import ngobrol.entity.User;
import ngobrol.entity.UserGroup;
import ngobrol.repository.GroupChatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GroupChatServiceImpl implements GroupChatService {
    private final UserService userService;
    private final UserGroupService userGroupService;
    private final GroupChatRepository groupChatRepository;

    public GroupChatServiceImpl(UserService userService, UserGroupService userGroupService, GroupChatRepository groupChatRepository) {
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.groupChatRepository = groupChatRepository;
    }

    @Override
    public void saveGroupChat(GroupChat groupChat) {
        groupChatRepository.save(groupChat);
    }

    @Override
    public GroupChat findGroupChatById(Integer groupChatId) {
        return groupChatRepository.findGroupChatByGroupId(groupChatId).orElse(null);
    }

    @Override
    public void updateGroupChat(Integer groupId, GroupChatDto groupChatDto) {
        GroupChat groupChat = this.findGroupChatById(groupId);
        groupChat.setName(groupChatDto.getName());
        groupChat.setDescription(groupChatDto.getDescription());
        if (groupChatDto.getImageUrl() != null) groupChat.setImageUrl(groupChatDto.getImageUrl());

        groupChatRepository.save(groupChat);
    }

    @Override
    public GroupChat dtoToEntity(GroupChatDto groupChatDto) {
        return new GroupChat(groupChatDto.getName(), groupChatDto.getDescription(), groupChatDto.getImageUrl(), new Timestamp(groupChatDto.getCreatedAt()));
    }

    @Override
    public GroupChatDto entityToDto(GroupChat groupChat) {
        List<UserGroup> userGroupsByGroup = userGroupService.findUserGroupsByGroup(groupChat);
        List<User> users = userGroupsByGroup.stream().map(UserGroup::getUser).collect(Collectors.toList());
        List<UserDto> userDtoList = userService.listEntityToListDto(users);
        Integer userNumber = userGroupsByGroup.size();

        return new GroupChatDto(groupChat.getGroupId(), groupChat.getName(), groupChat.getDescription(), groupChat.getImageUrl(), userNumber, userDtoList, groupChat.getCreatedAt().getTime());
    }

    @Override
    public List<GroupChatDto> listEntityToListDto(List<GroupChat> groupChats) {
        return groupChats.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }
}
