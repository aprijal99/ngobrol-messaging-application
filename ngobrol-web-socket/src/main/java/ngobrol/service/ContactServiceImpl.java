package ngobrol.service;

import ngobrol.dto.ContactDto;
import ngobrol.entity.Contact;
import ngobrol.entity.User;
import ngobrol.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public void saveContact(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    public List<User> findContactsByUser(User user) {
        return contactRepository.findContactsByUser(user).orElseThrow(() -> new EntityNotFoundException("Contacts not found"));
    }

    @Override
    public Contact dtoToEntity(User user, User contactUser) {
        return new Contact(user, contactUser);
    }
}
