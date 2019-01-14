package cn.exrick.xboot.modules.base.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author Exrickx
 */
@Data
public class CoreSetting implements Serializable{

    @ApiModelProperty(value = "平台名称")
    private String platformName;

    @ApiModelProperty(value = "平台描述信息")
    private String platformInfo;

    @ApiModelProperty(value = "版权")
    private String copyright;

    @ApiModelProperty(value = "登录百叶窗效果")
    private String isShowShades;

    @ApiModelProperty(value = "平台首页Logo")
    private String homeLogo;

    @ApiModelProperty(value = "菜单收缩首页Logo")
    private String shrinkLogo;

    @ApiModelProperty(value = "icon图标")
    private String iconIco;

    @ApiModelProperty(value = "登录Logo")
    private String loginLogo;

    @Override
    public String toString() {
        return "CoreSetting{" +
                "platformName='" + platformName + '\'' +
                ", platformInfo='" + platformInfo + '\'' +
                ", copyright='" + copyright + '\'' +
                ", isShowShades='" + isShowShades + '\'' +
                ", homeLogo='" + homeLogo + '\'' +
                ", shrinkLogo='" + shrinkLogo + '\'' +
                ", iconIco='" + iconIco + '\'' +
                ", loginLogo='" + loginLogo + '\'' +
                '}';
    }
}
