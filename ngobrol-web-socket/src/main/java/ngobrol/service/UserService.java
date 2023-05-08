package ngobrol.service;

import ngobrol.dto.UserDto;
import ngobrol.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(User user);
    void updateUser(String email, UserDto userDto);
    boolean checkPassword(String currentEmail, String password);
    User findUserByEmail(String email);
    User dtoToEntity(UserDto userDto);
    UserDto entityToDto(User user);
    List<UserDto> listEntityToListDto(List<User> users);
}
