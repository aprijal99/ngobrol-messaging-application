package ngobrol.controller;

import ngobrol.dto.ChatDto;
import ngobrol.dto.GroupChatDto;
import ngobrol.dto.GroupMessageDto;
import ngobrol.dto.UserGroupDto;
import ngobrol.entity.GroupChat;
import ngobrol.entity.GroupMessage;
import ngobrol.entity.User;
import ngobrol.entity.UserGroup;
import ngobrol.service.GroupChatService;
import ngobrol.service.GroupMessageService;
import ngobrol.service.UserGroupService;
import ngobrol.service.UserService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/group")
public class GroupChatRestController {
    private final UserService userService;
    private final GroupChatService groupChatService;
    private final UserGroupService userGroupService;
    private final GroupMessageService groupMessageService;

    public GroupChatRestController(UserService userService, GroupChatService groupChatService, UserGroupService userGroupService, GroupMessageService groupMessageService) {
        this.userService = userService;
        this.groupChatService = groupChatService;
        this.userGroupService = userGroupService;
        this.groupMessageService = groupMessageService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGroupsByUser(@RequestParam(name = "email") String userEmail) {
        User user = userService.findUserByEmail(userEmail);

        List<UserGroup> userGroups = userGroupService.findUserGroupsByUser(user);
        List<GroupChat> groupChats = userGroupService.extractGroups(userGroups);
        List<GroupChatDto> groupChatDtoList = groupChatService.listEntityToListDto(groupChats);

        return ResponseUtil.withData(HttpStatus.FOUND, groupChatDtoList);
    }

    @GetMapping(path = "/chat", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGroupChatsByUser(@RequestParam(name = "email") String userEmail) {
        User user = userService.findUserByEmail(userEmail);

        List<UserGroup> userGroups = userGroupService.findUserGroupsByUser(user);
        List<GroupChat> groupChats = userGroupService.extractGroups(userGroups);
        List<GroupMessage> newestGroupMessages = groupMessageService.findGroupMessagesByGroupChatTopRecord(groupChats);
        Map<Integer, ChatDto> chat = groupMessageService.groupMessagesToChat(newestGroupMessages);

        return ResponseUtil.withData(HttpStatus.FOUND, chat);
    }

    @GetMapping(path = "/message", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGroupMessagesByGroupId(@RequestParam(name = "group_id") Integer groupId) {
        GroupChat groupChat = groupChatService.findGroupChatById(groupId);
        List<GroupMessage> groupMessages = groupMessageService.findGroupMessagesByGroupChat(groupChat);
        List<GroupMessageDto> groupMessageDtoList = groupMessageService.listEntityToListDto(groupMessages);

        return ResponseUtil.withData(HttpStatus.FOUND, groupMessageDtoList);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> newGroup(@RequestBody GroupChatDto groupChatDto) {
        GroupChat groupChat = groupChatService.dtoToEntity(groupChatDto);
        groupChatService.saveGroupChat(groupChat);

        return ResponseUtil.noData(HttpStatus.CREATED);
    }

    @PostMapping(path = "/assign-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> assignUserToGroup(@RequestBody UserGroupDto userGroupDto) {
        User user = userService.findUserByEmail(userGroupDto.getUserEmail());
        GroupChat groupChat = groupChatService.findGroupChatById(userGroupDto.getGroupChatId());

        UserGroup userGroup = userGroupService.dtoToEntity(user, groupChat);
        userGroupService.saveUserGroup(userGroup);

        return ResponseUtil.noData(HttpStatus.CREATED);
    }
}
