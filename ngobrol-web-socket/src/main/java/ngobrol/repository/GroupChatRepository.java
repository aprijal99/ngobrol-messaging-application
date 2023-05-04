package ngobrol.repository;

import ngobrol.entity.GroupChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupChatRepository extends JpaRepository<GroupChat, Integer> {
    Optional<GroupChat> findGroupChatByGroupId(Integer groupChatId);
}
