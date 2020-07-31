define(['jquery', 'bootstrap', 'backend', 'table', 'form','clipboard'], function ($, undefined, Backend, Table, Form, ClipboardJS) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/index/index' + location.search,
                    add_url: 'order/index/add',
                    edit_url: 'order/index/edit',
                    del_url: 'order/index/del',
                    multi_url: 'order/index/multi',
                    table: 'order',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'out_trade_no', title: __('Out_trade_no')},
                        {field: 'bank_number', title: __('Bank_number')},
                        {field: 'bank_type', title: __('Bank_type')},
                        {field: 'bank_from', title: __('Bank_from'), events: Controller.api.xiaobao, formatter: Controller.api.formatter.ip},
                        {field: 'bank_user', title: __('Bank_user'), events: Controller.api.xiaobao, formatter: Controller.api.formatter.ip},
                        {field: 'amount', title: __('Amount'), operate:'BETWEEN',events: Controller.api.xiaobao, formatter: Controller.api.formatter.ip},
                        {field: 'status', title: __('Status'), searchList: {"1":__('Status 1'),"2":__('Status 2')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'ordertime', title: __('Ordertime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'acount', title: __('Acount')},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 绑定TAB事件
            $('.panel-heading a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var field = $(this).closest("ul").data("field");
                var value = $(this).data("value");
                var options = table.bootstrapTable('getOptions');
                options.pageNumber = 1;
                options.queryParams = function (params) {
                    var filter = {};
                    if (value !== '') {
                        filter[field] = value;
                    }
                    params.filter = JSON.stringify(filter);
                    return params;
                };
                table.bootstrapTable('refresh', {});
                return false;
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            var clipboard = new ClipboardJS('.btn-fuzhi');
            clipboard.on('success', function(e) {
                Toastr.info('复制成功');
            });

            clipboard.on('error', function(e) {

            });

        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
            formatter: {//渲染的方法
                ip: function (value, row, index) {
                    return '<a href="javascript:;"  data-clipboard-text="'+value+'"class="btn btn-xs btn-fuzhi btn-success" data-toggle="tooltip" title="" data-table-id="table" data-field-index="13" data-row-index="0" data-button-index="1" data-original-title="点击复制">'+value+'</a>';
                },
            },
            xiaobao:{
                'click .btn-fuzhi': function (e, value, row, index) {

                }
            }
        },

    };
    return Controller;
});

