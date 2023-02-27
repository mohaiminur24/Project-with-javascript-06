async function dataLoad(search){
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    displayData(data.data);
};

const productParent = document.getElementById('phone-parent');

const displayData = data => {
    productParent.innerHTML ='';

    if(data.length>10){
        document.getElementById('NoDataFound').classList.add('hidden');
        document.getElementById('seeMore').classList.remove("hidden");
        data =  data.slice(0,10);
    }else if(data.length == 0){
        document.getElementById('NoDataFound').classList.remove('hidden');
        document.getElementById('progress').classList.add('hidden');
        document.getElementById('seeMore').classList.add("hidden");
    }

    data.forEach(element => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="shadow-md p-5 rounded-md">
            <img class="w-full h-72 rounded-md hover:scale-105" src="${element.image}" alt="">
            <h1 class="my-1 text-sm">Brand: <span>${element.brand}</span></h1>
            <h1 class="font-semibold mb-2">Phone Model: <span>${element.phone_name}</span></h1>
            <button onclick="moreinfo('${element.slug}')" class="px-4 py-1 bg-slate-600 rounded-md text-white"><label for="my-modal-3">More Info</label></button>
        </div>
    `;
    productParent.appendChild(div);
    document.getElementById('progress').classList.add('hidden');
    });
};

let seeMore = '';

document.getElementById('searchItmes').addEventListener('click',function(){
    const Input = document.getElementById('input');
    const inputValue = Input.value;
    seeMore = inputValue;
    Input.value = '';
    dataLoad(inputValue);
    document.getElementById('progress').classList.remove('hidden');
    
});

document.getElementById('input').addEventListener('keyup',function(even){

    if(even.key === "Enter"){
        const Input = document.getElementById('input');
        const inputValue = Input.value;
        seeMore = inputValue;
        Input.value = '';
        dataLoad(inputValue);
        document.getElementById('progress').classList.remove('hidden');
    }
})
 

// modal Function
const moreinfo = async data => {

    const modalInfoParent = document.getElementById('modalinfo');
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${data}`);
    const dataByid = await res.json();

    modalInfoParent.innerHTML = `
    
        <h1>Relase Date : ${dataByid.data.releaseDate}</h1>
        <h1>Storage: ${dataByid.data.mainFeatures.storage}</h1>
        <h1>Display Size: ${dataByid.data.mainFeatures.displaySize}</h1>
        <h1>ChipSet : ${dataByid.data.mainFeatures.chipSet}</h1>
        <h1>Memory : ${dataByid.data.mainFeatures.memory}</h1>
        <h1>Sensors : ${dataByid.data.mainFeatures.sensors}</h1>
    `;

    console.log(dataByid.data.mainFeatures); 
};


document.getElementById('seeMore').addEventListener('click',async function(){

    console.log(seeMore);

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${seeMore='iphone'}`);
    const data = await res.json();

    data.data.forEach(element => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="shadow-md p-5 rounded-md">
            <img class="w-full h-72 rounded-md hover:scale-105" src="${element.image}" alt="">
            <h1 class="my-1 text-sm">Brand: <span>${element.brand}</span></h1>
            <h1 class="font-semibold mb-2">Phone Model: <span>${element.phone_name}</span></h1>
            <button onclick="moreinfo('${element.slug}')" class="px-4 py-1 bg-slate-600 rounded-md text-white"><label for="my-modal-3">More Info</label></button>
        </div>
    `;
    productParent.appendChild(div);
    });

    this.classList.add('hidden');
    
});













dataLoad('iphone'); 
