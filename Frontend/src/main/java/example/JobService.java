package example;

import java.util.List;

public interface JobService {
    List<Job> getAllJobs();
    Job getJobById(Long id);
    Job saveJob(Job job);
    void deleteJob(Long id);
}
