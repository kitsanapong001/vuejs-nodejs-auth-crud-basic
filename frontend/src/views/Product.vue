<template>
    <b-container fluid style="max-width: 1500px;">
        
        <div class="d-flex" style="font-size: 1em;color: #888988;text-align: left;margin-bottom: 20px;cursor: pointer;">
          <b-button variant="light" style="margin-right: 10px" to="/">
            <font-awesome-icon icon="arrow-left" />
            Back
          </b-button>
        </div>
         <b-overlay :show="loadOverlay" rounded="sm" opacity="0">
         <div id="container-brand">
            <div class="d-flex">
                <div style="margin-right: auto">
                    <h4>จัดการสินค้า</h4>
                </div>
                <div style="margin-left: auto">
                    <b-button @click="openModalCreate"  pill variant="info" style="min-width: 150px">เพิ่มสินค้า</b-button>
                </div>
            </div>
            <div style="background-color: #ffffff; border-radius: 20px; padding: 20px;">
            <b-row class="mt-3 mb-1">
               
            <b-col class="col-12">
                <b-input-group size="sm">
                <template #prepend>
                <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="sm"
                    style="width: 60px"
                ></b-form-select>
                </template>
                <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="ค้นหา"
                ></b-form-input>
                <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">ล้าง</b-button>
                </b-input-group-append>
                </b-input-group>
            </b-col>
            </b-row>
           
            <b-table
                class="mt-2"
                :items="items"
                :fields="fields"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :per-page="perPage"
                :current-page="currentPage"
                stacked="md"
                show-empty
                small
                hover
                responsive
                :busy="isBusy"
            >
                <template #cell(items)="row">
                    {{ row.value.first }} {{ row.value.last }}
                </template>
                <template #cell(action)="row">
                    <b-button size="sm" variant="primary" @click="info(row.item, row.index, $event.target)" class="mr-1">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </b-button>
                    
                    <b-button size="sm" variant="primary" @click="openModaleditProduct(row.item, row.index, $event.target)" class="mr-1">
                        <font-awesome-icon icon="fa-solid fa-edit" />
                    </b-button>

                    <b-button size="sm" variant="danger" @click="deleteProduct(row.item.product_id)" class="mr-1">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </b-button>
                    
                </template>
            </b-table>
            <hr>
            <b-row>
                <!-- pagination -->
                <b-col class="col-12" style="text-align: center">
                <b-form-group class="mb-0">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </b-form-group>
                </b-col>
                <b-col class="col-12 mt-3">
                    <p>จำนวน : {{ totalRows }} รายการ</p>
                </b-col>
            </b-row>
        </div>
        </div>
        </b-overlay>
        <b-modal v-model="modalErr" centered hide-header hide-footer>
            <div style="font-size: 3em; color: red; text-align: center">
                <font-awesome-icon icon="fa-exclamation-circle" />
            </div>
            <p class="my-4" style="text-align: center">
                {{ message }}
            </p>
        </b-modal>
    
        <!-- modal ok -->
        <b-modal v-model="modalOk" centered hide-header hide-footer>
            <div style="font-size: 3em; color: green; text-align: center">
                <font-awesome-icon icon="fa-check-circle" />
            </div>
            <p class="my-4 text-break" style="text-align: center;max-width: 100%;">
                {{ message }}
            </p>
        </b-modal>
    
        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
          size="lg"
        >
        <div class="mt-3">
            <b-row>
                <b-col class="col-4 text-right">ID : </b-col>
                <b-col class="col-8">{{infoModal.content.product_id}}</b-col>
                <b-col class="col-4 text-right">ชื่อสินค้า : </b-col>
                <b-col class="col-8">{{infoModal.content.product_name}}</b-col>
                <b-col class="col-4 text-right">จำนวน : </b-col>
                <b-col class="col-8">{{infoModal.content.product_quanlity}}</b-col>
                <b-col class="col-4 text-right">รายละเอียด​ : </b-col>
                <b-col class="col-8">{{infoModal.content.product_detail}}</b-col>
            </b-row>
        </div>
          <!-- <pre>{{ infoModal.content }}</pre> -->
        </b-modal>
    
    
        <!-- modal add user -->
        <b-modal size="lg"  v-model="addProductModal" title="เพิ่มสินค้า" hide-footer>
            <form name="form-add" @submit.prevent="createProduct">
            <div style="text-align: center; align-self: center;text-align: -webkit-center; margin-bottom: 10px;">
            </div>
            <div>
                <b-row>
                    <b-col class="col-12">
                        <div class="d-flex justify-content-center">
                            <lottie-player 
                            src="https://assets7.lottiefiles.com/packages/lf20_3ysy72ke.json" 
                            background="transparent"  
                            style="width: 250px; height: 250px;" 
                            autoplay loop
                            ></lottie-player>
                        </div>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="ชื่อสินค้า"
                            label-for="product_name"
                        >
                            <b-form-input
                            id="product_name"
                            v-model="product.product_name"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="จำนวน"
                            label-for="product_quanlity"
                        >
                            <b-form-input
                            id="product_quanlity"
                            v-model="product.product_quanlity"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="รายละเอียด"
                            label-for="product_detail"
                        >
                            <b-form-input
                            type="text"
                            id="product_detail"
                            v-model="product.product_detail"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                        label="สถานะ"
                        label-for="product_status_option"
                        >
                            <b-form-select
                                id="product_status_option"
                                v-model="product.product_status"
                                class="mb-3"
                                :options="product_status_option"
                                required
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
              <hr class="mt-3">
              <div class="d-flex justify-content-end">
                <b-button class="mt-3 btn btn-secondary mx-1" @click="addProductModal = false">ปิด</b-button>
                <b-button class="mt-3 btn btn-info mx-1" type="submit" :disabled="loading">
                  บันทึก 
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                </b-button>
              </div>
            </div>
            </form>
        </b-modal>
    
        <!-- modal edit user -->
        <b-modal size="lg"  v-model="editProductModal" title="แก้ไขข้อมูลสติ๊กเกอร์" hide-footer>
            <form name="form-add" @submit.prevent="editProduct">
                <div style="text-align: center; align-self: center;text-align: -webkit-center; margin-bottom: 10px;">
            </div>
            <div>
                <b-row>
                    <b-col class="col-12">
                        <div class="d-flex justify-content-center">
                            <lottie-player 
                            src="https://assets7.lottiefiles.com/packages/lf20_3ysy72ke.json" 
                            background="transparent"  
                            style="width: 250px; height: 250px;" 
                            autoplay loop
                            ></lottie-player>
                        </div>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="ID"
                            label-for="product_id"
                        >
                            <b-form-input
                            id="product_id"
                            v-model="product.product_id"
                            class="pl-3 mb-2"
                            disabled
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="ชื่อสินค้า"
                            label-for="product_name"
                        >
                            <b-form-input
                            id="product_name"
                            v-model="product.product_name"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="จำนวน"
                            label-for="product_quanlity"
                        >
                            <b-form-input
                            id="product_quanlity"
                            v-model="product.product_quanlity"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                            label="รายละเอียด"
                            label-for="product_detail"
                        >
                            <b-form-input
                            type="text"
                            id="product_detail"
                            v-model="product.product_detail"
                            class="pl-3 mb-2"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-12">
                        <b-form-group
                        label="สถานะ"
                        label-for="product_status_option"
                        >
                            <b-form-select
                                id="product_status_option"
                                v-model="product.product_status"
                                class="mb-3"
                                :options="product_status_option"
                                required
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
              <hr class="mt-3">
              <div class="d-flex justify-content-end">
                <b-button class="mt-3 btn btn-secondary mx-1" @click="editProductModal = false">ปิด</b-button>
                <b-button class="mt-3 btn btn-info mx-1" type="submit" :disabled="loading">
                  บันทึก 
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                </b-button>
              </div>
            </div>
            </form>
        </b-modal>
    
      </b-container>
    </template>
    
    <script>
    import JQuery from 'jquery'
    import UserService from "../services/User/user.service";
    import ProductService from "../services/Product/product.service";
    
    window.$ = JQuery
    export default {
        data(){
            return{
                items: [],
                fields: [
                    {
                        key: "no",
                        label: "No.",
                        sortable: true,
                        class: "text-center",
                        sortDirection: "desc",
                    },
                    {
                        key: "product_id",
                        label: "ID",
                        sortable: true,
                        class: "text-center",
                    },
                    {
                        key: "product_name",
                        label: "ชื่อสินค้า",
                        sortable: true,
                        class: "text-center",
                        sortDirection: "desc",
                    },
                    {
                        key: "product_quanlity",
                        label: "จำนวน",
                        sortable: true,
                        class: "text-center",
                    },
                    {
                        key: "product_detail",
                        label: "รายละเอียด",
                        sortable: true,
                        class: "text-center",
                    },
                    {
                        key: "product_status",
                        label: "สถานะ",
                        sortable: true,
                        class: "text-center",
                    },
                    { key: "action", label: "Action", class: "text-center" },
                ],
                pageOptions: [10, 25, 50, { value: 100, text: "All" }],
                sortBy: "",
                sortDesc: false,
                sortDirection: "asc",
                filter: null,
                filterOn: [],
                totalRows: 0,
                currentPage: 1,
                perPage: 25,
                loadOverlay: false,
                message: null,
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
                isBusy: false,

                product: {
                    product_name: "",
                    product_quanlity: "",
                    product_detail: "",
                    product_status: 1,
                },
                product_status_option: [
                    {value: 1, text: 'ใช้งาน'},
                    {value: 0, text: 'ปิดใช้งาน'},
                  ],
                user: {
                  user_name: "",
                  user_fullname: "",
                  user_email: "",
                  user_status: true,
                  user_status_option: [
                    {value: true, text: 'ใช้งาน'},
                    {value: false, text: 'ปิดใช้งาน'},
                  ],
                  user_role: "user",
                  user_role_option: [
                    {value: "root", text: 'root'},
                    {value: "admin", text: 'admin'},
                    {value: "user", text: 'user'},
                  ],
                  user_id : "",
                },
                loading: false,
                addProductModal: false,
                preview: null,
                previewUrl: null,
                modalOk: false,
                modalErr: false,
                editProductModal: false,
                passwordNew: "",
                passwordNewMath: "",
                validatePass1: null,
                passwordMsg1: "",
                validatePass2: null,
                passwordMsg2: "",
                password_uid: "",
                resetDeleteProductModal: false,
                login_logs_modal: false,
                items_login_logs: [],
                fields_login_logs: [
                {
                    key: "no",
                    label: "No.",
                    sortable: true,
                    class: "text-center",
                    sortDirection: "desc",
                },
                {
                    key: "email",
                    label: "อีเมล",
                    sortable: true,
                    class: "text-center",
                    sortDirection: "desc",
                },
                {
                    key: "dateTimeStampString",
                    label: "เวลา",
                    sortable: true,
                    class: "text-center",
                    sortDirection: "desc",
                },
                {
                    key: "ipaddress",
                    label: "IP ADDRESS",
                    sortable: true,
                    class: "text-center",
                    sortDirection: "desc",
                },
            ],
            }
        },
        async mounted(){
            this.getAllProduct();
        },
        methods:{
            checkRole() {
                const roles = this.$store.state.auth.user.roles;
                if (roles == "root") {
                    return true;
                } else {
                    return false;
                }
            },
            async getAllProduct() {
            this.loadOverlay = true;
            ProductService.getAllProduct().then(async (response) => {
                if (response.data.status === "ok") {
                    this.items = response.data.result;
                    this.items.forEach((element,index) => {
                        this.items[index].no = index+1;
                    });
                    this.totalRows = this.items.length;
                }
                this.loadOverlay = false;
                },
                (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    if (this.message == "Tokens expire!") {
                        this.$store.state.auth.messageToken = "Tokens expire!";
                        this.$store.dispatch("auth/logout");
                        this.$router.push("/login");
                    }
                });
            },
        
            info(item, index, button) {
                this.infoModal.content = item
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            deleteProduct(product_id){
                this.$swal.fire({
                    title: 'คุณต้องการลบข้อมูลหรือไม่?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'ออกจากระบบ',
                    cancelButtonText: "ยกเลิก",

                }).then((result) => {
                    if (result.isConfirmed) {
                        this.loading = true;
                        ProductService.deleteProduct(product_id).then(async (response) => {
                            if (response.data.status === "ok") {
                                this.message = response.data.message;
                                this.$swal.fire('',this.message,'success');
                                this.loading = false;
                                this.resetDeleteProductModal = false;
                                await this.getAllProduct();
                            }
                        },
                        (error) => {
                        this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        if (this.message == "Tokens expire!") {
                            this.$store.state.auth.messageToken = "Tokens expire!";
                            this.$store.dispatch("auth/logout");
                            this.$router.push("/login");
                        }
                        this.$swal.fire('',this.message,'error');
                        this.loading = false;
                        });
                    }
                })
            },

            validatePasswordInput(){
                if (this.passwordNewMath != this.passwordNew && this.passwordNewMath != '') {
                    this.passwordMsg2 = 'รหัสผ่านไม่ตรงกัน';
                    this.validatePass2 = false
                }else if(this.passwordNewMath != this.passwordNew && this.passwordNewMath == ''){
                    this.passwordMsg2 = 'รหัสผ่านไม่ตรงกัน';
                    this.validatePass2 = false
                }else{
                    this.validatePass1 = true
                    this.passwordMsg1 = '';
                    this.validatePass2 = true
                    this.passwordMsg2 = '';
                }

                if (this.validatePass2 == null &&  this.passwordNew != '' && this.passwordNewMath != '') {
                    this.submitChangePassword = false;
                }else{
                    this.submitChangePassword = true;
                }
            },
            openModaleditProduct(item, index, button){
                this.editProductModal = true;
                console.log(item);
                this.product.product_id = item.product_id;
                this.product.product_name = item.product_name;
                this.product.product_quanlity = item.product_quanlity;
                this.product.product_detail = item.product_detail;
                this.product.product_status = item.product_status;
            },
            editProduct(){
                if (!this.product.product_id) return this.$swal.fire('','กรุณากรุณากรอก ID','error');
                if (!this.product.product_name) return this.$swal.fire('','กรุณากรุณากรอก ชื่อสินค้า','error');
                if (!this.product.product_quanlity) return this.$swal.fire('','กรุณากรุณากรอก จำนวน','error');
                if (!this.product.product_detail) return this.$swal.fire('','กรุณากรุณากรอก รายละเอียด','error');
                this.loading = true;
                ProductService.editProduct(this.product).then(async (response) => {
                    if (response.data.status === "ok") {
                        this.message = response.data.message;
                        this.$swal.fire('',this.message,'success');
                        this.loading = false;
                        this.editProductModal = false;
                        this.items = [];
                        await this.getAllProduct();
                    }
                },
                (error) => {
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (this.message == "Tokens expire!") {
                    this.$store.state.auth.messageToken = "Tokens expire!";
                    this.$store.dispatch("auth/logout");
                    this.$router.push("/login");
                }
                // this.modalErr = true
                this.$swal.fire('',this.message,'error');
                this.loading = false;
                });
            },
            openModalCreate(){
                this.addProductModal = true;
                this.product.product_name = "";
                this.product.product_quanlity = "";
                this.product.product_detail = "";
                this.product.product_status = 1;
          
            },
            createProduct(){
                if (!this.product.product_name) return this.$swal.fire('','กรุณากรุณากรอก ชื่อสินค้า','error');
                if (!this.product.product_quanlity) return this.$swal.fire('','กรุณากรุณากรอก จำนวน','error');
                if (!this.product.product_detail) return this.$swal.fire('','กรุณากรุณากรอก รายละเอียด','error');
                this.loading = true;
                ProductService.createProduct(this.product).then(async (response) => {
                    if (response.data.status === "ok") {
                        this.message = response.data.message;
                        this.$swal.fire('',this.message,'success');
                        this.addProductModal = false;
                        this.loading = false;
                        this.preview = null;
                        await this.getAllProduct();
                    }
                },
                (error) => {
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (this.message == "Tokens expire!") {
                    this.$store.state.auth.messageToken = "Tokens expire!";
                    this.$store.dispatch("auth/logout");
                    this.$router.push("/login");
                }
                this.$swal.fire('',this.message,'error');
                this.loading = false;
                });
            },
        }
    }
    </script>