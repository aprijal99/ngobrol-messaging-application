package ngobrol.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {
    public static ResponseEntity<?> noData(HttpStatus httpStatus) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", httpStatus.value());
        response.put("status", httpStatus.getReasonPhrase());

        return ResponseEntity.status(httpStatus).body(response);
    }

    public static ResponseEntity<?> withData(HttpStatus httpStatus, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", httpStatus.value());
        response.put("status", httpStatus.getReasonPhrase());
        response.put("data", data);

        return ResponseEntity.status(httpStatus).body(response);
    }
}
