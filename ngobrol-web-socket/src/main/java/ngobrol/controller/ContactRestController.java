package ngobrol.controller;

import ngobrol.dto.ContactDto;
import ngobrol.dto.UserDto;
import ngobrol.entity.Contact;
import ngobrol.entity.User;
import ngobrol.service.ContactService;
import ngobrol.service.UserService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/contact")
public class ContactRestController {
    private final UserService userService;
    private final ContactService contactService;

    public ContactRestController(UserService userService, ContactService contactService) {
        this.userService = userService;
        this.contactService = contactService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getContacts(@RequestParam(name = "email") String email) {
        User user = userService.findUserByEmail(email);
        List<User> contacts = contactService.findContactsByUser(user);
        List<UserDto> userDtoList = userService.listEntityToListDto(contacts);

        return ResponseUtil.withData(HttpStatus.FOUND, userDtoList);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> newContact(@RequestBody ContactDto contactDto) {
        User user = userService.findUserByEmail(contactDto.getUserEmail());
        User contactUser = userService.findUserByEmail(contactDto.getContactEmail());

        Contact contact = contactService.dtoToEntity(user, contactUser);
        contactService.saveContact(contact);

        return ResponseUtil.noData(HttpStatus.CREATED);
    }
}
