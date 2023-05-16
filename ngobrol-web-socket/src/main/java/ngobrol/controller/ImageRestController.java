package ngobrol.controller;

import ngobrol.service.ImageService;
import ngobrol.util.ResponseUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(path = "/image")
@CrossOrigin(origins = {"https://ngobrol.onrender.com"}, allowCredentials = "true")
public class ImageRestController {
    private final ImageService imageService;

    public ImageRestController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping(path = "/{name}")
    public ResponseEntity<?> getImage(@PathVariable(name = "name") String imageName) {
        try {
            Resource imageResource = imageService.serveImage(imageName);
            String imageExt = FilenameUtils.getExtension(imageResource.getFilename());

            return ResponseEntity.status(HttpStatus.FOUND).contentType(MediaType.valueOf("image/" + imageExt)).body(imageResource);
        } catch (IOException e) {
            return ResponseUtil.noData(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam(name = "image") MultipartFile image) {
        try {
            String imageFilename = imageService.storeImageToFileSystem(image);

            return ResponseUtil.withData(HttpStatus.OK, Map.of("imageFilename", imageFilename));
        } catch (IOException e) {
            return ResponseUtil.noData(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
