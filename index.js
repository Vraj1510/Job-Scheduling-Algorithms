var tableCol = 4;
var resultHead = new Array();
resultHead = [
  'Process ID',
  'Arrival Time',
  'Burst Time',
  'Completion Time',
  'Turn Around Time',
  'Waiting Time',
];
var n = 0,
  processID,
  arrivalTime,
  burstTime,
  completionTime,
  turnAroundTime,
  waitingTime,
  ganttChart,
  timeline,
  index,
  ready,
  dupBurstTIme;
function displaytq() {
  var sel = document.querySelector('#algo').value;
  var tq = document.querySelector('#tq');

  if (sel === 'RR') {
    tq.style.display = 'block';
  } else {
    tq.style.display = 'none';
  }
}

function getValues() {
  var inputs = document.querySelectorAll('input');
  if (
    document.getElementById('timequantum').value == '' &&
    document.querySelector('#algo').value == 'RR'
  ) {
    alert('Please enter all the details');
    return;
  }
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '' && inputs[i].getAttribute('id') != 'timequantum') {
      alert('Please enter all the details');
      return;
    }
  }
  var procTable = document.querySelector('#processTable');

  n = procTable.rows.length - 1;

  processID = new Array(n);
  arrivalTime = new Array(n);
  burstTime = new Array(n);
  dupBurstTIme = new Array(n);
  turnAroundTime = new Array(n);
  waitingTime = new Array(n);
  completionTime = new Array(n);
  index = new Array(n);
  for (var i = 1; i < procTable.rows.length; i++) {
    index[i - 1] = i - 1;
    for (var j = 0; j < procTable.rows[i].cells.length - 1; j++) {
      var element = Number(procTable.rows[i].cells[j].childNodes[0].value);
      if (j == 0) {
        processID[i - 1] = element;
      } else if (j == 1) {
        arrivalTime[i - 1] = element;
      } else if (j == 2) {
        burstTime[i - 1] = element;
        dupBurstTIme[i - 1] = element;
      }
    }
  }

  var algorithm = document.querySelector('#algo').value;
  console.log(typeof algorithm + ' ' + n);

  if (algorithm === 'FCFS') {
    FCFS();
  } else if (algorithm === 'SJF') {
    SJF();
  } else if (algorithm === 'SRTF') {
    SRTF();
  } else if (algorithm === 'RR') {
    RR();
  }
}

function FCFS() {
  sortAt();

  ready = new Array();
  var ind = 0,
    t = 0;

  ganttChart = new Array();
  timeline = new Array();
  timeline.push(0);

  while (ready.length > 0 || ind < n) {
    if (ready.length == 0 && ind < n && arrivalTime[ind] > t) {
      timeline.push(arrivalTime[ind]);
      ganttChart.push(-1);

      t = arrivalTime[ind];
    }

    while (ind < n && arrivalTime[ind] <= t) {
      ready.push(ind);
      ind++;
    }

    var idx = ready.shift();

    for (var i = 0; i < burstTime[idx]; i++) {
      while (ind < n && arrivalTime[ind] <= t) {
        ready.push(ind);
        ind++;
      }
      t++;
    }

    timeline.push(t);
    completionTime[idx] = t;
    ganttChart.push(processID[idx]);
  }

  test();

  displayResult();
}

function test() {
  var s = ' ';

  for (var i = 0; i < ganttChart.length; i++) {
    s = s + ganttChart[i] + ' ';
  }
  console.log('Gantt ' + s);
  s = ' ';

  for (var i = 0; i < timeline.length; i++) {
    s = s + timeline[i] + ' ';
  }
  console.log('timeline ' + s);
}

function SJF() {
  sortAt();

  ready = new Array();
  var ind = 0,
    t = 0;

  ganttChart = new Array();
  timeline = new Array();
  timeline.push(0);

  while (ready.length > 0 || ind < n) {
    if (ready.length == 0 && ind < n && arrivalTime[ind] > t) {
      timeline.push(arrivalTime[ind]);
      ganttChart.push(-1);
      t = arrivalTime[ind];
    }

    while (ind < n && arrivalTime[ind] <= t) {
      ready.push(ind);
      ind++;
    }

    testReady();
    sortReadyBt();
    testReady();
    var idx = ready.shift();

    for (var i = 0; i < burstTime[idx]; i++) {
      while (ind < n && arrivalTime[ind] <= t) {
        ready.push(ind);
        ind++;
      }
      t++;
    }

    timeline.push(t);
    completionTime[idx] = t;
    ganttChart.push(processID[idx]);
  }

  test();

  displayResult();
}

function SRTF() {
  sortAt();

  ready = new Array();
  var ind = 0,
    t = 0;

  ganttChart = new Array();
  timeline = new Array();
  timeline.push(0);

  while (ready.length > 0 || ind < n) {
    if (ready.length == 0 && ind < n && arrivalTime[ind] > t) {
      timeline.push(arrivalTime[ind]);
      ganttChart.push(-1);
      t = arrivalTime[ind];
    }

    while (ind < n && arrivalTime[ind] <= t) {
      ready.push(ind);
      ind++;
    }

    testReady();
    sortReadyBt();
    testReady();
    var idx = ready.shift(),
      bt = burstTime[idx];
    var flag = false;

    for (var i = 0; i < bt; i++) {
      while (ind < n && arrivalTime[ind] <= t) {
        ready.push(ind);
        ind++;
        flag = true;
      }

      if (flag) {
        sortReadyBt();
        if (burstTime[ready[0]] < burstTime[idx]) {
          timeline.push(t);
          ganttChart.push(processID[idx]);
          ready.push(idx);
          break;
        }
        flag = false;
      }
      t++;
      burstTime[idx]--;
    }

    if (burstTime[idx] == 0) {
      timeline.push(t);
      completionTime[idx] = t;
      ganttChart.push(processID[idx]);
    }
  }

  displayResult();
}

function RR() {
  var tq = Number(document.querySelector('#timequantum').value);

  sortAt();

  ready = new Array();
  var ind = 0,
    t = 0;

  ganttChart = new Array();
  timeline = new Array();
  timeline.push(0);

  while (ready.length > 0 || ind < n) {
    if (ready.length == 0 && ind < n && arrivalTime[ind] > t) {
      timeline.push(arrivalTime[ind]);
      ganttChart.push(-1);
      t = arrivalTime[ind];
    }

    while (ind < n && arrivalTime[ind] <= t) {
      ready.push(ind);
      ind++;
    }

    var idx = ready.shift(),
      bt = burstTime[idx];

    for (var i = 0; i < Math.min(bt, tq); i++) {
      while (ind < n && arrivalTime[ind] <= t) {
        ready.push(ind);
        ind++;
      }
      t++;
      burstTime[idx]--;
    }

    if (burstTime[idx] <= 0) {
      timeline.push(t);
      completionTime[idx] = t;
      ganttChart.push(processID[idx]);
    } else {
      timeline.push(t);
      ready.push(idx);
      ganttChart.push(processID[idx]);
    }
  }

  displayResult();
}

function testReady() {
  var s = ' ';
  for (var i = 0; i < ready.length; i++) {
    s = s + ready[i] + ' ';
  }

  console.log('Ready ' + s);
}

function sortAt() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (arrivalTime[j] > arrivalTime[j + 1]) {
        var temp = arrivalTime[j];
        arrivalTime[j] = arrivalTime[j + 1];
        arrivalTime[j + 1] = temp;

        temp = burstTime[j];
        burstTime[j] = burstTime[j + 1];
        burstTime[j + 1] = temp;

        temp = processID[j];
        processID[j] = processID[j + 1];
        processID[j + 1] = temp;

        temp = index[j];
        index[j] = index[j + 1];
        index[j + 1] = temp;

        temp = dupBurstTIme[j];
        dupBurstTIme[j] = dupBurstTIme[j + 1];
        dupBurstTIme[j + 1] = temp;
      }
    }
  }
}

function sortReadyBt() {
  for (var i = 0; i < ready.length; i++) {
    for (var j = 0; j < ready.length - i - 1; j++) {
      if (burstTime[ready[j]] > burstTime[ready[j + 1]]) {
        var temp = ready[j];
        ready[j] = ready[j + 1];
        ready[j + 1] = temp;
      }
    }
  }
}

function sortInd() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (index[j] > index[j + 1]) {
        var temp = arrivalTime[j];
        arrivalTime[j] = arrivalTime[j + 1];
        arrivalTime[j + 1] = temp;

        temp = burstTime[j];
        burstTime[j] = burstTime[j + 1];
        burstTime[j + 1] = temp;

        temp = processID[j];
        processID[j] = processID[j + 1];
        processID[j + 1] = temp;

        temp = index[j];
        index[j] = index[j + 1];
        index[j + 1] = temp;

        temp = completionTime[j];
        completionTime[j] = completionTime[j + 1];
        completionTime[j + 1] = temp;

        temp = dupBurstTIme[j];
        dupBurstTIme[j] = dupBurstTIme[j + 1];
        dupBurstTIme[j + 1] = temp;
      }
    }
  }
}

function addProc() {
  var procTable = document.querySelector('#processTable');
  var tr = document.createElement('tr');

  for (var i = 0; i < tableCol; i++) {
    var td = document.createElement('td');

    if (i < tableCol - 1) {
      var inp = document.createElement('input');
      inp.addEventListener('keydown', alphaInput);
      inp.setAttribute('type', 'text');
      inp.setAttribute('value', '');
      td.appendChild(inp);
    } else {
      var btn = document.createElement('input');
      btn.setAttribute('value', 'X');
      btn.setAttribute('type', 'button');
      btn.setAttribute('class', 'rembtn');
      btn.setAttribute('onclick', 'removeRow(this)');
      td.appendChild(btn);
    }
    tr.appendChild(td);
  }

  procTable.appendChild(tr);
}

function alphaInput() {
  if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

function removeRow(event) {
  var procTable = document.querySelector('#processTable');
  procTable.deleteRow(event.parentNode.parentNode.rowIndex);
}

function displayResult() {
  sortInd();
  var output = document.querySelector('#display');
  output.innerHTML = '';

  var ganttHead = document.createElement('h1');

  var gantt = document.querySelector('#ganttchart');
  gantt.innerHTML = '';
  ganttHead.innerText = 'Gantt Chart';
  gantt.appendChild(ganttHead);
  var ganttTable = document.createElement('table');
  ganttTable.setAttribute('id', 'ganttTable');
  ganttTable.setAttribute('border', '1');

  var gtr = document.createElement('tr');

  for (var i = 0; i < ganttChart.length; i++) {
    var gtd = document.createElement('td');
    gtd.innerText = ganttChart[i] == -1 ? '-' : 'P' + ganttChart[i];
    gtr.appendChild(gtd);
  }

  var gtr1 = document.createElement('tr');
  gtr1.setAttribute('id', 'timeline');

  for (var i = 0; i < ganttChart.length + 1; i++) {
    var gtd = document.createElement('td');
    gtd.innerText = timeline[i];
    gtd.setAttribute('id', 'timeline');
    gtr1.append(gtd);
  }

  ganttTable.append(gtr);
  ganttTable.append(gtr1);

  gantt.append(ganttTable);

  var result = document.createElement('table');
  result.setAttribute('border', '1');

  var tr = document.createElement('tr');

  for (var i = 0; i < resultHead.length; i++) {
    var th = document.createElement('th');
    th.innerHTML = resultHead[i];
    tr.appendChild(th);
  }

  result.appendChild(tr);

  for (var i = 0; i < n; i++) {
    burstTime[i] = dupBurstTIme[i];
  }

  var avgTAT = 0,
    avgWT = 0;

  for (var i = 0; i < n; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < resultHead.length; j++) {
      var td = document.createElement('td');
      var text;
      if (j == 0) {
        text = document.createTextNode(processID[i]);
      } else if (j == 1) {
        text = document.createTextNode(arrivalTime[i]);
      } else if (j == 2) {
        text = document.createTextNode(burstTime[i]);
      } else if (j == 3) {
        text = document.createTextNode(completionTime[i]);
      } else if (j == 4) {
        turnAroundTime[i] = completionTime[i] - arrivalTime[i];
        avgTAT += turnAroundTime[i];
        text = document.createTextNode(turnAroundTime[i]);
      } else if (j == 5) {
        waitingTime[i] = turnAroundTime[i] - burstTime[i];
        avgWT += waitingTime[i];
        text = document.createTextNode(waitingTime[i]);
      }
      td.appendChild(text);
      tr.appendChild(td);
    }
    result.appendChild(tr);
  }
  output.appendChild(result);

  if (turnAroundTime.length > 0) avgTAT = avgTAT / turnAroundTime.length;

  if (waitingTime.length) avgWT = avgWT / waitingTime.length;

  var tat = document.createElement('h5');
  tat.innerText = 'Average Turn Around Time is ' + avgTAT.toFixed(2) + ' unit time';
  output.append(tat);

  var wt = document.createElement('h5');
  wt.innerText = 'Average Waiting Time is ' + avgWT.toFixed(2) + ' unit time';
  output.append(wt);
}
