package ngobrol.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String storeImageToFileSystem(MultipartFile image);
}
