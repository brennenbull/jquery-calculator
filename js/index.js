$(document).ready(function(){
  var $screen = $('#screen');
  var $target = "";
  var maths = "";

  ///appends number to screen ---------->>>>>>
  $('span').on('click', function(event) {
    if($(event.target).attr('id') === 'clear'){
      clearButton();
    } else if($(event.target).html() === 'x'){
      xButton();
    } else if ($(event.target).html() === '\u00f7'){
      divisionButton();
    } else if($(event.target).attr('id') === 'equals'){
      equalButton();
    } else {
      easyButtons();
    }
  });

  ///clear button------->>>>>>
  function clearButton() {
      $screen.empty();
      maths = "";
  }

  ///x button------->>>>>
  function xButton() {
    maths += '*';
    if($screen.html() !== 'ERROR'){
      $target = $(event.target).html();
      $screen.append($target);
    }
  }

  ////division Button----->>>>>>
  function divisionButton() {
    maths += "/";
    if($screen.html() !== 'ERROR'){
      $target = $(event.target).html();
      $screen.append($target);
    }
  }

  ///equals Button-------->>>>>>>>>
  function equalButton() {
    if(maths.indexOf('/') === 0){
      $screen.empty();
      $screen.append('ERROR')
    } else if(maths.indexOf('*') === 0){
      $screen.empty();
      $screen.append('ERROR')
    } else if(rpn(maths) === 'Infinity'){
      $screen.empty();
      $screen.append('ERROR')
    }else {
      var total = rpn(maths);
      maths = total
      $screen.empty();
      $screen.append(maths);
    }
  }

  ///easyButtons------>>>>>>>>>
  function easyButtons() {
    if($screen.html() !== 'ERROR'){
      $target = $(event.target).html();
      $screen.append($target);
      maths += $target;
    }
  }

  ///RPN FUNCTION--------->>>>>>>>>
  function rpn(string){

  var opperators = {
    "+" : function(a,b){return a + b},
    "-" : function(a,b){return a - b},
    "*" : function(a,b){return a * b},
    "/" : function(a,b){return a / b}
  };

  function rpnEval(numberArr, oppArr){
    while(oppArr.length !== 0){
      if(oppArr.indexOf('*') !== -1 || oppArr.indexOf('/') !== -1){
        for(let i = 0; i<oppArr.length; i++){
          if(oppArr[i] === '*' || oppArr[i] === '/'){
            let a = Number(numberArr[i]);
            let b = Number(numberArr[i+1]);
            let op = oppArr[i];
            let total = opperators[op](a,b);
            numberArr.splice(i, 2, total);
            oppArr.splice(i,1);
            rpnEval(numberArr, oppArr);
          }
        }
      } else {
        for(let i = 0; i<oppArr.length; i++){
          let a = Number(numberArr[i]);
          let b = Number(numberArr[i+1]);
          let op = oppArr[i];
          let total = opperators[op](a,b);
          numberArr.splice(i, 2, total);
          oppArr.splice(i,1);
          rpnEval(numberArr, oppArr);
        }
      }
    }
  }

  var num = [];
  var expression = [];
  var opp = [];

  for(var i = 0; i < string.length; i++){
    if (string[i] === '+' || string[i] === '-') {
      opp.push(string[i]);
      expression.push(num.join(''));
      num = [];
    } else if (string[i] === '/' || string[i] === '*') {
      opp.push(string[i]);
      expression.push(num.join(''));
      num = [];
    } else {
      num.push(string[i]);
    }
  }
  expression.push(num.join(''));


  rpnEval(expression, opp);

  return expression.toString();
}

});
