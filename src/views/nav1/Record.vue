<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;" >
			<el-form :inline="false" :model="filters" label-width="80px" >
				<el-form-item label="勘查单位">
					<el-select v-model="filters.kyUnitName" filterable
    					allow-create placeholder="请选择勘查单位" style="width: 100%;">
					    <el-option
					      v-for="item in unitOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</el-form-item>
				<el-form-item label="勘验人">
					<el-select v-model="filters.kyrName" filterable
    					allow-create placeholder="请选择勘验人" style="width: 100%;">
					    <el-option
					      v-for="item in userOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</el-form-item>
				<el-form-item label="勘查日期">
					<el-date-picker
				      v-model="kyDateQj" style="width: 100%;"
				      type="daterange" align="right" unlink-panels range-separator="  至  "
				      start-placeholder="开始日期"  end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
      				  value-format="yyyy-MM-dd" :picker-options="pickerOptions2">
    				</el-date-picker>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.recState" placeholder="请选择状态" style="width: 100%;">
					    <el-option
					      v-for="item in stateOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>
				</el-form-item>
				<el-form-item label="案件编号">
					<el-input  v-model="filters.recordNo" placeholder="请填写案件编号"></el-input>
				</el-form-item>
				<el-form-item label="案件标题">
					<el-input v-model="filters.recordTitle" placeholder="请填写案件标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"v-on:click="getRecords"><i class="el-icon-search"></i>查询</el-button>	
					<el-button type="info" :disabled="!hasPriv('addRecord')" @click="handleAdd">新增<i class="el-icon-upload el-icon--right"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="records" highlight-current-row v-loading="listLoading" stripe style="width: 100%;">			
			<el-table-column prop="recordNo" label="编号" width="180" sortable>
				<template slot-scope="scope">
		        	<el-popover trigger="hover" placement="top">
			          <a :href="scope.row.docUrl" target="_blank">{{ formatUrlGet(scope.row.recState) }}</a>
			          <div slot="reference" class="name-wrapper">
			            <el-tag type="success">{{ scope.row.recordNo }}</el-tag>
			          </div>
		        	</el-popover>
		      	</template>
			</el-table-column>
			<el-table-column prop="recTitle" label="标题" width="240" >				
			</el-table-column>
			<el-table-column prop="recordKyNo" label="勘验号" width="100" >
			</el-table-column>
			<el-table-column prop="recordJjNo" label="接警号" width="100" >
			</el-table-column>
			<el-table-column prop="recordAjNo" label="案件号" width="100" >
			</el-table-column>
			<el-table-column prop="kyrName" label="勘验人" width="100" >
			</el-table-column>			
			<el-table-column prop="kyUnitName" label="勘验单位" width="120" >
			</el-table-column>
			<el-table-column prop="kyDate" label="勘验日期" width="120" :formatter="dateFormat" sortable>
			</el-table-column>
			<el-table-column prop="recState" label="状态" width="80" :formatter="formatState" >
			</el-table-column>
			<el-table-column label="操作" width="200" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
					<!-- <el-button :disabled="checkShDisabled(scope.row)" size="small" @click="handleCheck(scope.$index, scope.row)">审核</el-button> -->
					<el-button :disabled="!hasPriv('deleteRecord')" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog width="80%" title="详情" :visible="editFormVisible" :close-on-click-modal="false" v-loading="editInfoLoading" @close="editFormVisible = false" >
			<el-tabs v-model="detailActiveTab" type="card" @tab-click="handleClick">
			    <el-tab-pane label="基本信息" name="baseInfo">
			    	<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
						<el-form-item label="编号" >
							<el-input v-model="editForm.recordNo" :disabled="true" ></el-input>
						</el-form-item>
						<el-form-item label="案件标题" >
							<el-input v-model="editForm.recTitle"></el-input>
						</el-form-item>
						<el-form-item label="勘验号" >
							<el-input v-model="editForm.recordKyNo"></el-input>
						</el-form-item>
						<el-form-item label="接警号" >
							<el-input v-model="editForm.recordJjNo"></el-input>
						</el-form-item>
						<el-form-item label="案件号" >
							<el-input v-model="editForm.recordAjNo"></el-input>
						</el-form-item>
						<el-form-item label="接警人">
							<el-select v-model="editForm.jjrName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value"  >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="接警单位">
							<el-select v-model="editForm.jjUnitName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="勘验人">
							<el-select v-model="editForm.kyrName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="勘验单位">
							<el-select v-model="editForm.kyUnitName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="勘验日期">
							<el-date-picker type="date" v-model="editForm.kyDate" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item label="接警时间">
							<el-date-picker type="datetime" v-model="editForm.jjTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item label="勘验开始时间">
							<el-date-picker type="datetime" v-model="editForm.kyksTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item label="勘验结束时间">
							<el-date-picker type="datetime" v-model="editForm.kyjsTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item label="发生区域" >
							<el-input v-model="editForm.fsqy"></el-input>
						</el-form-item>
						<el-form-item label="现场位置" >
							<el-input v-model="editForm.xcwz"></el-input>
						</el-form-item>
						<el-form-item label="现场坐标" >
							<el-input v-model="editForm.xczb"></el-input>
						</el-form-item>
						<el-form-item label="天气">
							<el-radio-group v-model="editForm.xctq">
								<el-radio-button label="晴">晴</el-radio-button>
								<el-radio-button label="雨">雨</el-radio-button>
								<el-radio-button label="阴">阴</el-radio-button>
								<el-radio-button label="多云">多云</el-radio-button>
								<el-radio-button label="雪">雪</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="风向">
							<el-radio-group v-model="editForm.xcfx">
								<el-radio-button label="无">无</el-radio-button>
								<el-radio-button label="东">东</el-radio-button>
								<el-radio-button label="南">南</el-radio-button>
								<el-radio-button label="西">西</el-radio-button>
								<el-radio-button label="北">北</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="温度">
							<el-select v-model="editForm.xcwd" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in temperOptions" :key="item.value" :label="item.label" :value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="湿度">
							<el-select v-model="editForm.xcsd" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in humidityOptions" :key="item.value" :label="item.label" :value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="灯光">
							<el-checkbox-group v-model="editForm.xcgz">
							    <el-checkbox label="自然光"></el-checkbox>
							    <el-checkbox label="灯光"></el-checkbox>
							    <el-checkbox label="特种光"></el-checkbox>
							</el-checkbox-group>						
						</el-form-item>
						<el-form-item label="现场状况">
							<el-radio-group v-model="editForm.xczk" @change="onXczkChange">
								<el-radio-button label="原始现场">原始现场</el-radio-button>
								<el-radio-button label="变动现场">变动现场</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="变动原因" :style="displayBdyy">
							<el-select v-model="editForm.bdyy" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in bdyyOptions" :key="item.value" :label="item.label" :value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="是否现场保护">
							<el-switch v-model="editForm.bhFlag" @change="onBhChange">
							</el-switch>
						</el-form-item>
						<el-form-item label="现场保护人" :style="displayState" >
							<el-select v-model="editForm.bhrName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="保护人单位" :style="displayState">
							<el-select v-model="editForm.bhrUnitName" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="保护人职位" :style="displayState">
							<el-input v-model="editForm.bhrZw"></el-input>
						</el-form-item>
						<el-form-item label="保护方式" :style="displayState">
							<el-select v-model="editForm.bhfs" style="width: 100%;" filterable	allow-create>
							    <el-option v-for="item in bhfsOptions" :key="item.value" :label="item.label" :value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="现场描述" name="dispInfo">
			    	<el-form :model="editForm2" label-width="80px" >
			    		<el-button @click.native="autoKysy" type="primary" plain>自动生成勘验事由</el-button>
			    		<el-form-item label="勘验事由">
				    		<el-input type="textarea" :rows="5" placeholder="请输入勘验事由" v-model="editForm2.kysy">
							</el-input>
						</el-form-item>
						<el-form-item label="现场东面">
				    		<el-input v-model="editForm2.xcEast">
							</el-input>
						</el-form-item>
						<el-form-item label="现场西面">
				    		<el-input v-model="editForm2.xcWest">
							</el-input>
						</el-form-item>
						<el-form-item label="现场南面">
				    		<el-input v-model="editForm2.xcSouth">
							</el-input>
						</el-form-item>
						<el-form-item label="现场北面">
				    		<el-input v-model="editForm2.xcNorth">
							</el-input>
						</el-form-item>
						<el-button @click.native="autoXcms" type="primary" plain>自动生成现场描述</el-button>
						<el-form-item label="现场描述">
				    		<el-input type="textarea" :rows="10" placeholder="请输入现场描述" v-model="editForm2.xcms">
							</el-input>
						</el-form-item>
			    	</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="相关图像" name="picInfo">
			    	<el-form :model="editForm3" label-width="20px" >
			    		<el-form-item>
			    			<el-button type="primary" @click.native="showOrderDialog" >调整图像顺序</el-button>
			    		</el-form-item>
			    		<el-form-item>
			    			<draggable v-model="curFiles" :move="getdata" @update="datadragEnd">
						      <transition-group>						        
						        <el-card class="box-card" v-for="(item, index) in curFiles" :key="item.fileId">
								  <div slot="header" class="clearfix">
								  	<el-select v-model="item.fileType" style="width: 80%;" >
									    <el-option v-for="item2 in fileTypeOptions" :key="item2.value" :label="item2.label" :value="item2.value">
									    </el-option>
								  	</el-select>
								    <el-button style="float: right; padding: 3px 0" type="text" @click.native="deletePicForEdit(item, index)">删除</el-button>
								  </div>							  
								  <div  class="text item">
								  	<img :src="item.fileUrl" class="image">
								  </div>
								  <div>
								  	<el-input v-model="item.fileHint" placeholder="输入图片说明" />        
								  </div>
								</el-card>
						      </transition-group>
						    </draggable>
			    		</el-form-item>		
						
						<el-form-item>
							<el-upload
							  class="upload-demo"
							  ref="upload"
							  :show-file-list="false"
							  :headers="uploadHeaders"
							  :action="uploadAction"
							  list-type="picture-card"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :on-success="handleSuccess"
							  :file-list="fileList"
							  :auto-upload="true">
							  <i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="人员信息" name="personInfo">
			    	<el-form :model="editForm4" label-width="120px" >
			    		<el-form-item label="见证人姓名">
				    		<el-input v-model="editForm4.jzrName">
							</el-input>
						</el-form-item>
						<el-form-item label="见证人性别">
				    		<el-input v-model="editForm4.jzrSex">
							</el-input>
						</el-form-item>
						<el-form-item label="见证人生日">
				    		<el-input v-model="editForm4.jzrBirth">
							</el-input>
						</el-form-item>
						<el-form-item label="见证人地址">
				    		<el-input v-model="editForm4.jzrAddress">
							</el-input>
						</el-form-item>
						<el-form-item label="现场指挥人">
							<el-select v-model="editForm4.zhrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="指挥人单位">
							<el-select v-model="editForm4.zhrUnitName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="指挥人职位" >
							<el-input v-model="editForm4.zhrZw"></el-input>
						</el-form-item>
						<el-form-item label="笔录人">
							<el-select v-model="editForm4.blrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="录音人">
							<el-select v-model="editForm4.lyrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="录像人">
							<el-select v-model="editForm4.lxrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="制图人">
							<el-select v-model="editForm4.ztrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="照相人">
							<el-select v-model="editForm4.zxrName" style="width: 100%;" filterable allow-create>
							    <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" >
							    </el-option>
						  	</el-select>
						</el-form-item>
			    	</el-form>
			    </el-tab-pane>
  			</el-tabs>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="recordSave" :disabled ="submitDisabled" :loading="editLoading">保存</el-button>
				<el-button type="primary" @click.native="recordSubmit" :disabled ="submitDisabled" :loading="editLoading">保存并提交</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible" >
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<el-dialog title="审核" :visible="checkFormVisible" :close-on-click-modal="false" v-loading="checkInfoLoading">
		  	<el-form :model="checkForm" label-width="80px">
		  		<el-form-item label="审核结果">
		  			<el-radio-group v-model="checkForm.shjg">
						<el-radio-button label=1004>审核通过</el-radio-button>
						<el-radio-button label=1003>审核未通过</el-radio-button>
					</el-radio-group>
		  		</el-form-item>
		  		<el-form-item label="审核意见">
		    		<el-input type="textarea" :rows="5" placeholder="请输入审核意见" v-model="checkForm.shyj">
					</el-input>
				</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
				<el-button @click.native="checkFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="checkSubmit" :loading="checkLoading">提交</el-button>
			</div>
		</el-dialog>
		<el-dialog width="80%" title="图像排序" :visible.sync="orderDialogVisible" >
		  <div class="">
		    <h1 style="text-align: center;">直接拖动图片排序</h1>
		    <draggable v-model="orderList" :move="getdata" @update="datadragEnd">
		      <transition-group>
		        <div class="orderItem" v-for="element in orderList" :key="element.fileId">
		          <img :src="element.fileUrl" class="image-thumbnail">
		        </div>
		      </transition-group>
		    </draggable>
		  </div>
		  <div slot="footer" class="dialog-footer">
				<el-button @click.native="orderDialogVisible = false">放弃</el-button>
				<el-button type="primary" @click.native="commitOrder"  :loading="commitOrderLoading">保存顺序</el-button>				
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser, getRecordList } from '../../api/api';
	import { SET_RECORDBASE, SET_RECORDDISP, SET_RECORDPERSON, SET_RECORDOTHER, SET_RECORDFILES, SET_LOC, CLR_RECORDINFO, SET_RECORDSH, SET_RECORDID } from '../../vuex/mutationTypes'
	var uuid = require('node-uuid')
	import draggable from 'vuedraggable'

	export default {
		components: {　　
	      draggable
	    },
		data() {
			return {
				displayState: "display:none",
				displayBdyy: "display:none",
				dialogImageUrl: '',
        		dialogVisible: false,
        		orderDialogVisible: false,
        		submitFlag: 'add',
				filters: {
					kyUnitName: '',
					kyrName: '',
					kyDateBegin: '',
					kyDateEnd: '',
					recState: '',
					recordTitle: '',
					recordNo: '',
					offset: 0,
					limit: 20
				},
				kyDateQj: '',
				unitOptions: this.$store.getters.GetterUnitState,
		        userOptions: this.$store.getters.GetterUserState,
			    temperOptions: this.$store.getters.GetterTemperList,
			    humidityOptions: this.$store.getters.GetterHumidityList,
			    bdyyOptions: this.$store.getters.GetterBdyyList,
			    bhfsOptions: this.$store.getters.GetterBhfsList,
			    fileTypeOptions: this.$store.getters.GetterFileTypeList,
			    pickerOptions2: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
		        stateOptions: this.$store.getters.GetterStateList,
		        detailActiveTab: 'baseInfo',
		        uploadAction: this.$store.getters.GetterBaseUrl+"uploadFiles/uploadFile",
		        uploadHeaders: {},
		        records: [],
		        curFiles: [],
		        fileList: [],
		        orderList: [],	
				total: 0,
				page: 1,
				commitOrderLoading: false,
				listLoading: false,
				editInfoLoading: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				checkFormVisible: false,
				checkInfoLoading: false,
				checkLoading: false,
				submitDisabled: false,
				editFormRules: {
					recTitle: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					recordId: 0,
			      	uuid: '',
			        recordNo: '',
			        recordKyNo: '',
				    recordJjNo: '',
				    recordAjNo: '',
			        kyrName: '',
			        kyUnitName: '',
			        jjrName: '',
			        jjUnitName: '',
			        kyUnitId: '',
			        bgrId: '',
			        bgrName: '',
			        recTitle: '',
			        recXz: '',
			        fsqy: '',
			        xcwz: '',
			        xczb: '',
			        recState: 0,
			        xctq: '',
			        xcsd: '',
			        xcwd: '',
			        kyDate: '',
			        jjTime: '',
			        afTime: '',
			        kyksTime: '',
			        kyjsTime: '',
			        xcfx: '',
			        xcgz: [],
			        xczk: '',
			        bhFlag: false,
			        bhrName: '',
			        bhrUnitName: '',
			        bhrZw: '',
			        bdyy: '',
			        bhfs: '',
			        jjrOther: ''
			        
				},
				editForm2: {
					kysy: '',
					xcms: '',
					xcEast: '',
				    xcWest: '',
				    xcSouth: '',
				    xcNorth: ''
				},
				editForm3: {},
				editForm4: {
					jzrName: '',
					jzrSex: '',
			      	jzrBirth: '',
			      	jzrAddress: '',
			      	zhrName: '',
			      	zhrUnitName: '',
			      	zhrZw: '',
			      	blrName: '',
			      	ztrName: '',
			      	zxrName: '',
			      	lxrName: '',
			      	lyrName: ''
				},				
				//界面数据
				checkForm: {
					shjg: 1004,
					shyj: ''
				}

			}
		},
		mounted() {
			//this.getUsers();
			//console.log(!this.hasPriv('addRecord'))
		},
		methods: {
			hasPriv(tag) {
				let privList = this.$store.getters.GetterPrivList
				var result = false
				privList.forEach(function (item) {
					if(item.priName === tag) {
						result = true
					}
				})
				return result
			},
			handleClick(tab, event) {
		        //console.log(tab, event);
		        if(tab.name === 'picInfo'){
		        	//this.getCurFiles(this.$store.getters.GetterEntity.uuid);
		        }
		    },
		    formatUrlGet: function(state) {
		    	if(state !== 1005) {
		    		return "尚未生成"
		    	}else {
		    		return "下载文档"
		    	}
		    },
			//状态显示转换
			formatState: function (row, column) {
				switch(row[column.property]){
					case 1001:
						return '未提交';
					case 1002:
						return '待审核';
					case 1003:
						return '审核未通过';
					case 1004:
						return '审核通过';
					case 1005:
						return '已生成文档';
					default:
						return '未知';
				}
			},
			//时间格式化  
            dateFormat:function(row, column) {  
              var date = row[column.property];  
	          if (date == undefined) {  
	             return "";
	          }
	          return this.$moment(date).format("YYYY-MM-DD");  
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getRecords();
			},
			onBhChange: function(value) {
				if(value){
		        	this.displayState = 'display:block';
		        }else{
		        	this.displayState = 'display:none';
		        }
			},
			onXczkChange: function(value) {
				if(value === '变动现场'){
		        	this.displayBdyy = 'display:block';
		        }else{
		        	this.displayBdyy = 'display:none';
		        }
			},
			checkShDisabled: function(row) {
				if(row.recState === 1002 && this.hasPriv('investigateRecord')){
					return false
				}else{
					return true
				}
			},
			autoKysy: function() {
				let data = this.$moment(this.editForm.jjTime).format("YYYY年MM月DD日hh点mm分") + ',' + this.editForm.jjUnitName + '接到报警：' + this.editForm.fsqy;
      			data += this.editForm.xcwz + '发生一宗' + this.editForm.recTitle + '。' + '需技术员对现场进行勘查。'
      			this.editForm2.kysy = data
			},
			autoXcms: function() {
			    let disp = '  现场位于' + this.editForm.fsqy + this.editForm.xcwz + ',现场';
			    if (this.editForm2.xcEast !== '') {
			      disp += '东侧为' + this.editForm2.xcEast + '，'
			    }
			    if (this.editForm2.xcSouth !== '') {
			        disp += '南侧为' + this.editForm2.xcSouth + '，'
			    }
			    if (this.editForm2.xcWest !== '') {
			        disp += '西侧为' + this.editForm2.xcWest + '，'
			    }
			    if (this.editForm2.xcNorth !== '') {
			        disp += '北侧为' + this.editForm2.xcNorth
			    }
			    disp += '。\n    中心现场位于';
			    this.editForm2.xcms = disp;
			},
			deletePicForEdit(item, index) {
				this.$confirm('确认删除该图片吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.editInfoLoading = true;
					let data = JSON.stringify(item.fileId);
					//NProgress.start();
					this.$http({
				        url: this.$store.getters.GetterBaseUrl+ 'uploadFiles/deleteFileInfo',
				        method: 'Post',
				        emulateJSON: true,
				        headers: {
				          contentType: 'application/x-www-form-urlencoded',
				          fileId: data,
				          requestType:'app',
						  accessToken: this.$store.getters.GetterAccessToken,
						  applyID: this.$store.getters.GetterSysInfo.applyID,
						  secretKey: this.$store.getters.GetterSysInfo.secretKey
				        }
				      }).then(function (res) {
				      	this.editInfoLoading = false
				      	if(res.data.code == 604){
				      		this.curFiles.splice(index,1)
				      	}else{
				      		this.$message({
								message: res.data.data,
								type: 'error'
							})
				      	}
				      })
				}).catch(() => {

				})
				
			},
			submitUpload() {
		        this.$refs.upload.submit()
		    },
		    handleRemove(file, fileList) {
		        //console.log(file, fileList);
		    },
		    handlePreview(file) {
		        this.dialogImageUrl = file.url
		        this.dialogVisible = true		        
		    },
		    handleSuccess(response, file, fileList) {
		    	console.log(response)
		    	this.curFiles.push(response.data)

		    	//this.uploadAction += this.$store.getters.GetterEntity.uuid
		    	//let data = String(this.$store.getters.GetterEntity.uuid)
		    	//this.uploadHeaders = {
		    	//	uuid: data
		    	//}
		    },
		    showOrderDialog() {
	      		this.orderDialogVisible = true
	      		this.orderList = this.curFiles
		    },
		    commitOrder() {

		    },
			//获取用户列表
			getRecords() {
				try{
				this.listLoading = true;
				this.filters.offset = this.page-1;
				if(this.kyDateQj === ''){
					let date = Date.now()
					this.filters.kyDateEnd = this.$moment(date).format("YYYY-MM-DD");
					this.filters.kyDateBegin = this.$moment(date).subtract(7, 'days').format("YYYY-MM-DD")
				}else {
					this.filters.kyDateEnd = this.$moment(this.kyDateQj["1"]).format("YYYY-MM-DD")
					this.filters.kyDateBegin = this.$moment(this.kyDateQj["0"]).format("YYYY-MM-DD")
				}
				//console.log(this.$moment(this.filters.kyDateBegin["0"]).format("YYYY-MM-DD"));				
				let data = JSON.stringify(this.filters)
				console.log(data);
				this.$http({
			        url: this.$store.getters.GetterBaseUrl + 'records/getRecentRecordList',
			        method: 'Post',
			        emulateJSON: true,
			        headers: {
			          contentType: 'application/x-www-form-urlencoded',
			          requestType:'app',
					  accessToken: this.$store.getters.GetterAccessToken,
					  applyID: this.$store.getters.GetterSysInfo.applyID,
					  secretKey: this.$store.getters.GetterSysInfo.secretKey
			        },
			        body: {
			        	filter: data
			        }
			      }).then(function (res) {
			      	this.listLoading = false
			      	if(res.data.code == 604){
			      		this.records = res.data.data.pbsList;
			      		this.total = res.data.data.rowNum;
			      	}else{
			      		this.$message({
							message: res.data.data,
							type: 'error'
						});
			      	}
			      }).catch(err => {
		            console.log(err)
		            this.listLoading = false
		          })
		        }
		        catch(err){
		        	console.log(err)
		        }
			},
			getCurFiles: function(uuid) {
				this.editInfoLoading = true
				let data = String(uuid)
				this.$http({
			        url: this.$store.getters.GetterBaseUrl + 'uploadFiles/getRecordFileList',
			        params: {accessToken: this.$store.getters.GetterAccessToken},
			        method: 'Get',
			        emulateJSON: true,
			        headers: {
			          contentType: 'application/x-www-form-urlencoded',
			          uuid: data,
			          requestType:'app',
					  accessToken: this.$store.getters.GetterAccessToken,
					  applyID: this.$store.getters.GetterSysInfo.applyID,
					  secretKey: this.$store.getters.GetterSysInfo.secretKey
			        }
			      }).then(function (res) {
			      	this.editInfoLoading = false
			      	if(res.data.code == 604){
			      		this.curFiles = res.data.data
			      		this.editInfoLoading = false
			      	}else{
			      		this.editInfoLoading = false
			      		this.$message({
							message: res.data.data,
							type: 'error'
						})
			      	}
			      })
			},
			getRecordInfo: function(id) {
				this.editInfoLoading = true
				let data = JSON.stringify(id)
				this.$http({
			        url: this.$store.getters.GetterBaseUrl + 'records/getRecordDetail',
			        params: {accessToken: this.$store.getters.GetterAccessToken},
			        method: 'Get',
			        emulateJSON: true,
			        headers: {
			          contentType: 'application/x-www-form-urlencoded',
			          recId: data,
			          requestType:'app',
					  accessToken: this.$store.getters.GetterAccessToken,
					  applyID: this.$store.getters.GetterSysInfo.applyID,
					  secretKey: this.$store.getters.GetterSysInfo.secretKey
			        }
			      }).then(function (res) {
			      	this.editInfoLoading = false
			      	if(res.data.code == 604){
			      		this.setRecordData(res.data.data)
			      		this.getCurFiles(this.$store.getters.GetterEntity.uuid)
			      		this.editFormVisible = true
			      	}else{
			      		this.$message({
							message: res.data.data,
							type: 'error'
						});
			      	}
			      });
			},
			setRecordData: function (data) {
				this.$store.commit(CLR_RECORDINFO, data)
				this.editForm.recordId= this.$store.getters.GetterEntity.recordId
			    this.editForm.uuid= this.$store.getters.GetterEntity.uuid
			    this.editForm.recordKyNo= this.$store.getters.GetterEntity.recordKyNo
			    this.editForm.recordJjNo= this.$store.getters.GetterEntity.recordJjNo
			    this.editForm.recordAjNo= this.$store.getters.GetterEntity.recordAjNo
			    this.editForm.recordNo= this.$store.getters.GetterEntity.recordNo
		        this.editForm.kyrName= this.$store.getters.GetterEntity.kyrName
		        this.editForm.kyUnitName= this.$store.getters.GetterEntity.kyUnitName
		        this.editForm.jjrName= this.$store.getters.GetterEntity.jjrName
		        this.editForm.jjUnitName= this.$store.getters.GetterEntity.jjUnitName
		        this.editForm.kyUnitId= this.$store.getters.GetterEntity.kyUnitId
		        this.editForm.bgrId= this.$store.getters.GetterEntity.bgrId
		        this.editForm.bgrName= this.$store.getters.GetterEntity.bgrName
		        this.editForm.recTitle= this.$store.getters.GetterEntity.recTitle
		        this.editForm.recXz= this.$store.getters.GetterEntity.recXz
		        this.editForm.fsqy= this.$store.getters.GetterEntity.fsqy
		        this.editForm.xcwz= this.$store.getters.GetterEntity.xcwz
		        this.editForm.xczb= this.$store.getters.GetterEntity.xczb
		        this.editForm.recState= this.$store.getters.GetterEntity.recState
				if((this.editForm.recState === 1001 || this.editForm.recState === 1003) && this.hasPriv('editRecord')){
					this.submitDisabled = false
				}else{
					this.submitDisabled = true
				}
		        this.editForm.xctq= this.$store.getters.GetterEntity.xctq
		        this.editForm.xcsd= this.$store.getters.GetterEntity.xcsd
		        this.editForm.xcwd= this.$store.getters.GetterEntity.xcwd
		        this.editForm.kyDate= this.$store.getters.GetterEntity.kyDate
		        this.editForm.jjTime= this.$store.getters.GetterEntity.jjTime
		        this.editForm.afTime= this.$store.getters.GetterEntity.afTime
		        this.editForm.kyksTime= this.$store.getters.GetterEntity.kyksTime
		        this.editForm.kyjsTime= this.$store.getters.GetterEntity.kyjsTime
		        this.editForm.xcfx= this.$store.getters.GetterEntity.xcfx
		        this.editForm.xcgz= []
		        this.editForm.xczk= this.$store.getters.GetterEntity.xczk
		        if(this.editForm.xczk === '变动现场'){
		        	this.displayBdyy = 'display:block'
		        }else{
		        	this.displayBdyy = 'display:none'
		        }
		        this.editForm.bhFlag= this.$store.getters.GetterEntity.bhFlag === 1 ? true : false;
		        if(this.editForm.bhFlag){
		        	this.displayState = 'display:block'
		        }else{
		        	this.displayState = 'display:none'
		        }
		        this.editForm.bhrName= this.$store.getters.GetterEntity.bhrName
		        this.editForm.bhrUnitName= this.$store.getters.GetterEntity.bhrUnitName
		        this.editForm.bhrZw= this.$store.getters.GetterEntity.bhrZw
		        this.editForm.bdyy= this.$store.getters.GetterEntity.bdyy
		        this.editForm.bhfs= this.$store.getters.GetterEntity.bhfs
		        this.editForm.jjrOther= this.$store.getters.GetterEntity.jjrOther
		        this.editForm2.kysy= this.$store.getters.GetterEntity.kysy
				this.editForm2.xcms= this.$store.getters.GetterEntity.xcms
				this.editForm2.xcEast= this.$store.getters.GetterEntity.xcEast
			    this.editForm2.xcWest= this.$store.getters.GetterEntity.xcWest
			    this.editForm2.xcSouth= this.$store.getters.GetterEntity.xcSouth
			    this.editForm2.xcNorth= this.$store.getters.GetterEntity.xcNorth
			    this.editForm4.jzrName= this.$store.getters.GetterEntity.jzrName
				this.editForm4.jzrSex= this.$store.getters.GetterEntity.jzrSex
		      	this.editForm4.jzrBirth= this.$store.getters.GetterEntity.jzrBirth
		      	this.editForm4.jzrAddress= this.$store.getters.GetterEntity.jzrAddress
		      	this.editForm4.zhrName= this.$store.getters.GetterEntity.zhrName
		      	this.editForm4.zhrUnitName= this.$store.getters.GetterEntity.zhrUnitName
		      	this.editForm4.zhrZw= this.$store.getters.GetterEntity.zhrZw
		      	this.editForm4.blrName= this.$store.getters.GetterEntity.blrName
		      	this.editForm4.ztrName= this.$store.getters.GetterEntity.ztrName
		      	this.editForm4.zxrName= this.$store.getters.GetterEntity.zxrName
		      	this.editForm4.lxrName= this.$store.getters.GetterEntity.lxrName
		      	this.editForm4.lyrName= this.$store.getters.GetterEntity.lyrName
				let data2 = String(this.$store.getters.GetterEntity.uuid);
		    	this.uploadHeaders = {
		    		uuid: data2
		    	};
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let data = JSON.stringify(row.recordId)
					this.$http({
				        url: this.$store.getters.GetterBaseUrl + 'records/deleteRecord',
				        params: {accessToken: this.$store.getters.GetterAccessToken},
				        method: 'Post',
				        emulateJSON: true,
				        headers: {
				          contentType: 'application/x-www-form-urlencoded',
				          recId: data,
				          requestType:'app',
						  accessToken: this.$store.getters.GetterAccessToken,
						  applyID: this.$store.getters.GetterSysInfo.applyID,
						  secretKey: this.$store.getters.GetterSysInfo.secretKey
				        }
				      }).then(function (res) {
				      	this.listLoading = false
				      	if(res.data.code == 604){
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							})
							this.getRecords()
				      	}else{
				      		this.$message({
								message: res.data.data,
								type: 'error'
							});
				      	}
			        })
				}).catch(() => {

				})

			},
			//显示编辑界面
			handleEdit: function (index, row) {				
				this.getRecordInfo(row.recordId)
				this.submitFlag = 'edit'
				//this.$refs.upload.clearFiles()		
				//console.log(row.recordId);
				//this.editForm = Object.assign({}, row);
			},
			handleCheck: function (index, row) {
				this.checkFormVisible = true
				this.$store.commit(SET_RECORDID, row.recordId)
			},
			//显示新增界面
			handleAdd: function () {
				this.submitDisabled = false
				//this.$refs.upload.clearFiles()
				let data = {
					recordId: 0,
			        uuid: uuid.v4(),
			        recordNo: '',
			        recordKyNo: '',
			        recordJjNo: '',
			        recordAjNo: '',
			        kyrName: this.$store.getters.GetterMe.userName,
			        kyUnitName: this.$store.getters.GetterMe.deptName,
			        jjrName: this.$store.getters.GetterMe.userName,
			      	jjUnitName: this.$store.getters.GetterMe.deptName,
			      	kyUnitId: this.$store.getters.GetterMe.deptCode,
			      	bgrId: this.$store.getters.GetterMe.userCode,
			      	bgrName: this.$store.getters.GetterMe.userName,
			      	recTitle: '',
			      	recXz: '',
			      	fsqy: '',
			      	xcwz: '',
			      	xczb: '',
			      	recState: 1001,
			      	xctq: '晴',
			      	xcsd: '50%',
			      	xcwd: '',
			      	kyDate: Date.now(),
			      	afTime: Date.now(),
			      	jjTime: Date.now(),
			      	kyksTime: Date.now(),
			      	kyjsTime: Date.now(),
			      	xcfx: '无',
			      	xcgz: '',
			      	xczk: '原始现场',
			      	bhFlag: 0,
			      	bhrName: this.$store.getters.GetterMe.userName,
			      	bhrUnitName: this.$store.getters.GetterMe.deptName,
			      	bhrZw: this.$store.getters.GetterMe.position,
			      	bdyy: '',
			      	bhfs: '',
			      	xcEast: '',
			      	xcWest: '',
			      	xcSouth: '',
			      	xcNorth: '',
			      	jzrName: '',
			      	jzrSex: '',
			      	jzrBirth: '',
			      	jzrAddress: '',
			      	zhrName: this.$store.getters.GetterMe.userName,
			      	zhrUnitName: this.$store.getters.GetterMe.deptName,
			      	zhrZw: this.$store.getters.GetterMe.position,
			      	blrName: this.$store.getters.GetterMe.userName,
			      	ztrName: this.$store.getters.GetterMe.userName,
			      	zxrName: this.$store.getters.GetterMe.userName,
			      	lxrName: this.$store.getters.GetterMe.userName,
			      	lyrName: '',
			      	jjrOther: '',
			      	kysy: '',
			      	xcms: ''
				}
				this.curFiles = []
				this.setRecordData(data)
				this.submitFlag = 'add'
				this.editFormVisible = true
			},
			checkSubmit: function () {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					this.checkLoading = true;
					let checkValue = {
						recState: this.checkForm.shjg,
						shyj: this.checkForm.shyj
					}
					this.$store.commit(SET_RECORDSH, checkValue)
					let data = JSON.stringify(this.$store.getters.GetterEntity)
					this.$http({
				        url: this.$store.getters.GetterBaseUrl + 'records/checkRecord',
				        params: {accessToken: this.$store.getters.GetterAccessToken},
				        method: 'Post',
				        emulateJSON: true,
				        headers: {
				          contentType: 'application/x-www-form-urlencoded',
				          requestType:'app',
						  accessToken: this.$store.getters.GetterAccessToken,
						  applyID: this.$store.getters.GetterSysInfo.applyID,
						  secretKey: this.$store.getters.GetterSysInfo.secretKey
				        },
				        body: {
				            record: data
				        }
				      }).then(function (res) {
				      	this.checkLoading = false
				      	if(res.data.code == 604){
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.checkFormVisible = false
							this.getRecords()
				      	}else{
				      		this.$message({
								message: res.data.data,
								type: 'error'
							});
				      	}
			        })
				})
			},
			recordSubmit: function () {
				this.editForm.recState = 1004
				this.doSubmit()
			},
			recordSave: function () {
				this.editForm.recState = 1001
				this.doSubmit()
			},
			//编辑
			doSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let editValue = {
								recordId: this.editForm.recordId,
						        uuid: this.editForm.uuid,
						        recordNo: this.editForm.recordNo,
						        recordKyNo: this.editForm.recordKyNo,
						        recordJjNo: this.editForm.recordJjNo,
						        recordAjNo: this.editForm.recordAjNo,
						        kyrName: this.editForm.kyrName,
						        kyUnitName: this.editForm.kyUnitName,
						        jjrName: this.editForm.jjrName,
						      	jjUnitName: this.editForm.jjUnitName,
						      	kyUnitId: this.editForm.kyUnitId,
						      	bgrId: this.editForm.bgrId,
						      	bgrName: this.editForm.bgrName,
						      	recTitle: this.editForm.recTitle,
						      	recXz: this.editForm.recXz,
						      	fsqy: this.editForm.fsqy,
						      	xcwz: this.editForm.xcwz,
						      	xczb: this.editForm.xczb,
						      	recState: this.editForm.recState,
						      	xctq: this.editForm.xctq,
						      	xcsd: this.editForm.xcsd,
						      	xcwd: this.editForm.xcwd,
						      	kyDate: this.editForm.kyDate,
						      	jjTime: this.editForm.jjTime,
						      	afTime: this.editForm.afTime,
						      	kyksTime: this.editForm.kyksTime,
						      	kyjsTime: this.editForm.kyjsTime,
						      	xcfx: this.editForm.xcfx,
						      	xcgz: this.editForm.xcgz,
						      	xczk: this.editForm.xczk,
						      	bhFlag: this.editForm.bhFlag,
						      	bhrName: this.editForm.bhrName,
						      	bhrUnitName: this.editForm.bhrUnitName,
						      	bhrZw: this.editForm.bhrZw,
						      	bdyy: this.editForm.bdyy,
						      	bhfs: this.editForm.bhfs,
						      	xcEast: this.editForm.xcEast,
						      	xcWest: this.editForm.xcWest,
						      	xcSouth: this.editForm.xcSouth,
						      	xcNorth: this.editForm.xcNorth,
						      	jzrName: this.editForm4.jzrName,
						      	jzrSex: this.editForm4.jzrSex,
						      	jzrBirth: this.editForm4.jzrBirth,
						      	jzrAddress: this.editForm4.jzrAddress,
						      	zhrName: this.editForm4.zhrName,
						      	zhrUnitName: this.editForm4.zhrUnitName,
						      	zhrZw: this.editForm4.zhrZw,
						      	blrName: this.editForm4.blrName,
						      	ztrName: this.editForm4.ztrName,
						      	zxrName: this.editForm4.zxrName,
						      	lxrName: this.editForm4.lxrName,
						      	lyrName: this.editForm4.lyrName,
						      	jjrOther: this.editForm4.jjrOther,
						      	kysy: this.editForm2.kysy,
						      	xcms: this.editForm2.xcms
							}
							this.$store.commit(CLR_RECORDINFO, editValue)
							this.$store.commit(SET_RECORDFILES, this.curFiles)
							let data = JSON.stringify(this.$store.getters.GetterEntity)
							let data2 = JSON.stringify(this.$store.getters.GetterFileList)
							let extUrl = ''
							if(this.submitFlag === 'add'){
								extUrl = 'records/addRecord'
							}else{
								extUrl = 'records/updateRecord'
							}
							this.$http({
						        url: this.$store.getters.GetterBaseUrl + extUrl,
						        params: {accessToken: this.$store.getters.GetterAccessToken},
						        method: 'Post',
						        emulateJSON: true,
						        headers: {
						          contentType: 'application/x-www-form-urlencoded',
						          requestType:'app',
						  		  accessToken: this.$store.getters.GetterAccessToken,
						  		  applyID: this.$store.getters.GetterSysInfo.applyID,
						  		  secretKey: this.$store.getters.GetterSysInfo.secretKey
						        },
						        body: {
						            record: data,
						            fileList: data2
						        }
						      }).then(function (res) {
						      	this.editLoading = false;
						      	if(res.data.code == 604){
									//NProgress.done();
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.editFormVisible = false
									this.getRecords()
						      	}else{
						      		this.$message({
										message: res.data.data,
										type: 'error'
									});
						      	}
					        })
						})
					}
				})
			},
			getdata(evt) {
		      console.log(evt.draggedContext.element.id)
	        },
		    datadragEnd(evt) {
		      console.log('拖动前的索引 :' + evt.oldIndex)
		      console.log('拖动后的索引 :' + evt.newIndex)
		      //console.log(this.curFiles)
		    }					
		}		
	}

</script>

<style >
	.time {
	    font-size: 13px;
	    color: #999;
	  }
	  
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }

	  .button {
	    padding: 0;
	    float: right;
	  }

	  .image {
	    width: 100%;
	    display: block;
	  }

	  .image-thumbnail {
	  	width: 100px;
	  	height: 60px;
	  }
	  .orderItem {
	  	border: 1;
	  	border-radius: 2;	  	
	  	align: middle;
	  	vertical-align: middle;
	  	display: table-cell;
	  }
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
	  .box-card {
	    width: 80%;
	  }
</style>