package ngobrol.controller;

import ngobrol.dto.GroupMessageDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.*;
import ngobrol.service.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;
    private final MessageService messageService;
    private final GroupChatService groupChatService;
    private final UserGroupService userGroupService;
    private final GroupMessageService groupMessageService;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate, UserService userService,
                             MessageService messageService,
                             GroupChatService groupChatService,
                             UserGroupService userGroupService, GroupMessageService groupMessageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userService = userService;
        this.messageService = messageService;
        this.groupChatService = groupChatService;
        this.userGroupService = userGroupService;
        this.groupMessageService = groupMessageService;
    }

    @MessageMapping("/group-message")
    public GroupMessageDto receiveMessage(@Payload GroupMessageDto groupMessageDto) {
        GroupChat groupChat = groupChatService.findGroupChatById(groupMessageDto.getGroupId());

        if (!groupMessageDto.getMessage().equals("")) {
            User sender = userService.findUserByEmail(groupMessageDto.getSenderEmail());
            groupMessageDto.setSenderName(sender.getName());
            groupMessageDto.setImageUrl(sender.getImageUrl());

            GroupMessage groupMessage = groupMessageService.dtoToEntity(groupMessageDto, sender, groupChat);
            groupMessageService.saveGroupMessage(groupMessage);
        }

        List<UserGroup> userGroups = userGroupService.findUserGroupsByGroup(groupChat);
        for(UserGroup userGroup: userGroups) {
            if(userGroup.getUser().getEmail().equals(groupMessageDto.getSenderEmail())) {
                continue;
            }

            simpMessagingTemplate.convertAndSend("/topic/" + userGroup.getUser().getEmail() + "-group", groupMessageDto);
        }

        return groupMessageDto;
    }

    @MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto messageDto) {
        User sender = userService.findUserByEmail(messageDto.getSenderEmail());
        User receiver = userService.findUserByEmail(messageDto.getReceiverEmail());

        if (!messageDto.getMessage().equals("")) {
            Message message = messageService.dtoToEntity(messageDto, sender, receiver);
            messageService.saveMessage(message);
        }

        simpMessagingTemplate.convertAndSend("/topic/" + messageDto.getReceiverEmail(), messageDto);

        return messageDto;
    }
}
