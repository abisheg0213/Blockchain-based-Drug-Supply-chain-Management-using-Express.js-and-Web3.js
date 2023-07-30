const express=require('express')
const bodyparser=require('body-parser')
const Web3=require('web3');
const fs=require('fs');
const  creds  = require('./creds.json')
app=express()
app.use(bodyparser.urlencoded({ extended: false }))
app.listen(8000)

const ABI=[{'inputs': [{'internalType': 'uint256', 'name': 'p', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'a', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 't', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'r', 'type': 'uint256'}],
'name': 'add_drug',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'pid', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'a', 'type': 'uint256'}],
'name': 'add_produced_drug',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'h', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'porid', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'req_amount', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'did', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'patid', 'type': 'uint256'}],
'name': 'buy_drug',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'pid', 'type': 'uint256'}],
'name': 'drug_av',
'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
'stateMutability': 'view',
'type': 'function'},
{'inputs': [],
'name': 'income',
'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
'stateMutability': 'view',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'y', 'type': 'uint256'}],
'name': 'reg_doctor',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'y', 'type': 'uint256'}],
'name': 'reg_hos',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'y', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'hi', 'type': 'uint256'}],
'name': 'reg_patient',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'w', 'type': 'address'}],
'name': 'reg_producer',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'dm', 'type': 'address'}],
'name': 'regsiter_dm',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'hm', 'type': 'address'}],
'name': 'regsiter_hos_mag',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'pi', 'type': 'uint256'},
{'internalType': 'uint256', 'name': 'k', 'type': 'uint256'}],
'name': 'update_avail',
'outputs': [],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'j', 'type': 'uint256'}],
'name': 'valid_doctors',
'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'j', 'type': 'uint256'}],
'name': 'valid_hos',
'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
'stateMutability': 'nonpayable',
'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'j', 'type': 'uint256'}],
'name': 'valid_pait',
'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
'stateMutability': 'nonpayable',
'type': 'function'}]
const contractAddress='0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3'

async function reg_hos_man()
{
    con_instance.methods.regsiter_hos_mag('0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432').send({from:'0x327284bddEb8cfC855a5500c34c3A7c40C65D67D'})
}

async function reg_dm()
{
    con_instance.methods.regsiter_dm('0x327284bddEb8cfC855a5500c34c3A7c40C65D67D').send({from:'0x327284bddEb8cfC855a5500c34c3A7c40C65D67D'})
}

async function connect()
{
    p=new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    w3=new Web3(p);
}

let con_instance;
async function create_instance()
{
    con_instance=new w3.eth.Contract(ABI,contractAddress)
}

connect();
create_instance();
reg_hos_man();
reg_dm();
app.use('/assets', express.static('public'))
// app starts
//index.html  
app.get('',function (req,res)
{
    res.sendFile(__dirname+'/src/index.html')
})

//portals
app.get('/portals',function (req,res)
{
    res.sendFile(__dirname+'/src/portals.html')
})

//login
app.get('/login',function (req,res)
{
    res.sendFile(__dirname+'/src/login.html')
})


//contact us 
app.get('/contact',function (req,res)
{
    res.sendFile(__dirname+'/src/contact.html')
})

//masterinput
app.get('/masup',function (req,res)
{
    res.sendFile(__dirname+'/src/masterinput.html')
})
//master values 
app.post('/masup',function(req,res){
    let PrdID = Number(req.body.PrdID)
    let avilamt = Number(req.body.avilamt)
    let thres = Number(req.body.thres)
    let PripU = Number(req.body.PripU)
    add_drugs(PrdID,avilamt,thres,PripU)
    console.log("PrdID" + PrdID)
    console.log("avilamt" + avilamt)
    console.log("thres" + thres)
    console.log("PripU" +PripU )
    res.sendFile(__dirname+'/src/login.html')
})


//dealerinput 
app.get('/prdata',function (req,res)
{
    res.sendFile(__dirname+'/src/dealerinput.html')
})
//dealer values 
app.post('/prdata',function(req,res){
    let drgid = Number(req.body.drgid)
    let totdrg = Number(req.body.totdrg)
    add_proddrugs(drgid,totdrg)
    console.log("drgid" + drgid)
    console.log("totdrg" +totdrg )
    res.sendFile(__dirname+'/src/login.html')
})
async function add_drugs(p,a,t,r)
{
    const data=await con_instance.methods.add_drug(p,a,t,r).send({from:'0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432'});
}

async function add_proddrugs(p,a)
{
    const data=await con_instance.methods.add_produced_drug(p,a).send({from:'0xe02f7e8740D039165006A167F03dEDA1dbDbd361'});
}

async function add_drugs(p,a,t,r)
{
    const data=await con_instance.methods.add_drug(p,a,t,r).send({from:'0x327284bddEb8cfC855a5500c34c3A7c40C65D67D'});
}

async function regdoc(did)
{
    const data=await con_instance.methods.reg_doctor(did).send({from:'0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432'});
}

async function regpat(pid,hid)
{
    const data=await con_instance.methods.reg_patient(pid,hid).send({from:'0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432'});
}

async function reghos(hid)
{
    const data=await con_instance.methods.reg_hos(hid).send({from:'0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432'});
}

async function buydrug(h,drugid,req,docid,pat)
{
    const data=await con_instance.methods.buy_drug(h,drugid,req,docid,pat).send({from:'0x3c3777a4b34D1E586f91A640a1C2f1Bafc45c432'});
}
//drugbuy 
app.get('/drgbuy',function (req,res)
{
    res.sendFile(__dirname+'/src/drugbuy.html')
})





//drugbuy values 
app.post('/drgbuy',function(req,res){
    let hosid = Number(req.body.hosid)
    let PrdID = Number(req.body.PrdID)
    let patid = Number(req.body.patid)
    let docid = Number(req.body.docid)
    let reqamt = Number(req.body.reqamt)
    let a='Hospital id:'+hosid+'\n'+'Drug id:'+PrdID+'\n'+'Patient id:'+patid+'\n'+'Doctor id:'+docid+'\n'+'Required amount:'+'\n'+reqamt
    fs.writeFile('output.txt', a, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File written successfully!');
        }
      });
    console.log("hosid" + hosid)
    console.log("PrdID" + PrdID)
    console.log("patid" + patid)
    console.log("docid" + docid)
    console.log("reqamt" +reqamt )
    buydrug(hosid,PrdID,reqamt,docid,patid);
    res.sendFile(__dirname+'/src/login.html')
})


//hospitalinput 
app.get('/hosup',function (req,res)
{
    res.sendFile(__dirname+'/src/hospitalinput.html')
})
//drugbuy values 
app.post('/hosup',function(req,res){
    let hospid = Number(req.body.hospid)
    let patid = Number(req.body.patid)
    let docid = Number(req.body.docid)
    console.log("patid" + patid)
    console.log("docid" + docid)
    console.log("hospid" +hospid )
    regdoc(docid)
    reghos(hospid)
    regpat(patid,hospid)
    res.sendFile(__dirname+'/src/login.html')
})


//login check
app.post('/login',function(req,res){
    let name = req.body.name
    let passw = req.body.passw
    // console.log(passw ==  creds.prd)
    // console.log(creds.prd)
    if (passw ==  creds.prd){
        res.sendFile(__dirname+'/src/dealerinput.html')
    }
    else if(passw ==  creds.hos){
        res.sendFile(__dirname+'/src/hospitalinput.html')
    }
    else if(passw ==  creds.mas){
        res.sendFile(__dirname+'/src/masterinput.html')
    }
    else if(passw ==  creds.buyd){
        res.sendFile(__dirname+'/src/drugbuy.html')
    }
    else if(passw ==  creds.owner){
        res.sendFile(__dirname+'/src/index.html')
    }
    else{
        res.sendFile(__dirname+'/src/login.html')
    }
})

