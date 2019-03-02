
document.getElementById('words').addEventListener('input', myWordInput);
document.getElementById('seconds').addEventListener('input', mySecondInput);

window.parent.document.getElementsByTagName('iframe')[0].height = '100px';
console.log("changed height!")
console.log(window.parent.document.getElementsByTagName('iframe'));

function myWordInput(e){
  words = document.getElementById('words').value;
  if (!(/^\d+$/.test(words))) {
    document.getElementById('words').value =
      words.substring(0, words.length - 1);
  }
  
	let temp = document.getElementById('seconds');
  let num = (e.target.value/2.4).toFixed(1);
	temp.value = isNaN(num) ? 0 : num;
  
  sendData();
};

function mySecondInput(e){
  seconds = document.getElementById('seconds').value;
  if (!(/^\d+$/.test(seconds))) {
    document.getElementById('seconds').value =
      seconds.substring(0, seconds.length - 1);
  }
  
	let temp = document.getElementById('words');
  let num = Math.round(e.target.value*2.4);
  temp.value = isNaN(num) ? 0 : num;
  
  sendData();
};


function callback() {
    var result = {};
    result.valid = document.getElementById('seconds').value > 0;
    result.value = document.getElementById('seconds').value.toString();
    console.log("sending submit");
	console.log(result);

    JFCustomWidget.sendSubmit(result);
}

function sendData(){
        var result = {};
        result.value = document.getElementById('seconds').value.toString();
        JFCustomWidget.sendData(result);
		console.log("sending data");
		console.log(result);
}

JFCustomWidget.subscribe("submit", callback);
