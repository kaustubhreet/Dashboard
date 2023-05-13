import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const getUser=async (req,res)=>{
    try{
      const {id}=req.params;
      const user=await User.findById(id);
      res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err.message});
    }
};

export const getDashBoardStats=async(req,res)=>{
    try{
       //hardcorderd values beacuse this value will come from frontened from search section
       const currentMonth="November";
       const currentYear=2021;
       const currentDay="2023-01-15";

       //recent transcation
       const transactions=await Transaction.find()
       .limit(50)
       .sort({createdOn:-1});

       //overall states
       const overallStat=await OverallStat.find({year:currentYear});

       const {
        totalCustomers,
        yearlytotalSoldUnits,
        yearlysoldtotal,
        monthlyData,
        salesByCategory
       }=overallStat[0];

       const thisMonthStats=overallStat[0].monthlyData.find(({month})=>{
        return month===currentMonth;
       });
       
       const todayStats=overallStat[0].dailyData.find(({date})=>{
        return date===currentDay;
       });

       res.status(200).json({
        totalCustomers,
        yearlysoldtotal,
        yearlytotalSoldUnits,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
       });
    }catch(err){
        res.status(404).json({message:err.message});
    }
};