package ngobrol.controller;

import ngobrol.dto.ChatDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.Message;
import ngobrol.entity.User;
import ngobrol.service.MessageService;
import ngobrol.service.UserService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/message")
@CrossOrigin(origins = {"http://localhost:4000"}, allowCredentials = "true")
public class MessageRestController {
    private final UserService userService;
    private final MessageService messageService;

    public MessageRestController(UserService userService, MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

    @GetMapping(path = "/chat", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getChatsByUser(@RequestParam(name = "email") String email) {
        User user = userService.findUserByEmail(email);

        List<User> receivers = messageService.findReceiversBySender(user);
        List<User> senders = messageService.findSendersByReceiver(user);
        List<User> contacts = new ArrayList<>(new HashSet<>(receivers));
        contacts.addAll(receivers);
        contacts.addAll(senders);

        List<Message> messages = messageService.findMessagesBySenderAndReceiverTopRecord(user, new ArrayList<>(new HashSet<>(contacts)));
        Map<String, ChatDto> chat = messageService.groupMessageByReceiverBecomeChat(user.getEmail(), messages);

        return ResponseUtil.withData(HttpStatus.FOUND, chat);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMessagesBySenderAndReceiver(@RequestParam(name = "sender") String senderEmail, @RequestParam(name = "receiver") String receiverEmail) {
        User sender = userService.findUserByEmail(senderEmail);
        User receiver = userService.findUserByEmail(receiverEmail);

        List<Message> messages = messageService.findMessagesBySenderAndReceiver(sender, receiver);
        if(messages.size() == 0) {
            return ResponseUtil.noData(HttpStatus.NOT_FOUND);
        }
        List<MessageDto> messageDtoList = messageService.listEntityToListDto(messages);

        return ResponseUtil.withData(HttpStatus.FOUND, messageDtoList);
    }
}
