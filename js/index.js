var baseUrl="http://192.168.8.180:8099/";
$('#operation_process_table').bootstrapTable({
    striped:true,
    classes:"table table-no-bordered",
    data: [{1:"栽培",2:"1",3:"1",4:"false",5:"2018-3-2",6:"false",7:"1111"}],
    columns: [
        {field: '1',title: '名称',align:"center"}, 
        {field: '2',title: '编号',align:"center"}, 
        // {field: '3',title: '排序',align:"center"},
        // {field: '4',title: '默认',align:"center"},
        // {field: '5',title: '创建时间',align:"center"}, 
        {field: '6',title: '有效',align:"center"},
        {field: '7',title: '备注',align:"center"},
    ],
    onClickRow:function(row,ele,field){
        console.log(row);
    }
});
$('#operation_field_table').bootstrapTable({
    striped:true,
    classes:"table table-no-bordered",
    data: [{1:"content",2:"1",3:"1",4:"false",5:"2018-3-2",6:"false",7:"1111"}],
    columns: [
        {field: '1',title: '字段名称',align:"center"}, 
        {field: '2',title: '字段类型',align:"center"}, 
        // {field: '3',title: '编码',align:"center"},
        // {field: '4',title: '排序',align:"center"},
        // {field: '5',title: '创建时间',align:"center"}, 
        {field: '6',title: '有效',align:"center"},
        {field: '7',title: '备注',align:"center"},
    ],
    onClickRow:function(row,ele,field){
        console.log(row);
    }
});

$.ajax({
    type: "get",
    url: baseUrl+'api/Origin/GetProgramByNumber?findNumber=11111111111111111111',
    dataType: 'json',
    async: false,//同步
    success: function (data) {
        $.ajax({
            type:"get",
            url:baseUrl+'api/Origin/GetProgramChildList?programId='+data.F_Id,
            dataType:'json',
            async：
        })
    }
})