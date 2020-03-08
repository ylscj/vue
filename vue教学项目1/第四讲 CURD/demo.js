Vue.component('model', {
    props: ['list', 'isactive'],
    template: `<div class="overlay" v-show="isactive">
                    <div class="con">
                    <h2 class="title">新增 | 修改</h2>
                    <div class="content">
                    <table>
                        <tr>
                            <td>用户名</td>
                            <td><input type="text" v-model="modifylist.username"></td>
                        </tr>
                        <tr>
                            <td>邮箱</td>
                            <td><input type="text" v-model="modifylist.email"></td>
                        </tr>
                        <tr>
                            <td>性别</td>
                            <td>
                                <label><input type="radio" name="sex" value="男" v-model="modifylist.sex">男</label>
                                <label><input type="radio" name="sex" value="女" v-model="modifylist.sex">女</label>
                                <label><input type="radio" name="sex" value="未知" v-model="modifylist.sex">未知</label>
                            </td>
                        </tr>
                        <tr>
                            <td>省份</td>
                            <td>
                                <select name="" id="" v-model="modifylist.province">
                                    <option value="北京市">北京市</option>
                                    <option value="河北省">河北省</option>
                                    <option value="河南省">河南省</option>
                                    <option value="重庆市">重庆市</option>
                                    <option value="广东省">广东省</option>
                                    <option value="辽宁省">辽宁省</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>爱好</td>
                            <td>
                                <label><input type="checkbox" v-model="modifylist.hobby" value="篮球">篮球</label>
                                <label><input type="checkbox" v-model="modifylist.hobby" value="读书">读书</label>
                                <label><input type="checkbox" v-model="modifylist.hobby" value="插画">插画</label>
                                <label><input type="checkbox" v-model="modifylist.hobby" value="编程">编程</label>
                                <label><input type="checkbox" v-model="modifylist.hobby" value="弹琴">弹琴</label>
                            </td>
                        </tr>
                    </table>
                    <p>
                    <input type="button" @click="changeActive" value="取消">
                    <input type="button" @click="modify" value="保存">
                    </p>
                    </div>
                    </div>
                </div>`,
    computed: {
        modifylist() {
            return this.list;
        }
    },
    methods: {
        changeActive() {
            this.$emit('change');
        },
        modify() {
            this.$emit('modify', this.modifylist);
        }
    }
});
var app = new Vue({
    el: '#app',
    data: {
        isActive: false,
        selected: -1,
        selectedlist: {},
        slist: [],
        searchlist: [],
        list: [
            {
                username: 'aaaaa',
                email: '123@qq.com',
                sex: '男',
                province: '北京市',
                hobby: ['篮球', '读书', '编程']
            },
            {
                username: 'bbbbb',
                email: 'bbbbbbb@163.com',
                sex: '女',
                province: '河北省',
                hobby: ['弹琴', '读书', '插画']
            },
            {
                username: 'aaabb',
                email: 'abababab@qq.com',
                sex: '女',
                province: '重庆市',
                hobby: ['篮球']
            },
            {
                username: 'cccccc',
                email: '123@qq.com',
                sex: '男',
                province: '北京市',
                hobby: ['篮球', '读书', '编程']
            },
            {
                username: 'dddddd',
                email: 'bbbbbbb@163.com',
                sex: '女',
                province: '河北省',
                hobby: ['弹琴', '读书', '插画']
            },
            {
                username: 'eeeee',
                email: 'abababab@qq.com',
                sex: '女',
                province: '重庆市',
                hobby: ['篮球']
            }
        ]
    },
    created() {
        this.setSlist(this.list);
    },
    methods: {
        // 修改数据
        showOverlay(index) {
            this.selected = index;
            this.selectedlist = this.list[index];
            this.changeOverlay();
        },
        // 点击保存按钮
        modify(arr) {
            if (this.selected > -1) {
                Vue.set(this.list, this.selected, arr);
                this.selected = -1;
            } else {
                this.list.push(arr);
            }
            this.setSlist(this.list);
            this.changeOverlay();
        },
        add: function () {
            this.selectedlist = {
                username: '',
                email: '',
                sex: '男',
                province: '北京市',
                hobby: []
            };
            this.isActive = true;
        },
        // delete list in index location
        del(index) {
            this.list.splice(index, 1);
            this.setSlist(this.list);
        },
        changeOverlay() {
            this.selected = -1;
            this.isActive = !this.isActive;
        },
        // 获取需要渲染到页面中的数据
        setSlist(arr) {
            this.slist = JSON.parse(JSON.stringify(arr));
        },
        // 搜索
        search(e) {
            var v = e.target.value,
                self = this;
            self.searchlist = [];
            if (v) {
                var ss = [];
                // 过滤需要的数据
                this.list.forEach(function (item) {
                    if (item.username.indexOf(v) > -1) {
                        if (self.searchlist.indexOf(item.username) == -1) {
                            self.searchlist.push(item.username);
                        }
                        ss.push(item);
                    } else if (item.email.indexOf(v) > -1) {
                        if (self.searchlist.indexOf(item.email) == -1) {
                            self.searchlist.push(item.email);
                        }
                        ss.push(item);
                    }
                });
                this.setSlist(ss); // 将过滤后的数据给了slist
            } else {
                // 没有搜索内容，则展示全部数据
                this.setSlist(this.list);
            }
        }
    },
    watch: {
    }
})