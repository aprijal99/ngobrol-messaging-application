package ngobrol.service;

import ngobrol.dto.ChatDto;
import ngobrol.dto.MessageDto;
import ngobrol.entity.Message;
import ngobrol.entity.User;

import java.util.List;
import java.util.Map;

public interface MessageService {
    void saveMessage(Message message);
    List<User> findReceiversBySender(User sender);
    List<User> findSendersByReceiver(User receiver);
    List<Message> findMessagesBySenderAndReceiver(User sender, User receiver);
    List<Message> findMessagesBySenderAndReceiverTopRecord(User sender, List<User> receivers);
    void deleteMessagesBySenderAndReceiver(User sender, User receiver);
    Message dtoToEntity(MessageDto messageDto, User sender, User receiver);
    MessageDto entityToDto(Message message);
    ChatDto entityToChat(Message message);
    List<MessageDto> listEntityToListDto(List<Message> messages);
    Map<String, ChatDto> groupMessageByReceiverBecomeChat(String userEmail, List<Message> messages);
}
