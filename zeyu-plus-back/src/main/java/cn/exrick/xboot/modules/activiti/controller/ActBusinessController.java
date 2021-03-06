package cn.exrick.xboot.modules.activiti.controller;

import cn.exrick.xboot.common.constant.ActivitiConstant;
import cn.exrick.xboot.common.utils.PageUtil;
import cn.exrick.xboot.common.utils.ResultUtil;
import cn.exrick.xboot.common.vo.PageVo;
import cn.exrick.xboot.common.vo.Result;
import cn.exrick.xboot.common.vo.SearchVo;
import cn.exrick.xboot.modules.activiti.entity.ActBusiness;
import cn.exrick.xboot.modules.activiti.entity.ActProcess;
import cn.exrick.xboot.modules.activiti.service.ActBusinessService;
import cn.exrick.xboot.modules.activiti.service.ActProcessService;
import cn.exrick.xboot.modules.activiti.service.mybatis.IActService;
import cn.hutool.core.util.StrUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Exrick
 */
@Slf4j
@RestController
@Api(description = "业务申请管理接口")
@RequestMapping("/xboot/actBusiness")
@Transactional
public class ActBusinessController {

    @Autowired
    private ActBusinessService actBusinessService;

    @Autowired
    private IActService iActService;

    @Autowired
    private ActProcessService actProcessService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private RuntimeService runtimeService;

    @RequestMapping(value = "/getByCondition",method = RequestMethod.GET)
    @ApiOperation(value = "多条件分页获取申请列表")
    public Result<Page<ActBusiness>> getByCondition(@ModelAttribute ActBusiness actBusiness,
                                                    @ModelAttribute SearchVo searchVo,
                                                    @ModelAttribute PageVo pageVo){

        Page<ActBusiness> page = actBusinessService.findByCondition(actBusiness, searchVo, PageUtil.initPage(pageVo));
        page.getContent().forEach(e -> {
            if(StrUtil.isNotBlank(e.getProcDefId())){
                ActProcess actProcess = actProcessService.get(e.getProcDefId());
                e.setRouteName(actProcess.getRouteName());
                e.setProcessName(actProcess.getName());
            }
            if(ActivitiConstant.STATUS_DEALING.equals(e.getStatus())){
                // 关联当前任务
                Task task = taskService.createTaskQuery().processInstanceId(e.getId()).singleResult();
                if(task!=null){
                    e.setCurrTaskName(task.getName());
                }
            }
        });
        return new ResultUtil<Page<ActBusiness>>().setData(page);
    }

    @RequestMapping(value = "/apply",method = RequestMethod.POST)
    @ApiOperation(value = "提交申请 启动流程")
    public Result<Object> apply(@ModelAttribute ActBusiness act){

        Map<String, Object> params = new HashMap<>();
        params.put("title", act.getTitle());
        params.put("assignee", act.getAssignee());
        params.put("priority", act.getPriority());
        String processInstanceId = actProcessService.startProcess(act.getProcDefId(), act.getTableId(), params);
        ActBusiness actBusiness = actBusinessService.get(act.getId());
        actBusiness.setProcInstId(processInstanceId);
        actBusiness.setStatus(ActivitiConstant.STATUS_DEALING);
        actBusiness.setResult(ActivitiConstant.RESULT_DEALING);
        actBusiness.setApplyTime(new Date());
        actBusinessService.update(actBusiness);
        return new ResultUtil<Object>().setSuccessMsg("操作成功");
    }

    @RequestMapping(value = "/cancel",method = RequestMethod.POST)
    @ApiOperation(value = "撤回申请")
    public Result<Object> cancel(@RequestParam String id,
                                 @RequestParam String procInstId,
                                 @RequestParam(required = false) String reason){

        if(StrUtil.isBlank(reason)){
            reason = "";
        }
        runtimeService.deleteProcessInstance(procInstId, reason);
        ActBusiness actBusiness = actBusinessService.get(id);
        actBusiness.setStatus(ActivitiConstant.STATUS_TO_APPLY);
        actBusiness.setResult(ActivitiConstant.RESULT_TO_SUBMIT);
        actBusinessService.update(actBusiness);
        return new ResultUtil<Object>().setSuccessMsg("操作成功");
    }

    @RequestMapping(value = "/delByIds/{ids}",method = RequestMethod.DELETE)
    @ApiOperation(value = "通过id删除草稿状态申请")
    public Result<Object> delByIds(@PathVariable String[] ids){

        for(String id : ids){
            ActBusiness actBusiness = actBusinessService.get(id);
            if(!ActivitiConstant.STATUS_TO_APPLY.equals(actBusiness.getStatus())){
                return new ResultUtil<Object>().setErrorMsg("删除失败, 仅能删除草稿状态的申请");
            }
            // 删除关联业务表
            ActProcess actProcess = actProcessService.get(actBusiness.getProcDefId());
            iActService.deleteBusiness(actProcess.getBusinessTable(), actBusiness.getTableId());
            actBusinessService.delete(id);
        }
        return new ResultUtil<Object>().setSuccessMsg("删除成功");
    }
}
