var todoList = []
var displayComplte = false;



// complete.style.color = 'white'


function init(){


    
    var gettingList = new Promise((resolve,reject) => {
        let response =fetch("https://jsonplaceholder.typicode.com/todos").then(
            (res) => res.json()
        )
        if(response == undefined){
            reject()
        }else{
         
            resolve(response)
        }
    } )
    
    gettingList.then(
        (values)=>{
           
            todoList = values
           
            showComplete()  
            
    
        },
        // (values)=>{console.log(values)}
    )
}

function showInput(){
    let input = document.getElementById('input')
    let list = document.getElementById('center')
    input.style.display = 'flex'
    list.style.display = 'none'
}

function hideInput(){
    let input = document.getElementById('input')
    let list = document.getElementById('center')
    input.style.display = 'none'
    list.style.display = 'inline'
}

let bttnAdd = document.getElementById('btnAddTask')
bttnAdd.addEventListener('click',addTask)

function addTask(){
    let title = document.getElementById('in-title')
    let date = document.getElementById('in-date')

    let valueT = title.value
    let valueD = date.value

    if(valueD == '' || valueT ==  ''){
        alert('please enter missing values')
        return
    }else{
        
        fetch("https://jsonplaceholder.typicode.com/todos",{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {
                    "userId": 1,
                    "id": Date.now(),
                    "title": valueT,
                    "completed": false       
                }
              )
        }).then((response) => response.json())
    
            .then((data) => todoList.push(data))
      
    }
    init()
    hideInput()

}

function removeAll(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showComplete(){
    
    let inComplete = document.getElementById('incomplete')
    let Complete = document.getElementById('complete')

    Complete.style.color = "white"
    inComplete.style.color = "#ABAFB3"

    let complete = todoList.filter((element) => element.completed == true)
    let l = document.getElementById('place-my-items')

    removeAll(l)

    complete.forEach(element => {
            let d = document.createElement('div')
            d.className = 'item'
           let inner = document.innerHTML = `
           
           <div>
                <span class="span"><input type="checkbox" checked id="check${element.id}"></span>
                <span>${element.title}</span>
                </div>
                <i class="material-symbols-outlined del" id="${element.id} >delete</i>
            </div>
        
           `
           let y = document.getElementsByClassName('span');
           
            d.innerHTML = inner
            l.appendChild(d)

        });


}

function delItem(e){
    console.log('del clicked');
}


function showIncomplete(){
    let inComplete = document.getElementById('incomplete')
    let complete = document.getElementById('complete')

    complete.style.color = "#ABAFB3"
    inComplete.style.color = "white"
    let incomplete = todoList.filter((element) => element.completed == false)
    let l = document.getElementById('place-my-items')
    
    removeAll(l)

    incomplete.forEach(element => {
            let d = document.createElement('div')
            d.className = 'item'
           let inner = document.innerHTML = `
           
           <div>
                <span class="span"><input type="checkbox"  id="check${element.id}"></span>
                <span>${element.title}</span>
                </div>
                <i class="material-symbols-outlined del" id="${element.id} onclick="deleteItem(event)">delete</i>
            </div>
        
           `
           let y = document.getElementsByClassName('span');
           
            // element.completed ? document.getElementById('check'+ element.id).checked = true :document.getElementById('check'+ element.id).checked
            d.innerHTML = inner
            l.appendChild(d)

        });
}




function deleteItem(eventer){

    console.log('shit ')

}

init()
