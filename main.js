title = document.getElementById("title");
price = document.getElementById("price");
ads = document.getElementById("ads");
taxes = document.getElementById("taxes");
disc = document.getElementById("disc");
count = document.getElementById("count");
category = document.getElementById("category");
total = document.getElementById("total");
submit = document.getElementById("submit");
selectPro = document.getElementById("phones");
let mode = 'create';
let tmp;
//total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +disc.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = '#b83636';
    }
}
//create
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
//localstorge
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        disccount: disc.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 1000) {
        if (mode === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                };
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mode = 'create';
            submit.innerHTML = 'craete';
            count.style.display = 'block';
        }
        clearData();
    }

    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro));

    showData();


}
//cleardata
function clearData() {
    title.value = '';
    price.value = '';
    ads.value = '';
    count.value = '';
    category.value = '';
    taxes.value = '';
    disc.value = '';
    title.innerHTML = '';
}
//show Data
function showData() {
    gettotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table +=
            '<tr><td>' + (i + 1) +
            '</td><td>' + dataPro[i].title +
            '</td><td>' + dataPro[i].price +
            '</td><td>' + dataPro[i].taxes +
            '</td><td>' + dataPro[i].ads +
            '</td><td>' + dataPro[i].disccount +
            '</td><td>' + dataPro[i].total +
            '</td><td>' + dataPro[i].category +
            '</td><td><button onclick="update(' + i + ')" id="update">update' +
            '</button></td><td><button id="delete" onclick="deleteData(' + i + ')">delete' +
            '</button></td></tr>';


    };
    document.getElementById('tbody').innerHTML = table;
    btnDelete = document.getElementById("deleteall");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = '<button onclick="deleteAll()">deleteAll</button>';
    } else {
        btnDelete.innerHTM = '';
    }
}
showData();
//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    disc.value = dataPro[i].disccount;
    gettotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mode = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth', });
}
//search
let searchMood = 'title'
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
        search.placeholder = "Search By Title"
    } else {
        searchMood = 'category';
        search.placeholder = "Search By Category"
    }
    //sraech.placeholder="search be+ searchMood"
    search.focus();
    search.value = '';
    showData();
}
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table +=
                    '<tr><td>' + i +
                    '</td><td>' + dataPro[i].title +
                    '</td><td>' + dataPro[i].price +
                    '</td><td>' + dataPro[i].taxes +
                    '</td><td>' + dataPro[i].ads +
                    '</td><td>' + dataPro[i].disccount +
                    '</td><td>' + dataPro[i].total +
                    '</td><td>' + dataPro[i].category +
                    '</td><td><button onclick="update(' + i + ')" id="update">update' +
                    '</button></td><td><button id="delete" onclick="deleteData(' + i + ')">delete' +
                    '</button></td></tr>';
            }

        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table +=
                    '<tr><td>' + i +
                    '</td><td>' + dataPro[i].title +
                    '</td><td>' + dataPro[i].price +
                    '</td><td>' + dataPro[i].taxes +
                    '</td><td>' + dataPro[i].ads +
                    '</td><td>' + dataPro[i].disccount +
                    '</td><td>' + dataPro[i].total +
                    '</td><td>' + dataPro[i].category +
                    '</td><td><button onclick="update(' + i + ')" id="update">update' +
                    '</button></td><td><button id="delete" onclick="deleteData(' + i + ')">delete' +
                    '</button></td></tr>';
            }

        }
    }
    document.getElementById('tbody').innerHTML = table;
}
function filterData() {
    console.time("test")
    let table
    if(!(selectPro.value==0)){
    let filterarray = dataPro.filter((item) => {
        return item.title === selectPro.value;
        
    })
    
    for (let i = 0; i < filterarray.length; i++) {
        table +=
            '<tr><td>' + (i + 1) +
            '</td><td>' + filterarray[i].title +
            '</td><td>' + filterarray[i].price +
            '</td><td>' + filterarray[i].taxes +
            '</td><td>' + filterarray[i].ads +
            '</td><td>' + filterarray[i].disccount +
            '</td><td>' + filterarray[i].total +
            '</td><td>' + filterarray[i].category +
            '</td><td><button onclick="update(' + i + ')" id="update">update' +
            '</button></td><td><button id="delete" onclick="deleteData(' + i + ')">delete' +
            '</button></td></tr>';
    };document.getElementById('tbody').innerHTML = table;}else{
        showData()
    }
    console.timeEnd("test")
} 