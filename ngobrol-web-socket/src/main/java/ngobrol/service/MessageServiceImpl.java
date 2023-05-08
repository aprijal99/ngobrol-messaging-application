package ngobrol.service;

import ngobrol.dto.ChatDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.Message;
import ngobrol.entity.User;
import ngobrol.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public void saveMessage(Message message) {
        messageRepository.save(message);
    }

    @Override
    public List<User> findReceiversBySender(User sender) {
        return messageRepository.findReceiversBySender(sender).orElse(null);
    }

    @Override
    public List<User> findSendersByReceiver(User receiver) {
        return messageRepository.findSendersByReceiver(receiver).orElse(null);
    }

    @Override
    public List<Message> findMessagesBySenderAndReceiver(User sender, User receiver) {
        return messageRepository.findMessagesBySenderAndReceiverOrSenderAndReceiverOrderByCreatedAtDesc(sender, receiver, receiver, sender)
                .orElseThrow(() -> new EntityNotFoundException("Messages not found"));
    }

    @Override
    public List<Message> findMessagesBySenderAndReceiverTopRecord(User sender, List<User> receivers) {
        return receivers.stream()
                .map(receiver -> messageRepository.findTopBySenderAndReceiverOrSenderAndReceiverOrderByCreatedAtDesc(sender, receiver, receiver, sender).get())
                .collect(Collectors.toList());
    }

    @Override
    public Message dtoToEntity(MessageDto messageDto, User sender, User receiver) {
        return new Message(messageDto.getMessage(), messageDto.getFileUrl(), new Timestamp(messageDto.getCreatedAt()), sender, receiver);
    }

    @Override
    public MessageDto entityToDto(Message message) {
        return new MessageDto(message.getMessage(), message.getFileUrl(), message.getCreatedAt().getTime(), message.getSender().getEmail(), message.getReceiver().getEmail());
    }

    @Override
    public ChatDto entityToChat(Message message) {
        return new ChatDto(message.getMessage(), message.getFileUrl(), message.getCreatedAt().getTime(), null);
    }

    @Override
    public List<MessageDto> listEntityToListDto(List<Message> messages) {
        return messages.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Override
    public Map<String, ChatDto> groupMessageByReceiverBecomeChat(String userEmail, List<Message> messages) {
        Map<String, ChatDto> chat = new LinkedHashMap<>();
        messages.forEach(message -> {
            ChatDto chatDto = this.entityToChat(message);
            if (!message.getSender().getEmail().equals(userEmail)) {
                chatDto.setContactOrGroupName(message.getSender().getName());
                chatDto.setImageUrl(message.getSender().getImageUrl());
                chat.put(message.getSender().getEmail(), chatDto);
            } else {
                chatDto.setContactOrGroupName(message.getReceiver().getName());
                chatDto.setImageUrl(message.getReceiver().getImageUrl());
                chat.put(message.getReceiver().getEmail(), chatDto);
            }
        });

        return chat;
    }
}
