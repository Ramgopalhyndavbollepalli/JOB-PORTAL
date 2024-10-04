package example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobDetailServiceImpl implements JobDetailService {

    @Autowired
    private JobDetailRepository jobDetailRepository;

    @Override
    public List<JobDetail> getAllJobDetails() {
        return jobDetailRepository.findAll();
    }

    @Override
    public JobDetail getJobDetailById(Long id) {
        return jobDetailRepository.findById(id).orElse(null);
    }

    @Override
    public JobDetail saveJobDetail(JobDetail jobDetail) {
        return jobDetailRepository.save(jobDetail);
    }

    @Override
    public void deleteJobDetail(Long id) {
        jobDetailRepository.deleteById(id);
    }
}