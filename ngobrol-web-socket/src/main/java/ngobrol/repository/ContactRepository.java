package ngobrol.repository;

import ngobrol.entity.Contact;
import ngobrol.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query("SELECT c.contact FROM Contact c WHERE c.user = ?1")
    Optional<List<User>> findContactsByUser(User user);
    Integer deleteContactByUserAndContactOrUserAndContact
            (User senderAsSender, User receiverAsReceiver, User receiverAsSender, User senderAsReceiver);
}
