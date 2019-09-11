//Beginning of content.js
//---------------------------------------%%% Rightly Extension %%%-----------------------------------------
chrome.storage.local.get(['input'],function(result){
  if(result.input!=null){search(result.input);}
  else{
    insertButtonText()
  }
});

//---------------------------------------adding listener for brower action -----------------------------
// add listener to catch the user activating the extension
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //was it clicked?
        if (request.message === "clicked_browser_action") {

          chrome.storage.local.clear();

        }
    }
);


function insertButtonText(){

  var field = document.createElement('input');
  field.setAttribute('type', 'text');
  field.setAttribute('name', 'text');
  field.setAttribute('placeholder','Type here to search');
  field.setAttribute('id', 'searchField');
  var submitSearch = document.createElement('button');
  submitSearch.setAttribute('type','submit');
  submitSearch.setAttribute('id','regButton');
  submitSearch.innerText= 'Search';
  submitSearch.setAttribute('style', 'height:25px;width:100px');
  document.getElementsByClassName('nice-padding hasform')[0].appendChild(field)
  document.getElementsByClassName('nice-padding hasform')[0].appendChild(submitSearch)
  submitSearch.addEventListener('click', function(){
    if(field.value.length<1){
        console.log('nope')
    }
    else{
    search(field.value.toLowerCase());}})


}

function insertFoundNo(count){

  var field = document.createElement('text');
  field.innerText = 'Found '+count+' matches on this page';
  field.setAttribute('style', 'height:50px;width:300px');
  field.setAttribute('name', 'verylongnamenottoconfuse');
  document.getElementsByClassName('nice-padding hasform')[0].appendChild(field);
  chrome.storage.local.clear();


}
function resetToWhite(){
  var companies = document.getElementsByClassName('field-company nowrap');
    for(i=0; i<companies.length; i++){
      companies[i].style.backgroundColor = "#FFFFFF"
    }
}

function search(input_text){
  resetToWhite();
  var companies = document.getElementsByClassName('field-company nowrap');
  var count =0;
  for(i=0; i<companies.length; i++){

      if(companies[i].innerText.toLowerCase().includes(input_text)){
          companies[i].scrollIntoView();
          companies[i].style.backgroundColor = "#FDFF47";
          count++;

      }
  }
  var nextButton= document.getElementsByClassName('icon icon-arrow-right-after');
  if(count!=0){chrome.storage.local.clear();}
  if(count==0 && nextButton.length>0){


      nextButton[0].click();
      chrome.storage.local.get(['input'], function(result) {
              //concatenate that result with the most recent result
              chrome.storage.local.set({
                  input: input_text
              }, function() {});});
    }

  else if(document.getElementsByName('verylongnamenottoconfuse').length<=0){insertFoundNo(count);}


}
