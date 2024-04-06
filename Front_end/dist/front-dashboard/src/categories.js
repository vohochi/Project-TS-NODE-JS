var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, fetchAPI } from '../src/config/app.js';
class CategoryModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}categories`);
            console.log(data);
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}categories/${id}`);
            return data;
        });
    }
    create(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${url}categories/add`, {
                method: 'POST',
                body: formData,
            });
            const data1 = yield response.json();
        });
    }
    update(id, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}categories/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response) {
                window.location.reload();
            }
            else {
                const errorData = yield response.json();
                console.error('Lỗi cập nhật:', errorData);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}/categories/${id}`, {
                method: 'DELETE',
            });
            alert('xóa thành công danh mục:' + id);
            window.location.reload();
        });
    }
}
const showCategories = new CategoryModel();
const deleteCategory = new CategoryModel();
const updateProduct = new CategoryModel();
showCategories
    .getAll()
    .then((data) => {
    const showCat = document.getElementById('showCategories');
    data.map((Category) => {
        showCat.innerHTML += `<div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <!-- Card -->
            <a class="card card-hover-shadow h-100" href="#">
              <div class="card-body">
                <h6 class="card-subtitle">Danh mục ${Category.id}</h6>

                <div class="row align-items-center gx-2 mb-1">
                  <div class="col-6" style="display: flex;  justify-content: space-between;">
                    <span class="card-title h2">${Category.name}</span>
    <img src="../../public/images/${Category.image}" alt="ds" style="height: 50px; width:auto; ">
                  </div>

                  <div class="col-6">
                    <!-- Chart -->
                    <div class="chartjs-custom" style="height: 3rem">
                      <canvas
                        class="js-chart"
                        data-hs-chartjs-options='{
                                "type": "line",
                                "data": {
                                   "labels": ["1 May","2 May","3 May","4 May","5 May","6 May","7 May","8 May","9 May","10 May","11 May","12 May","13 May","14 May","15 May","16 May","17 May","18 May","19 May","20 May","21 May","22 May","23 May","24 May","25 May","26 May","27 May","28 May","29 May","30 May","31 May"],
                                   "datasets": [{
                                    "data": [21,20,24,20,18,17,15,17,18,30,31,30,30,35,25,35,35,40,60,90,90,90,85,70,75,70,30,30,30,50,72],
                                    "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                                    "borderColor": "#377dff",
                                    "borderWidth": 2,
                                    "pointRadius": 0,
                                    "pointHoverRadius": 0
                                  }]
                                },
                                "options": {
                                   "scales": {
                                     "yAxes": [{
                                       "display": false
                                     }],
                                     "xAxes": [{
                                       "display": false
                                     }]
                                   },
                                  "hover": {
                                    "mode": "nearest",
                                    "intersect": false
                                  },
                                  "tooltips": {
                                    "postfix": "k",
                                    "hasIndicator": true,
                                    "intersect": false
                                  }
                                }
                              }'
                      >
                      </canvas>
                    </div>
                    <!-- End Chart -->
                  </div>
                </div>
                <!-- End Row -->

                <span class="badge badge-soft-success">
                  <i class="tio-trending-up"></i> 12.5%
                </span>
                <span class="text-body font-size-sm ml-1">Số lượng: ${Category.quantity}</span>
              </div>
              
            </a>
            <!-- End Card -->
            <div class="btn-group" role="group">
                      <a class="btn btn-sm btn-white"href="javascript:;"
                data-toggle="modal"
                data-target="#editCat" id=${Category.id}>
                        <i class="tio-edit"></i> Edit
                      </a>
                       

                      <!-- Unfold -->
                      <div class="hs-unfold btn-group" data-id="${Category.id}">
                       <a class="btn btn-sm btn-white">
                        <i class="tio-delete"></i> Delete
                      </a>

                        <div id="productsEditDropdown1" class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1">
                          <a class="dropdown-item" href="#">
                            <i class="tio-delete-outlined dropdown-item-icon"></i>
                            Delete
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-archive dropdown-item-icon"></i>
                            Archive
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-publish dropdown-item-icon"></i>
                            Publish
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-clear dropdown-item-icon"></i>
                            Unpublish
                          </a>
                        </div>
                      </div>
                      <!-- End Unfold -->
                    </div>
          </div>`;
    });
})
    .catch((error) => {
    console.error('Lỗi:', error);
});
window.addEventListener('click', (event) => {
    const target = event.target;
    if (target.getAttribute('id') == 'submit') {
        const name = document.getElementById('name').value;
        const imageInput = document.getElementById('fileInput');
        const image = imageInput.files ? imageInput.files[0] : null;
        console.log(imageInput);
        const category = document.getElementById('category')
            .value;
        const quantity = document.getElementById('quantity')
            .value;
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('name', name);
        formData.append('category', category);
        formData.append('quantity', quantity);
        const addCategory = new CategoryModel();
        addCategory
            .create(formData)
            .then(() => {
        })
            .catch((error) => {
            console.error('Lỗi:', error);
        });
    }
});
window.addEventListener('click', () => {
    const target = event.target;
    const id = target.parentElement.dataset.id;
    if (!id) {
        return;
    }
    deleteCategory.delete(id);
});
window.addEventListener('click', () => {
    const target = event.target;
    const data_target = target.getAttribute('data-target');
    const id = target.getAttribute('id');
    if (data_target == '#editCat') {
        const data = fetchAPI(`${url}categories/${id}`);
        data.then((data) => {
            const update = document.getElementById('update');
            update.innerHTML = `
     <form class="modal-content">
          <!-- Header -->
          <div class="modal-header" id="id1" data-page="${data.id}">
            <h4 id="editCatTitle" class="modal-title">Sửa danh mục</h4>

            <button
              type="button"
              class="btn btn-icon btn-sm btn-ghost-secondary"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="tio-clear tio-lg"></i>
            </button>
          </div>
          <!-- End Header -->

          <!-- Body -->
          <div class="modal-body" id="addCategory">
            <!-- Form Group -->
            <div class="form-group">
              <div class="input-group input-group-merge mb-2 mb-sm-0"></div>

              <a class="btn btn-block btn-primary d-sm-none" href="javascript:;"
                >Sửa danh mục</a
              >
            </div>
            <!-- End Form Group -->

            <div class="form-row">
              <h5 class="col modal-title">Danh mục</h5>

              <div class="col-auto">
                <a
                  class="d-flex align-items-center font-size-sm text-body"
                  href="#"
                >
                  <img
                    class="avatar avatar-xss mr-2"
                    src="assets\svg\brands\gmail.svg"
                    alt="Image Description"
                  />
                </a>
              </div>
            </div>

            <hr class="mt-2" />
            <input
              id="name1"
              type="text"
              name="name"
              class="form-control"
              placeholder="${data.name}"
            />
            <label for=""></label>
            <input
              id="category1"
              type="text"
              class="form-control"
              name="category"
              placeholder="${data.category}"
            />
            <label for=""></label>
            <input
              id="quantity1"
              type="number"
              name="quantity"
              class="form-control"
              placeholder="${data.quantity}"
            />
            <label for=""></label>
            <input
              id="fileInput1"
              name="img"
              class="form-control-file"
              type="file"
              alt="test"
                            placeholder="${data.image}"

            />
            <label for=""></label>
            <input
              class="form-control btn btn-primary"
              id="submit1"
              type="submit"
            />
          </div>
          <!-- End Body -->

          <!-- Footer -->
          <div class="modal-footer justify-content-start">
            <div class="row align-items-center flex-grow-1 mx-n2">
              <div class="col-sm-9 mb-2 mb-sm-0">
                <input
                  type="hidden"
                  id="inviteUserPublicClipboard"
                  value="https://themes.getbootstrap.com/product/front-multipurpose-responsive-template/"
                />

                <p class="modal-footer-text">
                  The public share <a href="#">link settings</a>
                  <i
                    class="tio-help-outlined"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="The public share link allows people to view the project without giving access to full collaboration features."
                  ></i>
                </p>
              </div>

              <div class="col-sm-3 text-sm-right">
                <a
                  class="js-clipboard btn btn-sm btn-white text-nowrap"
                  href="javascript:;"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Copy to clipboard!"
                  data-hs-clipboard-options='{
                    "type": "tooltip",
                    "successText": "Copied!",
                    "contentTarget": "#inviteUserPublicClipboard",
                    "container": "#editCat"
                   }'
                >
                  <i class="tio-link mr-1"></i> Copy link</a
                >
              </div>
            </div>
          </div>
          <!-- End Footer -->
        </form>`;
        });
    }
    const id1 = document.getElementById('id1');
    const id_data = id1.getAttribute('data-page');
    console.log(id_data);
    const name = document.getElementById('name1').value;
    const imageInput = document.getElementById('fileInput1');
    const image = imageInput.files ? imageInput.files[0] : null;
    const category = document.getElementById('category1')
        .value;
    const quantity = document.getElementById('quantity1')
        .value;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    if (image) {
        formData.append('image', image);
    }
    const submit1 = document.getElementById('submit1');
    submit1.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            yield updateProduct.update(id_data, formData);
            console.log('Cập nhật thành công!');
        }
        catch (error) {
            console.error('Lỗi:', error);
        }
    }));
});
