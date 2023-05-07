package ngobrol.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface ImageService {
    String storeImageToFileSystem(MultipartFile image) throws IOException;
    Resource serveImage(String imageName) throws IOException;
}
