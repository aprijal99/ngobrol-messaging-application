package ngobrol.repository;

import ngobrol.entity.GroupChat;
import ngobrol.entity.GroupMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMessageRepository extends JpaRepository<GroupMessage, Integer> {
    Optional<GroupMessage> findTopByGroupChatOrderByCreatedAtDesc(GroupChat groupChat);
    Optional<List<GroupMessage>> findGroupMessagesByGroupChatOrderByCreatedAtDesc(GroupChat groupChat);
}
