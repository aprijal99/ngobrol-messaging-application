package ngobrol.controller;

import ngobrol.dto.GroupMessageDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.*;
import ngobrol.service.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public GroupMessageDto receiveMessage(@Payload GroupMessageDto groupMessageDto, StompHeaderAccessor stompHeaderAccessor) {
        GroupChat groupChat = groupChatService.findGroupChatById(groupMessageDto.getGroupId());
        Map<String, Object> headers = new HashMap<>();

        if (groupMessageDto.getMessage().equals("")) {
            String messageType = stompHeaderAccessor.getNativeHeader("messageType").get(0);
            headers.put("messageType", messageType);

            if (messageType.equals("delete-group-member")) {
                String deletedMemberEmail = stompHeaderAccessor.getNativeHeader("deletedMemberEmail").get(0);
                headers.put("deletedMemberEmail", deletedMemberEmail);
            }
        } else {
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

            if (groupMessageDto.getMessage().equals("")) {
                simpMessagingTemplate.convertAndSend("/topic/" + userGroup.getUser().getEmail() + "-group", groupMessageDto, headers);
            } else {
                simpMessagingTemplate.convertAndSend("/topic/" + userGroup.getUser().getEmail() + "-group", groupMessageDto);
            }
        }

        return groupMessageDto;
    }

    @MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto messageDto, StompHeaderAccessor stompHeaderAccessor) {
        if (messageDto.getMessage().equals("")) {
            String messageType = stompHeaderAccessor.getNativeHeader("messageType").get(0);
            simpMessagingTemplate.convertAndSend("/topic/" + messageDto.getReceiverEmail(), messageDto, Map.of("messageType", messageType));
        } else {
            User sender = userService.findUserByEmail(messageDto.getSenderEmail());
            User receiver = userService.findUserByEmail(messageDto.getReceiverEmail());

            Message message = messageService.dtoToEntity(messageDto, sender, receiver);
            messageService.saveMessage(message);

            simpMessagingTemplate.convertAndSend("/topic/" + messageDto.getReceiverEmail(), messageDto);
        }

        return messageDto;
    }
}
