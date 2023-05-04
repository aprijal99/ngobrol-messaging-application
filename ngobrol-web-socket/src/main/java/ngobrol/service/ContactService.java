package ngobrol.service;

import ngobrol.dto.ContactDto;
import ngobrol.entity.Contact;
import ngobrol.entity.User;

import java.util.List;

public interface ContactService {
    void saveContact(Contact contact);
    List<User> findContactsByUser(User user);
    Contact dtoToEntity(User user, User contactUser);
}
