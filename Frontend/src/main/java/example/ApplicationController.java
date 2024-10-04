package example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    @PostMapping
    public ResponseEntity<String> createApplication(
            @RequestParam("applicantName") String applicantName,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("resume") MultipartFile resumeFile) {

        String resumeUrl = null;
        if (resumeFile != null && !resumeFile.isEmpty()) {
            try {
                resumeUrl = uploadFile(resumeFile);
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to upload file.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        Application application = new Application();
        application.setApplicantName(applicantName);
        application.setJobTitle(jobTitle);
        application.setResume(resumeUrl);

        applicationService.saveApplication(application);
        return new ResponseEntity<>("Application submitted successfully!", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id, @RequestBody Application application) {
        application.setId(id);
        return applicationService.saveApplication(application);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }

    private String uploadFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath);

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(file.getOriginalFilename())
                .toUriString();
    }
}
