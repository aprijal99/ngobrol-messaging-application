package ngobrol.controller;

import ngobrol.dto.GroupMessageDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.*;
import ngobrol.service.*;
import org.springframework.amqp.rabbit.core.RabbitMessagingTemplate;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MessageController {
    private final RabbitMessagingTemplate rabbitMessagingTemplate;
    private final UserService userService;
    private final MessageService messageService;
    private final GroupChatService groupChatService;
    private final UserGroupService userGroupService;
    private final GroupMessageService groupMessageService;

    public MessageController(RabbitMessagingTemplate rabbitMessagingTemplate,
                             UserService userService,
                             MessageService messageService,
                             GroupChatService groupChatService,
                             UserGroupService userGroupService, GroupMessageService groupMessageService) {
        this.rabbitMessagingTemplate = rabbitMessagingTemplate;
        this.userService = userService;
        this.messageService = messageService;
        this.groupChatService = groupChatService;
        this.userGroupService = userGroupService;
        this.groupMessageService = groupMessageService;

        this.rabbitMessagingTemplate.setMessageConverter(new MappingJackson2MessageConverter());
    }

    @MessageMapping("/group-message")
    public GroupMessageDto receiveMessage(@Payload GroupMessageDto groupMessageDto) {
        User sender = userService.findUserByEmail(groupMessageDto.getSenderEmail());
        GroupChat groupChat = groupChatService.findGroupChatById(groupMessageDto.getGroupId());

        GroupMessage groupMessage = groupMessageService.dtoToEntity(groupMessageDto, sender, groupChat);
        groupMessageService.saveGroupMessage(groupMessage);

        groupMessageDto.setSenderName(sender.getName());
        groupMessageDto.setImageUrl(sender.getImageUrl());

        List<UserGroup> userGroups = userGroupService.findUserGroupsByGroup(groupChat);
        for(UserGroup userGroup: userGroups) {
            if(userGroup.getUser().getEmail().equals(groupMessageDto.getSenderEmail())) {
                continue;
            }

            rabbitMessagingTemplate.convertAndSend("amq.direct", userGroup.getUser().getEmail() + "-group", groupMessageDto);
        }

        return groupMessageDto;
    }

    @MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto messageDto) {
        User sender = userService.findUserByEmail(messageDto.getSenderEmail());
        User receiver = userService.findUserByEmail(messageDto.getReceiverEmail());

        Message message = messageService.dtoToEntity(messageDto, sender, receiver);
        messageService.saveMessage(message);

        rabbitMessagingTemplate.convertAndSend("amq.direct", messageDto.getReceiverEmail(), messageDto);

        return messageDto;
    }
}
