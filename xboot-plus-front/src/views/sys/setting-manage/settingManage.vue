<style lang="less">
@import "./settingManage.less";
</style>
<template>
  <div class="tabMain">
    <Card>
      <Tabs v-model="tabName" :animated="false" style="overflow: visible">


        <TabPane label="核心配置" name="core">
          <div style="position:relative">
            <Form
                    ref="coreForm"
                    :model="core"
                    :label-width="110"
                    label-position="right"
                    :rules="coreValidate"
            >
              <FormItem label="平台名称：" prop="platformName">
                <Tooltip placement="right" max-width="200" content="浏览器页签名称使用">
                  <Input type="text" v-model="core.platformName" placeholder="请输入平台名称，如 Zeyu 快速开发平台" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem label="平台描述信息：" prop="platformInfo">
                <Tooltip placement="right" max-width="200" content="登录页平台描述信息使用">
                  <Input type="text" v-model="core.platformInfo" placeholder="请输入描述信息，如 Zeyu 是一个基于Vue前后分离分布式后台架构搭建的系统" style="width: 350px"/>
                </Tooltip>
              </FormItem>

              <FormItem label="版权" prop="copyright">
                <div ref="editor"></div>
              </FormItem>

              <Form-item label class="br">
                <Button @click="editHTML" icon="ios-create-outline">编辑HTML代码</Button>
                <Button @click="fullscreenModal=true" icon="md-eye">全屏预览</Button>
              </Form-item>

              <FormItem label="登录百叶窗效果" prop="isShowShades">
                <i-switch size="large" v-model="core.isShowShades" :true-value="'0'" :false-value="'-1'">
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              </FormItem>

              <!--platformName //平台名称
              platformInfo //平台描述信息
              copyright  //版权
              isShowShades //登录百叶窗效果
              homeLogo//平台首页Logo
              shrinkLogo//菜单收缩首页Logo
              loginLogo//登录Logo
              iconIco//icon图标-->

              <Form-item label="平台首页Logo" prop="homeLogo" >
                <Poptip trigger="hover" title="图片预览" placement="top-start" width="350">
                  <Input  v-model="core.homeLogo" placeholder="可直接填入网络图片链接" clearable/>
                  <div slot="content">
                    <img :src="core.homeLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
                    <a @click="homeLogoViewPic()" style="margin-top:5px;text-align:right;display:block">查看原图</a>
                  </div>
                </Poptip>
                <Upload :action="uploadFileUrl"
                        :headers="accessToken"
                        :on-success="homeLogoHandleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="5120"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="beforeUpload"
                        ref="up"
                        class="upload">
                  <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
              </Form-item>


              <Form-item label="菜单收缩首页Logo" prop="shrinkLogo">
                <Poptip trigger="hover" title="图片预览" placement="top-start" width="350">
                  <Input v-model="core.shrinkLogo" placeholder="可直接填入网络图片链接" clearable/>
                  <div slot="content">
                    <img :src="core.shrinkLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
                    <a @click="shrinkLogoViewPic()" style="margin-top:5px;text-align:right;display:block">查看原图</a>
                  </div>
                </Poptip>
                <Upload :action="uploadFileUrl"
                        :headers="accessToken"
                        :on-success="shrinkLogoHandleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="5120"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="beforeUpload"
                        ref="up"
                        class="upload">
                  <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
              </Form-item>


              <Form-item label="登录Logo" prop="loginLogo">
                <Poptip trigger="hover" title="图片预览" placement="top-start" width="350">
                  <Input v-model="core.loginLogo" placeholder="可直接填入网络图片链接" clearable/>
                  <div slot="content">
                    <img :src="core.loginLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
                    <a @click="loginLogoViewPic()" style="margin-top:5px;text-align:right;display:block">查看原图</a>
                  </div>
                </Poptip>
                <Upload :action="uploadFileUrl"
                        :headers="accessToken"
                        :on-success="loginLogoHandleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="5120"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="beforeUpload"
                        ref="up"
                        class="upload">
                  <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
              </Form-item>


              <Form-item label="icon图标" prop="iconIco">
                <Poptip trigger="hover" title="图片预览" placement="top-start" width="350">
                  <Input v-model="core.iconIco" placeholder="可直接填入网络图片链接" clearable/>
                  <div slot="content">
                    <img :src="core.iconIco" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
                    <a @click="iconIcoViewPic()" style="margin-top:5px;text-align:right;display:block">查看原图</a>
                  </div>
                </Poptip>
                <Upload :action="uploadFileUrl"
                        :headers="accessToken"
                        :on-success="iconIcoHandleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="5120"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="beforeUpload"
                        ref="up"
                        class="upload">
                  <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
              </Form-item>


              <FormItem>
                <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditCore">保存更改</Button>
              </FormItem>
            </Form>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>


        <TabPane label="登录幻灯片图片" name="shades">
          <div style="position:relative">
            <shadesManage/>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>



        <TabPane label="文件对象存储配置" name="oss">
          <div style="position:relative">
          <Form 
            ref="ossForm"
            :model="oss" 
            :label-width="110" 
            label-position="right"
            :rules="ossValidate"
            >
            <FormItem label="服务提供商：" prop="serviceName">
              <Select v-model="oss.serviceName" @on-change="changeOss" placeholder="请选择" style="width: 200px">
                <Option value="LOCAL_OSS">本地服务器</Option>
                <Option value="QINIU_OSS">七牛云</Option>
                <Option value="ALI_OSS">阿里云</Option>
                <Option value="TENCENT_OSS">腾讯云</Option>
              </Select>
            </FormItem>
            <div v-if="oss.serviceName!='LOCAL_OSS'">
              <FormItem label="accessKey：" prop="accessKey">
                <Input type="text" v-model="oss.accessKey" placeholder="请输入accessKey" style="width: 350px"/>
              </FormItem>
              <FormItem label="secretKey：" prop="secretKey">
                <Tooltip placement="right" content="无法编辑时请先点击查看图标">
                  <Input class="input-see" type="text" v-model="oss.secretKey" :readonly="!changedOssSK" @on-click="seeSecret(oss.serviceName)" icon="ios-eye" placeholder="请输入secretKey" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem v-if="oss.serviceName=='QINIU_OSS'" label="zone存储区域：" prop="zone">
                <Select v-model="oss.zone" placeholder="请选择存储区域" style="width: 350px">
                  <Option :value="-1">自动判断</Option>
                  <Option :value="0">华东</Option>
                  <Option :value="1">华北</Option>
                  <Option :value="2">华南</Option>
                  <Option :value="3">北美</Option>
                  <Option :value="4">东南亚</Option>
                </Select>
              </FormItem>
              <FormItem label="bucket空间：" prop="bucket">
                <Input type="text" v-model="oss.bucket" placeholder="请输入bucket空间名" style="width: 350px"/>
              </FormItem>
              <FormItem v-if="oss.serviceName=='TENCENT_OSS'" label="所属地域：" prop="bucketRegion">
                <Select v-model="oss.bucketRegion" placeholder="请选择或输入搜索" style="width: 350px" filterable>
                  <Option v-for="(item, i) in dictBucketRegions" :key="i" :value="item.value">{{item.title}}</Option>
                </Select>
              </FormItem>
              <FormItem label="endpoint域名：" prop="endpoint" :error="errorMsg">
                <Input type="text" v-model="oss.endpoint" :placeholder="endpointPH" style="width: 350px">
                  <Select v-model="oss.http" slot="prepend" style="width: 80px" prop="http">
                    <Option value="http://">http://</Option>
                    <Option value="https://">https://</Option>
                  </Select>
                </Input>
              </FormItem>
            </div>
            <div v-else>
              <FormItem label="存储磁盘路径：" prop="filePath" :error="errorMsg2">
                <Input type="text" v-model="oss.filePath" placeholder="例如：D:/upload" style="width: 350px"/>
              </FormItem>
              <FormItem label="文件预览接口：" prop="endpoint" :error="errorMsg">
                <Input type="text" v-model="oss.endpoint" placeholder="请输入文件预览接口" style="width: 350px">
                  <Select v-model="oss.http" slot="prepend" style="width: 80px" prop="http">
                    <Option value="http://">http://</Option>
                    <Option value="https://">https://</Option>
                  </Select>
                </Input>
              </FormItem>
            </div>
            <FormItem>
              <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditOss">保存并启用</Button>
            </FormItem>
           </Form>
           <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>
        <TabPane label="短信配置" name="sms">
          <div style="position:relative">
            <Form 
              ref="smsForm"
              :model="sms" 
              :label-width="110" 
              label-position="right"
              :rules="smsValidate"
              > 
              <FormItem label="服务提供商：" prop="serviceName">
                <Select v-model="sms.serviceName" placeholder="请选择" style="width: 200px">
                  <Option value="ALI_SMS">阿里云</Option>
                </Select>
              </FormItem>
              <FormItem label="accessKey：" prop="accessKey">
                <Input type="text" v-model="sms.accessKey" placeholder="请输入" style="width: 350px"/>
              </FormItem>
              <FormItem label="secretKey：" prop="secretKey">
                <Tooltip placement="right" content="无法编辑时请先点击查看图标">
                    <Input class="input-see" type="text" v-model="sms.secretKey" :readonly="!changedSmsSK" @on-click="seeSecret(sms.serviceName)" icon="ios-eye" placeholder="请输入" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem label="短信签名：" prop="signName">
                <Input type="text" v-model="sms.signName" placeholder="请输入短信签名，例如XBoot" style="width: 350px"/>
              </FormItem>
              <FormItem label="使用场景：" prop="type">
                <Select v-model="sms.type" @on-change="changeSmsType" placeholder="请选择" style="width: 350px">
                  <Option value="-1">通用</Option>
                  <Option value="0">注册</Option>
                  <Option value="1">登录</Option>
                  <Option value="2">修改绑定手机号</Option>
                  <Option value="3">修改密码</Option>
                  <Option value="4">重置密码</Option>
                </Select>
              </FormItem>
              <FormItem label="模版CODE：" prop="templateCode">
                <Input type="text" v-model="sms.templateCode" placeholder="请输入场景对应短信模版CODE，例如SMS_123456789" style="width: 350px"/>
              </FormItem>
              <FormItem>
                <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditSms">保存更改</Button>
              </FormItem>
            </Form>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>
        <TabPane label="邮件配置" name="email">
          <div style="position:relative">
            <Form 
              ref="emailForm"
              :model="email" 
              :label-width="110" 
              label-position="right"
              :rules="emailValidate"
              > 
              <FormItem label="邮箱服务器：" prop="host">
                <Input type="text" v-model="email.host" placeholder="请输入邮箱服务器Host，例如QQ邮箱为smtp.qq.com" style="width: 350px"/>
              </FormItem>
              <FormItem label="发送邮箱账号：" prop="username">
                <Input type="text" v-model="email.username" placeholder="请输入发送者Email账号" style="width: 350px"/>
              </FormItem>
              <FormItem label="邮箱授权码：" prop="password">
                <Tooltip placement="right" content="无法编辑时请先点击查看图标">
                    <Input class="input-see" type="text" v-model="email.password" :readonly="!changedEmailPass" @on-click="seeSecret('EMAIL_SETTING')" icon="ios-eye" placeholder="请输入邮箱授权码，进入邮箱-设置中可找到" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem>
                <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditEmail">保存更改</Button>
              </FormItem>
            </Form>
            </Form>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>
        <TabPane label="Vaptcha验证码" name="vaptcha">
          <div style="position:relative">
            <Form 
              ref="vaptchaForm"
              :model="vaptcha" 
              :label-width="110" 
              label-position="right"
              :rules="vaptchaValidate"
              > 
              <FormItem label="VID：" prop="vid">
                <Input type="text" v-model="vaptcha.vid" placeholder="请输入验证单元VID" style="width: 350px"/>
              </FormItem>
              <FormItem label="secretKey：" prop="secretKey">
                <Tooltip placement="right" content="无法编辑时请先点击查看图标">
                    <Input class="input-see" type="text" v-model="vaptcha.secretKey" :readonly="!changedVaptchaSK" @on-click="seeSecret('VAPTCHA_SETTING')" icon="ios-eye" placeholder="请输入验证单元Key" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem>
                <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditVaptcha">保存更改</Button>
              </FormItem>
            </Form>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>




        <TabPane label="其他配置" name="other">
          <div style="position:relative">
            <Form 
              ref="otherForm"
              :model="other" 
              :label-width="110" 
              label-position="right"
              :rules="otherValidate"
              > 
              <FormItem label="应用部署域名：" prop="domain">
                <Tooltip placement="right" max-width="200" content="拼接部分资源访问链接使用">
                  <Input type="text" v-model="other.domain" placeholder="请输入应用部署域名前缀，如http://xboot.exrick.cn" style="width: 350px"/>
                </Tooltip>
              </FormItem>
              <FormItem label="IP黑名单：" prop="blacklist">
                <Input type="textarea" v-model="other.blacklist" :rows="4" placeholder="多个以回车分隔" style="width: 350px"/>
              </FormItem>
              <FormItem>
                <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEditOther">保存更改</Button>
              </FormItem>
            </Form>
            <Spin fix v-if="loading"></Spin>
          </div>
        </TabPane>





      </Tabs>   
    </Card>

    <!-- html编辑 -->
    <Modal
      title="编辑html代码"
      v-model="showHTMLModal"
      :mask-closable="false"
      :width="900"
      :fullscreen="full"
    >
      <Input
        v-if="!full"
        v-model="dataEdit"
        :autosize="true"
        type="textarea"
        style="max-height:60vh;overflow:auto"
      />
      <Input v-if="full" v-model="dataEdit" :autosize="true" type="textarea"/>
      <div slot="footer">
        <Button @click="full=!full" icon="md-expand">全屏开/关</Button>
        <Button @click="editHTMLOk" type="primary" icon="md-checkmark-circle-outline">确定保存</Button>
      </div>
    </Modal>
    <Modal title="预览" v-model="fullscreenModal" fullscreen>
      <div v-html="core.copyright">{{core.copyright}}</div>
      <div slot="footer">
        <Button @click="fullscreenModal=false">关闭</Button>
      </div>
    </Modal>

    <!--  核心配置图片预览弹出框 -->
    <Modal title="图片预览" v-model="homeLogoViewImage" :styles="{top: '30px'}" draggable>
      <img :src="core.homeLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
      <div slot="footer">
        <Button @click="homeLogoViewImage=false">关闭</Button>
      </div>
    </Modal>
    <Modal title="图片预览" v-model="shrinkLogoViewImage" :styles="{top: '30px'}" draggable>
      <img :src="core.shrinkLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
      <div slot="footer">
        <Button @click="shrinkLogoViewImage=false">关闭</Button>
      </div>
    </Modal>
    <Modal title="图片预览" v-model="loginLogoViewImage" :styles="{top: '30px'}" draggable>
      <img :src="core.loginLogo" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
      <div slot="footer">
        <Button @click="loginLogoViewImage=false">关闭</Button>
      </div>
    </Modal>
    <Modal title="图片预览" v-model="iconIcoViewImage" :styles="{top: '30px'}" draggable>
      <img :src="core.iconIco" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
      <div slot="footer">
        <Button @click="iconIcoViewImage=false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import {
  seeSecretSet,
  checkOssSet,
  getOssSet,
  editOssSet,
  getSmsSet,
  editSmsSet,
  getSmsTemplateCode,
  getEmailSet,
  editEmailSet,
  getVaptchaSet,
  editVaptchaSet,
  getOtherSet,
  editOtherSet,
  editCoreSet,
  getCoreSet,
  getDictDataByType,
  uploadFile
} from "@/api/index";
// 表情包配置 自定义表情可在该js文件中统一修改
import { sina } from "@/libs/emoji";


import shadesManage from "../shadesManage/shadesManage.vue";

import E from "wangeditor";
let editor = null;
var xss = require("xss");
export default {
  name: "setting-manage",
  components: {
    shadesManage
  },
  data() {
    return {
      tabName: "core",
      loading: false, // 表单加载状态
      saveLoading: false,
      oss: {
        serviceName: ""
      },
      accessToken: {},
      changedOssSK: false, // 是否修改oss的secrectKey
      sms: {
        serviceName: "ALI_SMS"
      },
      core: {
            platformName: "",
            platformInfo: "",
            isShowShades: "",
            homeLogo:"",
            shrinkLogo: "",
            loginLogo: "",
            iconIco: "",
            copyright:""
      },
      uploadfile: {
        name: ""
      },
      uploadFileUrl: uploadFile,
      changedSmsSK: false, // 是否修改短信的secrectKey
      email: {},
      changedEmailPass: false, // 是否修改邮件密码
      errorMsg: "",
      errorMsg2: "",
      vaptcha: {},
      changedVaptchaSK: false, // 是否修改Vaptcha的secrectKey
      other: {
        blacklist: ""
      },
      ossValidate: {
        // 表单验证规则
        serviceName: [{ required: true, message: "请选择", trigger: "blur" }],
        accessKey: [{ required: true, message: "不能为空", trigger: "blur" }],
        secretKey: [{ required: true, message: "不能为空", trigger: "blur" }],
        endpoint: [{ required: true, message: "不能为空", trigger: "blur" }],
        bucket: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      homeLogoViewImage: false,
      shrinkLogoViewImage: false,
      loginLogoViewImage: false,
      iconIcoViewImage: false,
      coreValidate: {
                          // 表单验证规则
                          platformName: [{ required: true, message: "不能为空", trigger: "blur" }],
                          platformInfo: [{ required: true, message: "不能为空", trigger: "blur" }],
                         // isShowShades: [{ required: true, message: "不能为空", trigger: "blur" }],
                          homeLogo:[{ required: true, message: "不能为空", trigger: "blur" }],
                          shrinkLogo: [{ required: true, message: "不能为空", trigger: "blur" }],
                          loginLogo: [{ required: true, message: "不能为空", trigger: "blur" }],
                          iconIco: [{ required: true, message: "不能为空", trigger: "blur" }]
      },

      smsValidate: {
        // 表单验证规则
        serviceName: [{ required: true, message: "请选择", trigger: "blur" }],
        accessKey: [{ required: true, message: "不能为空", trigger: "blur" }],
        secretKey: [{ required: true, message: "不能为空", trigger: "blur" }],
        signName: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        templateCode: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      emailValidate: {
        // 表单验证规则
        host: [{ required: true, message: "不能为空", trigger: "blur" }],
        username: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      vaptchaValidate: {
        // 表单验证规则
        vID: [{ required: true, message: "不能为空", trigger: "blur" }],
        secretKey: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      otherValidate: {
        // 表单验证规则
        domain: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      endpointPH: "请输入空间访问域名",
      dictBucketRegions: [
      ],
        dataEdit: "", // 编辑数据
        showHTMLModal: false, // 显示html
        full: false, // html全屏开关
        fullscreenModal: false, // 显示全屏预览
    };
  },
  methods: {
    init() {
      this.initOssSet();
      this.initSmsSet();
      this.initEmailSet();
      this.initVaptchaSet();
      this.initOtherSet();
      this.initCoreSet();
      this.getDictBucketRegions();
      this.initEditor();
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
    },

    homeLogoViewPic() {
      this.homeLogoViewImage = true;
    },
    shrinkLogoViewPic() {
      this.shrinkLogoViewImage = true;
    },
    loginLogoViewPic() {
      this.loginLogoViewImage = true;
    },
    iconIcoViewPic() {
      this.iconIcoViewImage = true;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 .jpg .jpeg .png .gif格式文件"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小过大",
        desc: "所选文件‘ " + file.name + " ’大小过大, 不得超过 5M."
      });
    },
    beforeUpload() {
      if (!this.$route.meta.permTypes.includes("upload")) {
        this.$Message.error("此处您没有上传权限(为演示功能，该按钮未配置隐藏)");
        return false;
      }
      return true;
    },
    homeLogoHandleSuccess(res, file) {//上传成功
      if (res.success === true) {
        file.url = res.result;
        this.core.homeLogo = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    shrinkLogoHandleSuccess(res, file) {//上传成功
      if (res.success === true) {
        file.url = res.result;
        this.core.shrinkLogo = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    loginLogoHandleSuccess(res, file) {//上传成功
      if (res.success === true) {
        file.url = res.result;
        this.core.loginLogo = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    iconIcoHandleSuccess(res, file) {//上传成功
      if (res.success === true) {
        file.url = res.result;
        this.core.iconIco = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    initEditor() {
      let that = this;
      editor = new E(this.$refs.editor);
      editor.customConfig.onchange = html => {
        this.core.copyright = xss(html);
      };
      editor.customConfig.uploadImgServer = uploadFile;
      editor.customConfig.uploadImgHeaders = {
        accessToken: that.getStore("accessToken")
      };
      editor.customConfig.uploadFileName = "file";
      editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {},
        success: function(xhr, editor, result) {},
        fail: function(xhr, editor, result) {
          that.$Message.error("上传图片失败");
        },
        error: function(xhr, editor) {
          that.$Message.error("上传图片出错");
        },
        timeout: function(xhr, editor) {
          that.$Message.error("上传图片超时");
        },
        customInsert: function(insertImg, result, editor) {
          if (result.success === true) {
            let url = result.result;
            insertImg(url);
            that.$Message.success("上传图片成功");
          } else {
            that.$Message.error(result.message);
          }
        }
      };
      editor.customConfig.fontNames = ["微软雅黑", "宋体", "黑体", "Arial"];
      editor.customConfig.emotions = [
        {
          title: "新浪",
          type: "image",
          content: sina
        }
      ];
      editor.create();
    },
    editHTML() {
      this.dataEdit = this.core.copyright;
      this.showHTMLModal = true;
    },
    editHTMLOk() {
      editor.txt.html(this.dataEdit);
      this.core.copyright = xss(this.dataEdit);
      this.showHTMLModal = false;
    },
    getDictBucketRegions() {
      getDictDataByType("tencent_bucket_region").then(res => {
        if (res.success) {
          this.dictBucketRegions = res.result;
        }
      });
    },
    initOssSet() {
      this.loading = true;
      checkOssSet().then(res => {
        if (res.success && res.result) {
          let oss = res.result;
          getOssSet(oss).then(res => {
            this.loading = false;
            if (res.result) {
              // 转换null为""
              for (let attr in res.result) {
                if (res.result[attr] === null) {
                  res.result[attr] = "";
                }
              }
              this.oss = res.result;
            } else {
              this.changedOssSK = true;
            }
          });
        } else {
          this.loading = false;
          this.changedOssSK = true;
        }
      });
    },
    changeOss(v) {
      if (v == "ALI_OSS") {
        this.endpointPH = "请输入EndPoint(地域节点) 非Bucket域名";
      } else if (v == "TENCENT_OSS") {
        this.endpointPH =
          "请输入完整请求域名";
      } else {
        this.endpointPH = "请输入空间访问域名";
      }
      getOssSet(v).then(res => {
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.oss = res.result;
          this.changedOssSK = false;
        } else {
          this.oss = { serviceName: v };
          if (this.oss.serviceName == "LOCAL_OSS") {
            this.oss.http = "http://";
            this.oss.endpoint = "127.0.0.1:9999/xboot/file/view";
          }
          this.changedOssSK = true;
        }
      });
    },
    initSmsSet() {
      this.loading = true;
      getSmsSet(this.sms.serviceName).then(res => {
        this.loading = false;
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.sms = res.result;
          this.sms.type = "-1";
          this.changeSmsType(this.sms.type);
        } else {
          this.changedSmsSK = true;
        }
      });
    },
    changeSmsType(v) {
      getSmsTemplateCode(v).then(res => {
        if (res.success) {
          this.sms.templateCode = res.result;
        }
      });
    },
    initEmailSet() {
      this.loading = true;
      getEmailSet().then(res => {
        this.loading = false;
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.email = res.result;
        } else {
          this.changedEmailPass = true;
        }
      });
    },
    initVaptchaSet() {
      this.loading = true;
      getVaptchaSet().then(res => {
        this.loading = false;
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.vaptcha = res.result;
        } else {
          this.changedVaptchaSK = true;
        }
      });
    },
    initOtherSet() {
      this.loading = true;
      getOtherSet().then(res => {
        this.loading = false;
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.other = res.result;
        }
      });
    },

    initCoreSet() {
      this.loading = true;
      getCoreSet().then(res => {

        this.loading = false;
        if (res.result) {
          // 转换null为""
          for (let attr in res.result) {
            if (res.result[attr] === null) {
              res.result[attr] = "";
            }
          }
          this.core = res.result;

          editor.txt.html(this.core.copyright);
        }
      });
    },
    seeSecret(name) {
      if (!name) {
        return;
      }
      seeSecretSet(name).then(res => {
        if (res.success) {
          if (this.tabName == "oss") {
            this.oss.secretKey = res.result;
            this.changedOssSK = true;
          } else if (this.tabName == "sms") {
            this.sms.secretKey = res.result;
            this.changedSmsSK = true;
          } else if (this.tabName == "email") {
            this.email.password = res.result;
            this.changedEmailPass = true;
          } else if (this.tabName == "vaptcha") {
            this.vaptcha.secretKey = res.result;
            this.changedVaptchaSK = true;
          }
        }
      });
    },
    saveEditOss() {
      if (this.oss.serviceName == "LOCAL_OSS") {
        if (!this.oss.http) {
          this.errorMsg = "请选择http协议";
          return;
        } else {
          this.errorMsg = "";
        }
        if (!this.oss.endpoint) {
          this.errorMsg = "请输入文件预览接口";
          return;
        } else {
          this.errorMsg = "";
        }
        if (!this.oss.filePath) {
          this.errorMsg2 = "请输入存储磁盘路径";
          return;
        } else {
          this.errorMsg2 = "";
        }
        editOssSet(this.oss).then(res => {
          this.saveLoading = false;
          if (res.success) {
            this.$Message.success("保存成功");
          }
        });
      } else {
        this.$refs.ossForm.validate(valid => {
          if (valid) {
            if (!this.oss.http) {
              this.errorMsg = "请选择http协议";
              return;
            } else {
              this.errorMsg = "";
            }
            this.saveLoading = true;
            this.oss.changed = this.changedOssSK;
            editOssSet(this.oss).then(res => {
              this.saveLoading = false;
              if (res.success) {
                this.$Message.success("保存成功");
              }
            });
          }
        });
      }
    },
    saveEditSms() {
      this.$refs.smsForm.validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.sms.changed = this.changedSmsSK;
          editSmsSet(this.sms).then(res => {
            this.saveLoading = false;
            if (res.success) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    },
    saveEditEmail() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.email.changed = this.changedEmailPass;
          editEmailSet(this.email).then(res => {
            this.saveLoading = false;
            if (res.success) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    },
    saveEditVaptcha() {
      this.$refs.vaptchaForm.validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.vaptcha.changed = this.changedVaptchaSK;
          editVaptchaSet(this.vaptcha).then(res => {
            this.saveLoading = false;
            if (res.success) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    },
    saveEditOther() {
      this.$refs.otherForm.validate(valid => {
        if (valid) {
          this.saveLoading = true;
          editOtherSet(this.other).then(res => {
            this.saveLoading = false;
            if (res.success) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    },
    saveEditCore() {
      this.$refs.coreForm.validate(valid => {
        if (valid) {
          this.saveLoading = true;
          editCoreSet(this.core).then(res => {
            this.saveLoading = false;
            if (res.success) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    }
  },
  mounted() {
    let name = this.$route.query.name;
    if (name) {
      this.tabName = name;
    }
    this.init();
  }
};
</script>