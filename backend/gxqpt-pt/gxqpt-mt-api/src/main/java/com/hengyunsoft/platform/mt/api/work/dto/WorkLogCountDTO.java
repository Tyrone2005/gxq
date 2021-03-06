package com.hengyunsoft.platform.mt.api.work.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author tianai
 * @createTime 2018-05-28
 */
@Data
public class WorkLogCountDTO implements Serializable{

    /**
     * ID
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "id")
    private String id;

    /**
     * 高新区平台中的用户id
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "gxqptEmpId")
    private Long gxqptEmpId;

    /**
     * 姓名
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "姓名")
    private String name;

    /**
     * 所属部门id
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "所属部门id")
    private String maindeptid;

    /**
     * 所属部门名称
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "所属部门名称")
    private String maindeptname;

    /**
     * 所属职务id
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "所属职务id")
    private String mainduty;

    /**
     * 所属职务名称
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "所属职务名称")
    private String maindutyname;

    /**
     * 照片
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "照片")
    private String photo;
    /**
     * 本周日志数量
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = " 本周日志数量")
    private Integer count;
}
