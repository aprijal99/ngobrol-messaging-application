package ngobrol.service;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {
    private final Path imageStoragePath;

    public ImageServiceImpl(@Value("${image.storage}") String imageStorage) {
        this.imageStoragePath = Paths.get(imageStorage);
    }

    @Override
    public String storeImageToFileSystem(MultipartFile image) {
        String extension = FilenameUtils.getExtension(image.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + extension;

        Path destination = imageStoragePath.resolve(Paths.get(filename)).normalize().toAbsolutePath();

        try (InputStream inputStream = image.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return filename;
    }
}
