const loadPhone = (phone , dataLimit) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data , dataLimit))

}

const displayPhone = (datas , dataLimit) =>{
    const showBtn = document.getElementById('show-btn');
    if (dataLimit && datas.length > 12) {
        datas = datas.slice(0,12);
        showBtn.classList.remove('d-none')
    }else{
        showBtn.classList.add('d-none')
    }
    
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    const getNotFound = document.getElementById('not-found')
    if(datas.length === 0){
        getNotFound.classList.remove('d-none')
    }else{
        getNotFound.classList.add('d-none')
    }
    
    datas.forEach(data => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
                <div class="card p-4">
                    <img src="${data.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button class="btn btn-danger" onclick= "displayModal('${data.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(createDiv);
    });
    loadSpinner(false);
};

const displayModal = (data) =>{
    console.log(data)
    fetch(`https://openapi.programming-hero.com/api/phone/${data}`)
    .then(res =>res.json())
    .then(data => dislayInModal(data.data.mainFeatures))
}
const dislayInModal = (data) =>{
    const getId = document.getElementById('Storage');
    getId.innerText = `${data.storage}`
    const getP = document.getElementById('chipset');
    getP.innerText = `${data.chipSet}`
}

const loadSpinner = (isSpin) =>{
    const spinner = document.getElementById('spinner');
    if (isSpin) {
        spinner.classList.remove('d-none')
    }else{
        spinner.classList.add('d-none')
    }
}
const searchProcess = (dataLimit) =>{
    loadSpinner(true)
    const getId = document.getElementById('input-field');
    const getText = getId.value;
    loadPhone(getText , dataLimit);
}

document.getElementById('btn').addEventListener('click',()=>{
  searchProcess(10);
})
document.getElementById('show-btn').addEventListener('click',()=>{
  searchProcess();
})





















