
var x=false;
  function check() {
  const val1 = document.querySelector('#algo');
  const val = val1.value; // Get the selected value from the dropdown
  if(val==="Priority Scheduling" || val==="Preemptive Priority Scheduling")
  {
    x=true;
  }
  if (val === "Round Robin") 
  {
    document.getElementById('timequantum').removeAttribute('disabled');
  }
  else
  {
    document.getElementById('timequantum').disabled = true;
  }
  if(val==="Select Any Algorithm")
  {
    if(document.getElementById("add").disabled===false) 
    {
      document.getElementById("add").disabled = true;
    }
    if (document.getElementById('delete').disabled === false) {
      document.getElementById('delete').disabled = true;
    }
    if (document.getElementById('run').disabled === false) {
      document.getElementById('run').disabled = true;
    }
  }
  else
  {
    document.getElementById("add").removeAttribute('disabled');
    document.getElementById('delete').removeAttribute('disabled');
    document.getElementById('run').removeAttribute('disabled');
  }
}
function addProc() {
  var table = document.getElementById('tab');
  var pidInputValue = prompt('Enter PID:');
  var atInputValue = prompt('Enter AT:');
  var btInputValue = prompt('Enter BT:');
  var newRow = document.createElement('tr');
  newRow.classList.add('flex', 'h-6', 'text-black', 'bg-white', 'items-center', 'mt-1');
  var priority=null;
  var priority1 = document.createElement('td');
  if (x === true) 
  {
    priority = prompt('Enter the priority');
    priority1.textContent = priority;
  }
  else
  {
    priority1.textContent="-";
  }
  priority1.classList.add('w-1/3', 'border-blue-800', 'border-4', 'text-center');
  var newCellPID = document.createElement('td');
  newCellPID.textContent = pidInputValue;
  newCellPID.classList.add('w-1/3','border-blue-800', 'border-4', 'text-center');
  var newCellAT = document.createElement('td');
  newCellAT.textContent = atInputValue;
  newCellAT.classList.add('w-1/3','border-blue-800', 'border-4', 'text-center');
  var newCellBT = document.createElement('td');
  newCellBT.textContent = btInputValue;
  newCellBT.classList.add('w-1/3','border-blue-800', 'border-4', 'text-center',);
  newRow.appendChild(newCellPID);
  newRow.appendChild(newCellAT);
  newRow.appendChild(newCellBT);
  newRow.appendChild(priority1);
  table.appendChild(newRow);
}
function delete1() {
  var t1 = document.getElementById('tab');
  var rowCount = t1.rows.length;
    t1.deleteRow(rowCount - 1);
}

var n;
var pid,pri,at,bt,ct,wt,tat,dbt,ind
var ans=[];
function sortat()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  for(var i=0;i<n;i++)
  {
    for(var j=i+1;j<n;j++)
    {
      if(at[i]>at[j])
      {
        var temp=at[i];
        at[i]=at[j];
        at[j]=temp;

        temp = bt[i];
        bt[i] = bt[j];
        bt[j] = temp;

        temp = pid[i];
        pid[i] = pid[j];
        pid[j] = temp;

        temp = dbt[i];
        dbt[i] = dbt[j];
        dbt[j] = temp;
        
        temp = pri[i];
        pri[i] = pri[j];
        pri[j] = temp;
      }
    }
  }
}
function fcfs()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  for(var index=0;index<n;index++)
  {
    if(at[index]>ans.length)
    {
      var k=at[index]-ans.length;
      while(k-->0)
      {
        ans.push(-1);
      }
    }
    if(at[index]<=ans.length)
    {
      var const1=bt[index];
      while(const1-->0)
      {
        ans.push(pid[index]);
      }
    }
  }
  console.log(ans);
}
function sjf()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  var ind1=new Array(n);
  for(var index=0;index<n;index++)
  {
    ind1[index]=0;
  }
  var ind2=0;
  var c=0;
  while(c<n)
  {
    var val1=Number.MAX_SAFE_INTEGER;
    ind2=-1;
    for(var index = 0; index < n; index++) 
    {
      if(val1>=bt[index] && at[index]<=ans.length && ind1[index]===0)
      {
        val1=bt[index];
        ind2=index;
      }
    }
    if(ind2==-1)
    {
      ans.push(-1);
    }
    else
    {
      c++;
      ind1[ind2]=1;
      var c1=bt[ind2];
      while(c1-->0)
      {
        ans.push(pid[ind2]);
      }
    }
  }
  console.log(ans);
}
function srtf() {
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  var ind2 = 0;
  var c = 0;
  while (c < n) 
  {
    var val1 = Number.MAX_SAFE_INTEGER;
    ind2 = -1;
    for (var index = 0; index < n; index++) 
    {
      if (val1 >= bt[index] && at[index] <= ans.length &&bt[index]>0) 
      {
        val1 = bt[index];
        ind2 = index;
      }
    }
    if (ind2 == -1) 
    {
      ans.push(-1);
    } 
    else 
    {
      bt[ind2]--;
      ans.push(pid[ind2]);
      if(bt[ind2]==0)
      {
        c++;
      }
    }
  console.log(ans);
  }
}
function prior()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  var ind1 = new Array(n);
  for (var index = 0; index < n; index++) 
  {
    ind1[index] = 0;
  }
  var ind2 = 0;
  var c = 0;
  while (c < n)
  {
    var val1 = Number.MAX_SAFE_INTEGER;
    ind2 = -1;
    for (var index = 0; index < n; index++) 
    {
      console.log(val1 >= pri[index]);
      console.log(at[index] <= ans.length);
      console.log(ind1[index] == 0);
      console.log(pid[index]+" "+pri[index]);
      console.log(" ");
      if (val1 >= pri[index] && at[index] <= ans.length && ind1[index] == 0) 
      {
        val1 = pri[index];
        ind2 = index;
      }
    }
    console.log(" ");
    if(ind2 == -1) 
    {
      ans.push(-1);
    } 
    else 
    {
      c++;
      ind1[ind2] = 1;
      var c1 = bt[ind2];
      while (c1-- > 0) {
        ans.push(pid[ind2]);
      }
    }
  }
}
function prempprior()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  var ind2 = 0;
  var c = 0;
  while (c < n) 
  {
    var val1 = Number.MAX_SAFE_INTEGER;
    ind2 = -1;
    for (var index = 0; index < n; index++) 
    {
      if (val1 >= pri[index] && at[index] <= ans.length && bt[index] > 0) 
      {
        val1 = pri[index];
        ind2 = index;
      }
    }
    if (ind2 == -1) 
    {
      ans.push(-1);
    }
    else 
    {
      bt[ind2]--;
      ans.push(pid[ind2]);
      if (bt[ind2] == 0) 
      {
        c++;
      }
    }
    console.log(ans);
  }
}
function RR()
{
  var arr=[];
  var c=0;
  var l=0;
  arr.push(0);
  var ind1 = new Array(n);
  for (var index = 0; index < n; index++) 
  {
    ind1[index] = 0;
  }
  ind1[l] = 1;
  while(l<arr.length)
  {
    if(bt[arr[l]]<=q)
    {
      while(bt[arr[l]]-->0)
      {
        ans.push(pid[arr[l]]);
      }
      c++;
      bt[arr[l]]=0;
    }
    else
    {
      for(var index=0;index<q;index++)
      {
        ans.push(pid[arr[l]]);
      }
      bt[arr[l]]=bt[arr[l]]-q;
    }
    for(var index=0;index<n;index++)
    {
      if(at[index]<=ans.length && ind1[index]==0 && bt[index]>0)
      {
        arr.push(index);
        ind1[index]=1;
      }
    }
    if(bt[arr[l]]>0)
    {
      arr.push(arr[l]);
    }
    l++;
  }
  console.log(ans);
}
var q=0;
function getValues()
{
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  pid = new Array(n);
  pri = new Array(n);
  at = new Array(n);
  bt = new Array(n);
  ct = new Array(n);
  wt = new Array(n);
  tat = new Array(n);
  dbt = new Array(n);
  ind = new Array(n);
  q=Number(document.getElementById("timequantum").value);
  for(var i=0;i<n;i++)
  {
      ind[i]=i;
      for(var j=0;j<4;j++)
      {
         var n1 =Number(procTable.rows[i].cells[j].innerText);
        if(j===0)
        {
          pid[i]=n1;
        }
        else if(j===1)
        {
          at[i]=n1;
        }
        else if(j===2)
        {
          bt[i]=n1;
          dbt[i]=n1;
        }
        else{
          pri[i]=n1;
        }
      }
  }
  if(document.getElementById("algo").value==="First Come First Serve")
  {
    sortat();
    fcfs();
  }
  else if(document.getElementById("algo").value==="Shortest Job First")
  {
    sortat();
    sjf();
  }
  else if(document.getElementById("algo").value==="Shortest Remaining Time First")
  {
    sortat();
    srtf();
  }
  else if (document.getElementById('algo').value ==="Priority Scheduling") 
  {
    sortat();
    prior();
  }
  else if (document.getElementById('algo').value =="Preemptive Priority Scheduling") 
  {
    sortat();
    prempprior();
  }
  else{
    sortat();
    RR();
  }
  for(var index=n-1;index>=0;index--)
  {
    ct[i]=0;
  }
  for(var index=ans.length-1;index>=0;index--)
  {
    for(var index1=0;index1<n;index1++)
    {
      if(ct[index1]==0 && ans[i]==pid[index1])
      {
        ct[index1]=index+1;
      }
    }
  }
  for(var index=0;index<n;index++)
  {
    wt[index]=ct[index]-at[index]-bt[index];
    tat[index]=ct[index]-at[index];
    console.log(ct[index]);
  }
}
function display()
{
  var table = document.getElementById('tab2');
  var procTable = document.querySelector('#tab');
  n = procTable.rows.length;
  for(var i=0;i<n;i++)
  {
    // var newRow = document.createElement('tr');
    // newRow.classList.add('flex', 'h-6', 'text-black', 'bg-white', 'items-center', 'mt-1');
    // var newCellPID = document.createElement('td');
    // newCellPID.textContent = toString(pid[i]);
    // newCellPID.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var newCellAT = document.createElement('td');
    // newCellAT.textContent = toString(at[i]);
    // newCellAT.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var newCellBT = document.createElement('td');
    // newCellBT.textContent = toString(bt[i]);
    // newCellBT.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var priority1 = document.createElement('td');
    // priority1.textContent = toString(pri[i]);
    // priority1.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var ct1 = document.createElement('td');
    // ct1.textContent = toString(ct[i]);
    // ct1.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var wt1 = document.createElement('td');
    // wt1.textContent = toString(wt[i]);
    // wt1.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // var tat1 = document.createElement('td');
    // tat1.textContent = toString(tat[i]);
    // tat1.classList.add('w-1/6', 'border-blue-800', 'border-4', 'text-center');
    // newRow.appendChild(newCellPID);
    // newRow.appendChild(newCellAT);``
    // newRow.appendChild(newCellBT);
    // newRow.appendChild(priority1);
    // newRow.appendChild(ct1);
    // newRow.appendChild(wt1);
    // newRow.appendChild(tat1);
    // table.appendChild(newRow);
    // pid, pri, at, bt, ct, wt, tat, dbt, ind;
    // console.log(pid[i]);
    // console.log(at[i]);
    // console.log(bt[i]);
    // console.log(pri[i]);
    // console.log(ct[i]);
    // console.log(wt[i]);
    // console.log(tat[i]);
    // console.log(" ");
  }
}