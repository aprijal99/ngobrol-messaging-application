package ngobrol.service;

import ngobrol.dto.ChatDto;
import ngobrol.dto.GroupMessageDto;
import ngobrol.entity.GroupChat;
import ngobrol.entity.GroupMessage;
import ngobrol.entity.User;
import ngobrol.repository.GroupMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class GroupMessageServiceImpl implements GroupMessageService {
    private final GroupMessageRepository groupMessageRepository;

    public GroupMessageServiceImpl(GroupMessageRepository groupMessageRepository) {
        this.groupMessageRepository = groupMessageRepository;
    }

    @Override
    public void saveGroupMessage(GroupMessage groupMessage) {
        groupMessageRepository.save(groupMessage);
    }

    @Override
    public List<GroupMessage> findGroupMessagesByGroupChatTopRecord(List<GroupChat> groupChats) {
        return groupChats.stream()
                .map(groupChat -> groupMessageRepository.findTopByGroupChatOrderByCreatedAtDesc(groupChat).get())
                .collect(Collectors.toList());
    }

    @Override
    public List<GroupMessage> findGroupMessagesByGroupChat(GroupChat groupChat) {
        return groupMessageRepository.findGroupMessagesByGroupChatOrderByCreatedAtDesc(groupChat)
                .orElseThrow(() -> new EntityNotFoundException("Group messages not found"));
    }

    @Override
    public GroupMessage dtoToEntity(GroupMessageDto groupMessageDto, User sender, GroupChat groupChat) {
        return new GroupMessage(groupMessageDto.getMessage(), groupMessageDto.getFileUrl(), new Timestamp(groupMessageDto.getCreatedAt()), sender, groupChat);
    }

    @Override
    public GroupMessageDto entityToDto(GroupMessage groupMessage) {
        return new GroupMessageDto(
                groupMessage.getMessage(),
                groupMessage.getFileUrl(),
                groupMessage.getCreatedAt().getTime(),
                groupMessage.getSender().getEmail(),
                groupMessage.getSender().getName(),
                groupMessage.getSender().getImageUrl(),
                groupMessage.getGroupChat().getGroupId());
    }

    @Override
    public List<GroupMessageDto> listEntityToListDto(List<GroupMessage> groupMessages) {
        return groupMessages.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Override
    public ChatDto entityToChat(GroupMessage groupMessage) {
        return new ChatDto(groupMessage.getMessage(), groupMessage.getFileUrl(), groupMessage.getCreatedAt().getTime(), groupMessage.getGroupChat().getName());
    }

    @Override
    public Map<Integer, ChatDto> groupMessagesToChat(List<GroupMessage> groupMessages) {
        Map<Integer, ChatDto> chat = new HashMap<>();
        groupMessages.forEach(groupMessage -> chat.put(groupMessage.getGroupChat().getGroupId(), this.entityToChat(groupMessage)));

        return chat;
    }
}
