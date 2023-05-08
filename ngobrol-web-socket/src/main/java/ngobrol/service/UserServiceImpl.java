package ngobrol.service;

import ngobrol.dto.UserDto;
import ngobrol.entity.User;
import ngobrol.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateUser(String currentEmail, UserDto userDto) {
        User user = this.findUserByEmail(currentEmail);
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        user.setStatus(userDto.getStatus());
        user.setImageUrl(userDto.getImageUrl());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);
    }

    @Override
    public boolean checkPassword(String email, String password) {
        String encodedPassword = userRepository.findPasswordByEmail(email);

        return encodedPassword.equals(passwordEncoder.encode(password));
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElse(null);
    }

    @Override
    public User dtoToEntity(UserDto userDto) {
        return new User(
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPassword(),
                "USER",
                userDto.getStatus(),
                userDto.getImageUrl(),
                new Timestamp(userDto.getCreatedAt()),
                new Timestamp(userDto.getUpdatedAt())
        );
    }

    @Override
    public UserDto entityToDto(User user) {
        return new UserDto(user.getName(), user.getEmail(), null, user.getStatus(), user.getImageUrl(), null, null);
    }

    @Override
    public List<UserDto> listEntityToListDto(List<User> users) {
        return users.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findUserByEmail(username);
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
