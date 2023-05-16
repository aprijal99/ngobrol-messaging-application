package ngobrol.controller;

import ngobrol.dto.ContactDto;
import ngobrol.dto.UserDto;
import ngobrol.entity.User;
import ngobrol.service.ContactService;
import ngobrol.service.MessageService;
import ngobrol.service.UserService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/contact")
@CrossOrigin(origins = {"https://ngobrol.onrender.com"}, allowCredentials = "true")
public class ContactRestController {
    private final UserService userService;
    private final ContactService contactService;
    private final MessageService messageService;

    public ContactRestController(UserService userService, ContactService contactService, MessageService messageService) {
        this.userService = userService;
        this.contactService = contactService;
        this.messageService = messageService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getContacts(@RequestParam(name = "email") String email) {
        User user = userService.findUserByEmail(email);
        List<User> contacts = contactService.findContactsByUser(user);
        List<UserDto> userDtoList = userService.listEntityToListDto(contacts);

        return ResponseUtil.withData(HttpStatus.FOUND, userDtoList);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> newContact(@RequestBody ContactDto contactDto) {
        User user = userService.findUserByEmail(contactDto.getUserEmail());
        User contactUser = userService.findUserByEmail(contactDto.getContactEmail());

        contactService.saveContact(contactService.dtoToEntity(user, contactUser));
        contactService.saveContact(contactService.dtoToEntity(contactUser, user));

        return ResponseUtil.noData(HttpStatus.CREATED);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteContact(@RequestBody ContactDto contactDto) {
        User user = userService.findUserByEmail(contactDto.getUserEmail());
        User contactUser = userService.findUserByEmail(contactDto.getContactEmail());

        Integer affectedRow = contactService.deleteContact(user, contactUser);

        if (affectedRow != 0) {
            messageService.deleteMessagesBySenderAndReceiver(user, contactUser);
            return ResponseUtil.noData(HttpStatus.OK);
        }
        else return ResponseUtil.noData(HttpStatus.BAD_REQUEST);
    }
}
