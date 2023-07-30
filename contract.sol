pragma solidity ^0.8.14;
contract drugcompany
{
    struct product
    {
        uint avail;
        uint threosold;
        uint rate;
    }
    mapping (uint => product)drugs;
    address producer;
    address drugmanager;
    address hospitalmanager;
    // uint public prodid=0;
    uint orderdid=0;
    struct order
    {
        uint hospid;
        uint time;
        uint drugid;
        uint quantity;
        uint amount;
    }
    mapping (uint => order)orders;
    uint [] hospitals;
    uint public income=0;
       struct patient
   {
       uint hospid;
   }
   struct patient_log
   {
       uint patientid;
       uint docid;
       uint timestamp;
       uint drugid;
       uint amount;
   }
   event produced_drug_event(uint pid,uint a);
   event added_drug_event(uint p,uint a,uint t,uint r);
   event drug_bought_event(uint h,uint porid,uint req_amount,uint did,uint patid);
   uint [] patientarr;
   uint [] doctors;
   mapping (uint => patient) patients;
   mapping (uint => patient_log) logs;
   uint logid=1;
    modifier onlydm(address d)
    {
        require(d==drugmanager,"only drug manager is allowed");
        _;
    }
    modifier onlyhm(address d)
    {
        require(d==hospitalmanager,"only hospital manager is allowed");
        _;
    }
    function reg_producer(address w) public onlydm(msg.sender)
    {
        producer=w;
    }
    constructor(address hm)
    {
        drugmanager=msg.sender;
        hospitalmanager=hm;
    }
    struct producer_content
    {
        uint amount;
    }
    mapping (uint => producer_content) produced_drug;
    modifier onlyproducer(address j)
    {
        require(j==producer,"only producer is allowed");
        _;
    }
    function add_produced_drug(uint pid,uint a) public onlyproducer(msg.sender)
    {
        produced_drug[pid].amount=a;
        emit produced_drug_event(pid,a);
    }
    function reg_hos(uint y) public onlyhm(msg.sender)
    {
        hospitals.push(y);
    }
    function reg_patient(uint y,uint hi) public onlyhm(msg.sender)
    {
        patientarr.push(y);
        patients[y].hospid=hi;
    }
        function reg_doctor(uint y) public onlyhm(msg.sender)
    {
        doctors.push(y);
    }
    modifier validam(uint d,uint p)
    {
        require(produced_drug[p].amount==d,"not correct data is entered");
        _;
    }
    function add_drug(uint p,uint a,uint t,uint r) public onlydm(msg.sender) validam(a,p)
    {
       drugs[p].avail=a;
        drugs[p].threosold=t;
        drugs[p].rate=r;
        // prodid+=1;
        emit added_drug_event(p,a,t,r);
    }
    function update_avail(uint pi,uint k) public onlydm(msg.sender) validam(k,pi)
    {
        drugs[pi].avail+=k;
    }
    function valid_hos(uint j) private view returns(bool)
    {
        uint flag=0;
        for(uint i=0;i<hospitals.length;i++)
        {
            if(hospitals[i]==j)
            {
                flag=1;
                return true;
            }
        }
        if (flag==0)
        {
            return false;
        }
    }
        function valid_pait(uint j) private view returns(bool)
    {
        uint flag=0;
        for(uint i=0;i<patientarr.length;i++)
        {
            if(patientarr[i]==j)
            {
                flag=1;
                return true;
            }
        }
        if (flag==0)
        {
            return false;
        }
    }
        function valid_doctors(uint j) private view returns(bool)
    {
        uint flag=0;
        for(uint i=0;i<doctors.length;i++)
        {
            if(doctors[i]==j)
            {
                flag=1;
                return true;
            }
        }
        if (flag==0)
        {
            return false;
        }
    }
    modifier validhos(uint tr)
    {
        require(valid_hos(tr)==true,"it is not a valid hospital");
        _;
    }
      modifier validp(uint tr)
    {
        require(valid_pait(tr)==true,"it is not a valid paitent");
        _;
    }
      modifier validd(uint tr)
    {
        require(valid_doctors(tr)==true,"it is not a valid doctor");
        _;
    }
    modifier meetavail(uint hy,uint k)
    {
        require(hy<= drugs[k].avail,"requested amount of drug is not available");
        _;
    }
    modifier meetthros(uint k,uint hy)
    {
        require(hy< drugs[k].threosold,"requested amount is greater than the threesold");
        _;
    }
      function buy_drug (uint h,uint porid,uint req_amount,uint did,uint patid) public validhos(h) meetavail(req_amount,porid) meetthros(porid,req_amount) validp(patid) validd(did)
    {
        drugs[porid].avail-=req_amount;
        income+=(req_amount*drugs[porid].rate);
        orders[orderdid].hospid=h;
        orders[orderdid].time=block.timestamp;
        orders[orderdid].drugid=porid;
        orders[orderdid].quantity=req_amount;
        orders[orderdid].amount=req_amount*drugs[porid].rate;
        orderdid+=1;
       logs[logid].patientid=patid;
        logs[logid].docid=did;
        logs[logid].timestamp=block.timestamp;
        logs[logid].drugid=porid;
        logs[logid].amount=req_amount;
        logid+=1;
        emit drug_bought_event(h,porid,req_amount,did,patid);
    }
    function drug_av(uint pid) view public returns(uint) 
    {
        return drugs[pid].avail;
    }
}
