package ngobrol.service;

import ngobrol.dto.GroupChatDto;
import ngobrol.entity.GroupChat;

import java.util.List;

public interface GroupChatService {
    void saveGroupChat(GroupChat groupChat);
    GroupChat findGroupChatById(Integer groupChatId);
    GroupChat dtoToEntity(GroupChatDto groupChatDto);
    GroupChatDto entityToDto(GroupChat groupChat);
    List<GroupChatDto> listEntityToListDto(List<GroupChat> groupChats);
}
