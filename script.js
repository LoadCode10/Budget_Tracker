
const addBugetBtn = document.querySelector('.add-budget-btn');
const budgetInput = document.getElementById('add-budget');
const totalBudgetText = document.querySelector('.total-budget');
const addExpenseBtn = document.querySelector('.add-expense-btn');
const totalExpenseText = document.querySelector('.total-expense');
const expenseForm = document.querySelector('.expense-form');
const totalLeftText = document.querySelector('.budget-left');
const myTableBody = document.querySelector('.mytable_body');
const deleteBtn = document.querySelector('.delete-btn');
const resetBtn = document.querySelector('.reset-btn');



addBugetBtn.addEventListener('click',()=>{
  getBudget();
  calculBudgetLeft();
});



function getMystoredBudget(){
  let myBudget;
  if(localStorage.getItem('myBudget') === null){
    myBudget = '';
  }else{
    myBudget = JSON.parse(localStorage.getItem('myBudget'));
  };
  return myBudget;
}


function getBudget(){
  let myBudget = Number(budgetInput.value) || getMystoredBudget();
  if(myBudget === ''){
    totalBudgetText.innerHTML = `Total Budget: 00.00$`;
  }else{
    totalBudgetText.innerHTML = `Total Budget: ${myBudget.toFixed(2)}$`;
  };
  localStorage.setItem('myBudget',JSON.stringify(myBudget));
  return myBudget;
}

/*
function budgetLeft(){
  let myBudget = getBudget();
  let myLeftBudget = myBudget - 2000;
  totalExpenseText.innerHTML = `Total Budget: ${myLeftBudget.toFixed(2)}$`;
}
*/

//let totalExpenseArr = [];



class Expense {
  constructor(expName,amount,id){
    this.expName = expName;
    this.amount = amount;
    this.id = id;
  }
};

class MyExpDisplay{
  static displayExpense(){
    const myExpensesArray = getMyExpensesArray();
    myExpensesArray.forEach((expense)=>{
      MyExpDisplay.AddMyExpense(expense);
    });
    calculTotalExpense();
    calculBudgetLeft();
  };

  static AddMyExpense(expense){
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${expense.expName}</td>
      <td>${expense.amount}</td>
      <td>${expense.id}</td>
      <td>
        <span class="delete-btn">X</span>
        <span class="edit-btn">Edit</span>
      </td>
    `;
    myTableBody.appendChild(tr);
    //totalExpenseArr.push(Number(expense.amount))
  };

  static clearFields(){
    document.getElementById('expence-title').value = '';
    document.getElementById('amount').value = '';
  }
};
/*
class ManageStorage{
  static getMyExpensesArray(){
    let myExpensesArray;
    if(localStorage.getItem('myExpensesArray') === null){
      myExpensesArray = [];
    }else{
      myExpensesArray = JSON.parse(localStorage.getItem('myExpensesArray'));
    };
    return myExpensesArray;
  };

  static addExpenceToLocalStorage(expense){
    let myExpensesArray = ManageStorage.getMyExpensesArray();
    myExpensesArray.push(expense);
    localStorage.setItem('myExpensesArray',JSON.stringify(myExpensesArray));
  }
  
}
  */


function addExpenceToLocalStorage(expense){
  let myExpensesArray = getMyExpensesArray();
  myExpensesArray.push(expense);
  localStorage.setItem('myExpensesArray',JSON.stringify(myExpensesArray));
  return myExpensesArray;
}

function getMyExpensesArray(){
  let myExpensesArray ;
  if(localStorage.getItem('myExpensesArray') === null){
    myExpensesArray = [];
  }else{
    myExpensesArray = JSON.parse(localStorage.getItem('myExpensesArray'));
  }
  return myExpensesArray;
};

function deleteMyExpense(Id){
  let myExpensesArray = getMyExpensesArray();
  myExpensesArray.forEach((expense,index)=>{
    if(expense.id === Id){
      myExpensesArray.splice(index,1);
    };
  });
  localStorage.setItem('myExpensesArray',JSON.stringify(myExpensesArray));
}


let id = 0;
expenseForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let expName = document.getElementById('expence-title').value;
  let amount = document.getElementById('amount').value;
  id =`#&${(Math.random()*10).toFixed(2)}`;
  console.log(id);
  if(expName !== '' && amount !== ''){
    const expense = new Expense(expName,amount,id);
    MyExpDisplay.AddMyExpense(expense);
    //ManageStorage.addExpenceToLocalStorage(expense);
    //localStorage.setItem('storedExpense',JSON.stringify(expense));
    addExpenceToLocalStorage(expense);
    calculTotalExpense();
    calculBudgetLeft();
    MyExpDisplay.clearFields();
    /*
    console.log(totalExpenseArr);
    let totalExpensiveValue = 0
    totalExpenseArr.forEach(element => {
      totalExpensiveValue += element;
    });
    if(totalExpensiveValue === 0){
      totalExpenseText.innerHTML = `Total Budget: 00.00$`;
    }else{
      totalExpenseText.innerHTML = `Total Budget: ${totalExpensiveValue.toFixed(2)}$`;
    };
    console.log(totalExpensiveValue);*/
  }; 

});

MyExpDisplay.displayExpense();

//localStorage.clear();

//console.log(totalExpenseValue);
//onsole.log(myTableBody.children.length);
//console.log(Number(myTableBody.children[0].childNodes[3].innerHTML));
/*
function deleteMyExpense(e){
  const myExpensesArray = getMyExpensesArray();
  myExpensesArray.forEach((expense,index)=>{
    if(e.target.classList.contains('edit-btn')){
      myExpensesArray.splice(index,1);
    }
  });
  localStorage.setItem('myExpensesArray',JSON.stringify(myExpensesArray));
}*/



myTableBody.addEventListener('click',(e)=>{
  if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.parentElement.remove();
    calculTotalExpense();
    calculBudgetLeft();
    let id = Number(e.target.parentElement.previousElementSibling.innerHTML);
    deleteMyExpense(e.target.parentElement.previousElementSibling.textContent);
  }
  if(e.target.classList.contains('edit-btn')){
    document.getElementById('amount').value = e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    document.getElementById('expence-title').value = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    e.target.parentElement.parentElement.remove();
    calculTotalExpense();
    calculBudgetLeft();
    deleteMyExpense(e.target.parentElement.previousElementSibling.textContent);
  }
});


//here are calculs functions:

function calculTotalExpense(){
  let totalExpensiveValue = 0
    for(let i = 0 ; i < myTableBody.children.length ; i++){
      totalExpensiveValue += Number(myTableBody.children[i].childNodes[3].innerHTML);
    };
    //console.log(totalExpensiveValue);
    if(totalExpensiveValue === 0){
      totalExpenseText.innerHTML = `Total Expense: 00.00$`;
    }else{
      totalExpenseText.innerHTML = `Total Expense: ${totalExpensiveValue.toFixed(2)}$`;
    };
  return totalExpensiveValue;
};

function calculBudgetLeft(){
  let myBudget = getBudget();
  let totalExpenseValue = calculTotalExpense();
  let budgetLeftValue = myBudget - totalExpenseValue;
  if(budgetLeftValue === 0){
    totalLeftText.innerHTML = `Budget Left: 00.00$`;
  }else{
    totalLeftText.innerHTML = `Budget Left: ${budgetLeftValue.toFixed(2)}$`;
  };
};

resetBtn.addEventListener('click',()=>{  
  Array.from(myTableBody.children).forEach((child)=>{
    child.remove();
  });
  calculTotalExpense();
  calculBudgetLeft();
  localStorage.clear();
});

/*
function decreaseId(id){
  if(myTableBody.children.length > 1){
    myTableBody.children[id].children[2].innerHTML = id;
  }
};
*/

/*
for(let i = 0 ; i < myTableBody.children.length; i++){
  myTableBody.children[i+1].children[2].innerHTML = ;
}

console.log(myTableBody.children[0].children[2].innerHTML)
*/

//let randomNum = (Math.random()*10 + randomNum).toFixed(3);
//console.log(randomNum);

myTableBody.addEventListener('click',(e)=>{
  console.log(e.target.parentElement.previousElementSibling.textContent);
})