package ngobrol.repository;

import ngobrol.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);
    @Query("SELECT u.password FROM User u WHERE u.email = ?1")
    String findPasswordByEmail(String email);
}
