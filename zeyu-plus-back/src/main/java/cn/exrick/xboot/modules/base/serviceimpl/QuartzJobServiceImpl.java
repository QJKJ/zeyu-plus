package cn.exrick.xboot.modules.base.serviceimpl;

import cn.exrick.xboot.modules.base.dao.QuartzJobDao;
import cn.exrick.xboot.modules.base.entity.QuartzJob;
import cn.exrick.xboot.modules.base.service.QuartzJobService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 定时任务接口实现
 * @author Exrick
 */
@Slf4j
@Service
@Transactional
public class QuartzJobServiceImpl implements QuartzJobService {

    @Autowired
    private QuartzJobDao quartzJobDao;

    @Override
    public QuartzJobDao getRepository() {
        return quartzJobDao;
    }

    @Override
    public List<QuartzJob> findByJobClassName(String jobClassName) {

        return quartzJobDao.findByJobClassName(jobClassName);
    }
}