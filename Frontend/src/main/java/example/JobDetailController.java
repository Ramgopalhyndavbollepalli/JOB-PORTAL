package example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-details")
public class JobDetailController {

    @Autowired
    private JobDetailService jobDetailService;

    @GetMapping
    public List<JobDetail> getAllJobDetails() {
        return jobDetailService.getAllJobDetails();
    }

    @GetMapping("/{id}")
    public JobDetail getJobDetailById(@PathVariable Long id) {
        return jobDetailService.getJobDetailById(id);
    }

    @PostMapping
    public JobDetail createJobDetail(@RequestBody JobDetail jobDetail) {
        return jobDetailService.saveJobDetail(jobDetail);
    }

    @PutMapping("/{id}")
    public JobDetail updateJobDetail(@PathVariable Long id, @RequestBody JobDetail jobDetail) {
        jobDetail.setId(id);
        return jobDetailService.saveJobDetail(jobDetail);
    }

    @DeleteMapping("/{id}")
    public void deleteJobDetail(@PathVariable Long id) {
        jobDetailService.deleteJobDetail(id);
    }
}
