package ngobrol.repository;

import ngobrol.entity.Message;
import ngobrol.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m.receiver, COUNT(m.receiver) FROM Message m WHERE m.sender = ?1 GROUP BY m.receiver")
    Optional<List<User>> findReceiversBySender(User sender);
    Optional<List<Message>> findMessagesBySenderAndReceiverOrSenderAndReceiverOrderByCreatedAtDesc(
            User senderAsSender, User receiverAsReceiver, User receiverAsSender, User senderAsReceiver);
    Optional<Message> findTopBySenderAndReceiverOrSenderAndReceiverOrderByCreatedAtDesc(
            User senderAsSender, User receiverAsReceiver, User receiverAsSender, User senderAsReceiver);
}
