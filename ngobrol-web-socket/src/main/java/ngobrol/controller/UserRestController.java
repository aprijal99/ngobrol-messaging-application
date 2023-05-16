package ngobrol.controller;

import ngobrol.dto.UserDto;
import ngobrol.entity.User;
import ngobrol.service.UserService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = {"https://ngobrol.onrender.com"}, allowCredentials = "true")
public class UserRestController {
    final private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@RequestParam(name = "email") String email, @CookieValue(name = "access_token", defaultValue = "There is no access token") String accessToken) {
        System.out.println("Access token: " + accessToken);

        User user = userService.findUserByEmail(email);
        if(user == null) {
            return ResponseUtil.noData(HttpStatus.NOT_FOUND);
        }

        return ResponseUtil.withData(HttpStatus.FOUND, userService.entityToDto(user));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> newUser(@RequestBody UserDto userDto) {
        User user = userService.dtoToEntity(userDto);
        userService.saveUser(user);

        return ResponseUtil.noData(HttpStatus.CREATED);
    }

    @PostMapping(path = "/check-password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkPassword(@RequestBody UserDto userDto) {
        boolean result = userService.checkPassword(userDto.getEmail(), userDto.getPassword());

        if (result) return ResponseUtil.noData(HttpStatus.OK);
        else return ResponseUtil.noData(HttpStatus.FORBIDDEN);
    }

    @PutMapping(path = "/{email}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable(name = "email") String currentEmail, @RequestBody UserDto userDto) {
        userService.updateUser(currentEmail, userDto);

        return ResponseUtil.noData(HttpStatus.OK);
    }
}
