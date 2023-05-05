package ngobrol.controller;

import ngobrol.service.ImageService;
import ngobrol.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping(path = "/image")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ImageRestController {
    private final ImageService imageService;

    public ImageRestController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam(name = "image") MultipartFile image) {
        try {
            String imageFilename = imageService.storeImageToFileSystem(image);

            return ResponseUtil.withData(HttpStatus.OK, Map.of("imageFilename", imageFilename));
        } catch (RuntimeException e) {
            return ResponseUtil.noData(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
