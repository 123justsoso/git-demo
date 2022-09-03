import Vue from 'vue'



import {Button,Container,Main,Aside,Header,Submenu,MenuItemGroup,
    MenuItem,Menu,Dropdown,DropdownMenu,DropdownItem,Col,Row,Card,
    Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,
    Input,Select,DatePicker,Switch,Option,Dialog,Pagination,MessageBox,
    Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Pagination);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
