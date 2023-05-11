package ngobrol.service;

import ngobrol.dto.ChatDto;
import ngobrol.dto.GroupMessageDto;
import ngobrol.entity.GroupChat;
import ngobrol.entity.GroupMessage;
import ngobrol.entity.User;

import java.util.List;
import java.util.Map;

public interface GroupMessageService {
    void saveGroupMessage(GroupMessage groupMessage);
    List<GroupMessage> findGroupMessagesByGroupChatTopRecord(List<GroupChat> groupChats);
    List<GroupMessage> findGroupMessagesByGroupChat(GroupChat groupChat);
    void deleteGroupMessagesByGroupChat(GroupChat groupChat);
    GroupMessage dtoToEntity(GroupMessageDto groupMessageDto, User sender, GroupChat groupChat);
    GroupMessageDto entityToDto(GroupMessage groupMessage);
    List<GroupMessageDto> listEntityToListDto(List<GroupMessage> groupMessages);
    ChatDto entityToChat(GroupMessage groupMessage);
    Map<Integer, ChatDto> groupMessagesToChat(List<GroupMessage> groupMessages);
}
