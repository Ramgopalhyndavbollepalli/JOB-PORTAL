package example;

import java.util.List;

public interface JobDetailService {
    List<JobDetail> getAllJobDetails();
    JobDetail getJobDetailById(Long id);
    JobDetail saveJobDetail(JobDetail jobDetail);
    void deleteJobDetail(Long id);
}
