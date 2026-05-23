import { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const RAW=[{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":141255,"clk":441,"conv":1,"c2c":0.0023,"rev":300,"rpm":2.12},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x600","of":"Discover - Cashback Debit (1598)","imp":86507,"clk":87,"conv":1,"c2c":0.0115,"rev":350,"rpm":4.05,"n":"Live - served mainly as backfill, can test higher in lineup"},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x600","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":55950,"clk":11,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0,"n":"Live -Have tested this past couple of months, can test higher in lineup"},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x600","of":"SoFi - Active Invest (1989)","imp":300983,"clk":684,"conv":13,"c2c":0.019,"rev":2600,"rpm":8.64,"n":"Live - Prioritzed in lineup, strong converter in this placement"},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x600","of":"Synchrony - 13 Month CD (321)","imp":105853,"clk":172,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0,"n":"Have tested but not converting, switched with HYSA offer mid month 6/2025"},{"pub":"AOL","pl":"AOL_In-Content-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":3254617,"clk":673,"conv":1,"c2c":0.0015,"rev":300,"rpm":0.09},{"pub":"AOL","pl":"AOL_In-Content-300x600","of":"Discover - Cashback Debit (1598)","imp":268,"clk":0,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"AOL","pl":"AOL_In-Content-300x600","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":2629487,"clk":146,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"AOL","pl":"AOL_In-Content-300x600","of":"Synchrony - 13 Month CD (321)","imp":893984,"clk":50,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"AOL","pl":"AOL_In-Content-300x600","of":"Synchrony - HYSA (1999)","imp":1337625,"clk":55,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankBonus","pl":"BankBonus_Text-Ad","of":"Synchrony - 13 Month CD (321)","imp":0,"clk":441,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0,"n":"Live - Only Text-Ad"},{"pub":"BankCheckingSavings","pl":"BankCheckingSavings_In-Content","of":"Discover - Cashback Debit (1598)","imp":20468,"clk":0,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankCheckingSavings","pl":"BankCheckingSavings_In-Content","of":"SoFi - Active Invest (1989)","imp":517,"clk":1,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankCheckingSavings","pl":"BankCheckingSavings_In-Content","of":"Synchrony - 13 Month CD (321)","imp":600999,"clk":42,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankCheckingSavings","pl":"BankCheckingSavings_In-Content","of":"Synchrony - HYSA (1999)","imp":665,"clk":1,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankDealGuy","pl":"BankDealGuy_In-Content","of":"Discover - Cashback Debit (1598)","imp":949913,"clk":4,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankDealGuy","pl":"BankDealGuy_In-Content","of":"SoFi - Active Invest (1989)","imp":755,"clk":1,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"BankDealGuy","pl":"BankDealGuy_In-Content","of":"Synchrony - 13 Month CD (321)","imp":799374,"clk":50,"conv":1,"c2c":0.02,"rev":400,"rpm":0.5},{"pub":"BankDealGuy","pl":"BankDealGuy_In-Content","of":"Synchrony - HYSA (1999)","imp":2144,"clk":0,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x250","of":"Axos Bank - AXOS ONE (1908)","imp":37214,"clk":19,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x250","of":"Discover - Cashback Debit (1598)","imp":63045,"clk":15,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x250","of":"SoFi - Active Invest (1989)","imp":214259,"clk":155,"conv":1,"c2c":0.0065,"rev":250,"rpm":1.17},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x250","of":"Synchrony - 13 Month CD (321)","imp":9941,"clk":5,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_CAU-Sidebar-300x250","of":"Synchrony - HYSA (1999)","imp":70835,"clk":35,"conv":1,"c2c":0.0286,"rev":400,"rpm":5.65},{"pub":"Benzinga","pl":"Benzinga_In-Content-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":2676324,"clk":2299,"conv":11,"c2c":0.0048,"rev":3300,"rpm":1.23},{"pub":"Benzinga","pl":"Benzinga_In-Content-300x600","of":"Discover - Cashback Debit (1598)","imp":2649515,"clk":733,"conv":1,"c2c":0.0014,"rev":350,"rpm":0.13},{"pub":"Benzinga","pl":"Benzinga_In-Content-300x600","of":"SoFi - Active Invest (1989)","imp":3706227,"clk":1867,"conv":11,"c2c":0.0059,"rev":5900,"rpm":1.59},{"pub":"Benzinga","pl":"Benzinga_In-Content-300x600","of":"Synchrony - 13 Month CD (321)","imp":2063313,"clk":763,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_In-Content-300x600","of":"Synchrony - HYSA (1999)","imp":1,"clk":0,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"Axos Bank - AXOS ONE (1908)","imp":154295,"clk":1045,"conv":8,"c2c":0.0077,"rev":2400,"rpm":15.55},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"Discover - Cashback Debit (1598)","imp":42446,"clk":389,"conv":4,"c2c":0.0103,"rev":1400,"rpm":32.98},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":118509,"clk":60,"conv":1,"c2c":0.0167,"rev":350,"rpm":2.95},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"SoFi - Active Invest (1989)","imp":146900,"clk":3548,"conv":18,"c2c":0.0051,"rev":4500,"rpm":30.63},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"Synchrony - 13 Month CD (321)","imp":144381,"clk":904,"conv":6,"c2c":0.0066,"rev":2400,"rpm":16.62},{"pub":"Benzinga","pl":"Benzinga_Marketplace_CAU","of":"Synchrony - HYSA (1999)","imp":100853,"clk":380,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_ATF-CAU","of":"Synchrony - 13 Month CD (321)","imp":6120,"clk":96,"conv":1,"c2c":0.0104,"rev":400,"rpm":65.36},{"pub":"Business-Insider","pl":"Business-Insider_ATF-CAU","of":"Synchrony - HYSA (1999)","imp":7013,"clk":71,"conv":5,"c2c":0.0704,"rev":1900,"rpm":270.93},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"Axos Bank - AXOS ONE (1908)","imp":427274,"clk":6398,"conv":52,"c2c":0.0081,"rev":15600,"rpm":36.51},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"Discover - Cashback Debit (1598)","imp":157038,"clk":317,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":97949,"clk":40,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"SoFi - Active Invest (1989)","imp":240426,"clk":501,"conv":3,"c2c":0.006,"rev":1260,"rpm":5.24},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"Synchrony - 13 Month CD (321)","imp":312104,"clk":1075,"conv":9,"c2c":0.0084,"rev":3550,"rpm":11.37},{"pub":"Business-Insider","pl":"Business-Insider_Below-Article","of":"Synchrony - HYSA (1999)","imp":245477,"clk":652,"conv":6,"c2c":0.0092,"rev":2400,"rpm":9.78},{"pub":"Business-Insider","pl":"Business-Insider_BI-Hosted-Splash-Page","of":"Axos Bank - AXOS ONE (1908)","imp":444286,"clk":898,"conv":2,"c2c":0.0022,"rev":600,"rpm":1.35},{"pub":"Business-Insider","pl":"Business-Insider_BI-Hosted-Splash-Page","of":"Discover - Cashback Debit (1598)","imp":478188,"clk":336,"conv":1,"c2c":0.003,"rev":350,"rpm":0.73},{"pub":"Business-Insider","pl":"Business-Insider_BI-Hosted-Splash-Page","of":"SoFi - Active Invest (1989)","imp":603975,"clk":453,"conv":1,"c2c":0.0022,"rev":394,"rpm":0.65},{"pub":"Business-Insider","pl":"Business-Insider_BI-Hosted-Splash-Page","of":"Synchrony - 13 Month CD (321)","imp":468098,"clk":540,"conv":3,"c2c":0.0056,"rev":1200,"rpm":2.56},{"pub":"Business-Insider","pl":"Business-Insider_BI-Hosted-Splash-Page","of":"Synchrony - HYSA (1999)","imp":713145,"clk":988,"conv":5,"c2c":0.0051,"rev":1950,"rpm":2.73},{"pub":"Business-Insider","pl":"Business-Insider_Geo-Text-Ad","of":"Axos Bank - AXOS ONE (1908)","imp":0,"clk":2136,"conv":43,"c2c":0.0201,"rev":12900,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Text-Ad","of":"Axos Bank - AXOS ONE (1908)","imp":0,"clk":3079,"conv":56,"c2c":0.0182,"rev":16800,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Text-Ad","of":"Discover - Cashback Debit (1598)","imp":0,"clk":888,"conv":44,"c2c":0.0495,"rev":15400,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Text-Ad","of":"Synchrony - 13 Month CD (321)","imp":0,"clk":1105,"conv":7,"c2c":0.0063,"rev":2800,"rpm":0.0},{"pub":"Business-Insider","pl":"Business-Insider_Text-Ad","of":"Synchrony - HYSA (1999)","imp":0,"clk":173,"conv":1,"c2c":0.0058,"rev":400,"rpm":0.0},{"pub":"CBS-MoneyWatch","pl":"CBS-MoneyWatch_CD_Marketplace_CAU","of":"Axos Bank - AXOS ONE (1908)","imp":896,"clk":44,"conv":0,"c2c":0.0,"rev":0,"rpm":0.0},{"pub":"CBS-MoneyWatch","pl":"CBS-MoneyWatch_Multi-Row-CAU","of":"Axos Bank - AXOS ONE (1908)","imp":168095,"clk":1254,"conv":1,"c2c":0.0008,"rev":300,"rpm":1.78},{"pub":"CBS-MoneyWatch","pl":"CBS-MoneyWatch_Multi-Row-CAU","of":"Synchrony - 13 Month CD (321)","imp":76102,"clk":320,"conv":3,"c2c":0.0094,"rev":1200,"rpm":15.77},{"pub":"CNN","pl":"CNN_Article-Elevate-Core_300x250","of":"Synchrony - 13 Month CD (321)","imp":4769545,"clk":3706,"conv":2,"c2c":0.0005,"rev":800,"rpm":0.17},{"pub":"CNN","pl":"CNN_Article-Elevate-Core_300x600","of":"SoFi - Active Invest (1989)","imp":215396,"clk":36,"conv":1,"c2c":0.0278,"rev":250,"rpm":1.16},{"pub":"CNN","pl":"CNN_Article-Elevate-Core_970x250","of":"Axos Bank - AXOS ONE (1908)","imp":997848,"clk":782,"conv":2,"c2c":0.0026,"rev":600,"rpm":0.6},{"pub":"CNN","pl":"CNN_Below-Article-HP","of":"Axos Bank - AXOS ONE (1908)","imp":59119029,"clk":2310,"conv":12,"c2c":0.0052,"rev":3600,"rpm":0.06},{"pub":"CNN","pl":"CNN_Below-Article-HP","of":"Synchrony - 13 Month CD (321)","imp":34695869,"clk":492,"conv":1,"c2c":0.002,"rev":400,"rpm":0.01},{"pub":"CNN","pl":"CNN_Business-HP-CAU-Rev-Share","of":"Axos Bank - AXOS ONE (1908)","imp":6928979,"clk":234,"conv":2,"c2c":0.0085,"rev":600,"rpm":0.09},{"pub":"CNN","pl":"CNN_Business-Right-Rail","of":"Axos Bank - AXOS ONE (1908)","imp":5867772,"clk":345,"conv":1,"c2c":0.0029,"rev":300,"rpm":0.05},{"pub":"CNN","pl":"CNN_Front-Partner-Bin","of":"Axos Bank - AXOS ONE (1908)","imp":3769315,"clk":555,"conv":3,"c2c":0.0054,"rev":900,"rpm":0.24},{"pub":"CNN","pl":"CNN_In-Content","of":"Synchrony - 13 Month CD (321)","imp":70428,"clk":170,"conv":2,"c2c":0.0118,"rev":800,"rpm":11.36},{"pub":"CNN","pl":"CNN_In-Content-Right-Rail","of":"Axos Bank - AXOS ONE (1908)","imp":31729990,"clk":2007,"conv":6,"c2c":0.003,"rev":1800,"rpm":0.06},{"pub":"CNN","pl":"CNN_In-Content-Right-Rail","of":"Synchrony - 13 Month CD (321)","imp":29407337,"clk":1091,"conv":3,"c2c":0.0027,"rev":1200,"rpm":0.04},{"pub":"CNN","pl":"CNN_In-Content-Right-Rail","of":"Synchrony - HYSA (1999)","imp":13028146,"clk":434,"conv":1,"c2c":0.0023,"rev":400,"rpm":0.03},{"pub":"CNN","pl":"CNN_Markets-CAU","of":"Axos Bank - AXOS ONE (1908)","imp":8131905,"clk":1135,"conv":4,"c2c":0.0035,"rev":1200,"rpm":0.15},{"pub":"CNN","pl":"CNN_Mobile-Web-Partner-Bin","of":"Axos Bank - AXOS ONE (1908)","imp":49105522,"clk":15856,"conv":27,"c2c":0.0017,"rev":8100,"rpm":0.16},{"pub":"CNN","pl":"CNN_Mobile-Web-Partner-Bin","of":"SoFi - Active Invest (1989)","imp":14213963,"clk":1894,"conv":1,"c2c":0.0005,"rev":256,"rpm":0.02},{"pub":"CNN","pl":"CNN_Mobile-Web-Partner-Bin","of":"Synchrony - 13 Month CD (321)","imp":52659182,"clk":11009,"conv":6,"c2c":0.0005,"rev":2400,"rpm":0.05},{"pub":"Dianomi","pl":"Dianomi_CNN-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":21594451,"clk":4101,"conv":21,"c2c":0.0051,"rev":6300,"rpm":0.29},{"pub":"Dianomi","pl":"Dianomi_CNN-300x600","of":"Synchrony - 13 Month CD (321)","imp":12114908,"clk":998,"conv":3,"c2c":0.003,"rev":1150,"rpm":0.09},{"pub":"Dianomi","pl":"Dianomi_CNN-300x600","of":"Synchrony - HYSA (1999)","imp":10601926,"clk":675,"conv":1,"c2c":0.0015,"rev":400,"rpm":0.04},{"pub":"Dianomi","pl":"Dianomi_Kiplinger-300x250","of":"Axos Bank - AXOS ONE (1908)","imp":369641,"clk":96,"conv":1,"c2c":0.0104,"rev":300,"rpm":0.81},{"pub":"Dianomi","pl":"Dianomi_Reuters-300x250","of":"Axos Bank - AXOS ONE (1908)","imp":1331012,"clk":274,"conv":1,"c2c":0.0036,"rev":300,"rpm":0.23},{"pub":"Dianomi","pl":"Dianomi_CAU-300x250","of":"Synchrony - 13 Month CD (321)","imp":2180247,"clk":155,"conv":1,"c2c":0.0065,"rev":400,"rpm":0.18},{"pub":"Facebook","pl":"Facebook_Marketplace-2","of":"Axos Bank - AXOS ONE (1908)","imp":8843,"clk":1192,"conv":5,"c2c":0.0042,"rev":1500,"rpm":169.63},{"pub":"Facebook","pl":"Facebook_Marketplace-CAU","of":"Axos Bank - AXOS ONE (1908)","imp":43158,"clk":4665,"conv":30,"c2c":0.0064,"rev":9000,"rpm":208.54},{"pub":"Facebook","pl":"Facebook_Marketplace-CAU","of":"Discover - Cashback Debit (1598)","imp":78519,"clk":1244,"conv":2,"c2c":0.0016,"rev":700,"rpm":8.92},{"pub":"Facebook","pl":"Facebook_Marketplace-CAU","of":"SoFi - Active Invest (1989)","imp":86976,"clk":871,"conv":2,"c2c":0.0023,"rev":1286,"rpm":14.79},{"pub":"Facebook","pl":"Facebook_Marketplace-CAU","of":"Synchrony - 13 Month CD (321)","imp":84704,"clk":1505,"conv":2,"c2c":0.0013,"rev":700,"rpm":8.26},{"pub":"Facebook","pl":"Facebook_Marketplace-CAU","of":"Synchrony - HYSA (1999)","imp":85744,"clk":1556,"conv":4,"c2c":0.0026,"rev":1550,"rpm":18.08},{"pub":"Fortune","pl":"Fortune_ROS-Mobile-300x250","of":"Discover - Cashback Debit (1598)","imp":1513793,"clk":406,"conv":1,"c2c":0.0025,"rev":350,"rpm":0.23},{"pub":"Fortune","pl":"Fortune_ROS-Mobile-300x250","of":"Synchrony - HYSA (1999)","imp":1670452,"clk":731,"conv":1,"c2c":0.0014,"rev":400,"rpm":0.24},{"pub":"HustlerMoneyBlog","pl":"HustlerMoneyBlog_In-Content","of":"Synchrony - 13 Month CD (321)","imp":769789,"clk":73,"conv":1,"c2c":0.0137,"rev":400,"rpm":0.52},{"pub":"Markets-Insider","pl":"Markets-Insider_Below-Article","of":"SoFi - Active Invest (1989)","imp":136598,"clk":81,"conv":5,"c2c":0.0617,"rev":1322,"rpm":9.68},{"pub":"Markets-Insider","pl":"Markets-Insider_Data-Page-CAU","of":"Axos Bank - AXOS ONE (1908)","imp":4587986,"clk":641,"conv":1,"c2c":0.0016,"rev":300,"rpm":0.07},{"pub":"Markets-Insider","pl":"Markets-Insider_Data-Page-CAU","of":"Synchrony - HYSA (1999)","imp":5490907,"clk":319,"conv":2,"c2c":0.0063,"rev":800,"rpm":0.15},{"pub":"MarketWatch","pl":"MarketWatch_Below-Article","of":"Axos Bank - AXOS ONE (1908)","imp":16850284,"clk":3454,"conv":14,"c2c":0.0041,"rev":4200,"rpm":0.25},{"pub":"MarketWatch","pl":"MarketWatch_Below-Article","of":"Discover - Cashback Debit (1598)","imp":3628367,"clk":313,"conv":1,"c2c":0.0032,"rev":350,"rpm":0.1},{"pub":"MarketWatch","pl":"MarketWatch_Below-Article","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":5720156,"clk":114,"conv":1,"c2c":0.0088,"rev":350,"rpm":0.06},{"pub":"MarketWatch","pl":"MarketWatch_Below-Article","of":"SoFi - Active Invest (1989)","imp":27958729,"clk":3392,"conv":31,"c2c":0.0091,"rev":8774,"rpm":0.31},{"pub":"MarketWatch","pl":"MarketWatch_Below-Article","of":"Synchrony - 13 Month CD (321)","imp":21342204,"clk":3185,"conv":6,"c2c":0.0019,"rev":2300,"rpm":0.11},{"pub":"MyPoints","pl":"MyPoints_Marketplace-CAU","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":588,"clk":45,"conv":1,"c2c":0.0222,"rev":350,"rpm":595.24},{"pub":"MyPoints","pl":"MyPoints_Marketplace-CAU","of":"Synchrony - 13 Month CD (321)","imp":5077,"clk":558,"conv":16,"c2c":0.0287,"rev":6400,"rpm":1260.59},{"pub":"MyPoints","pl":"MyPoints_Marketplace-CAU","of":"Synchrony - HYSA (1999)","imp":4991,"clk":587,"conv":15,"c2c":0.0256,"rev":6000,"rpm":1202.16},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Login-CAU","of":"Axos Bank - AXOS ONE (1908)","imp":7090610,"clk":2027,"conv":8,"c2c":0.0039,"rev":2400,"rpm":0.34},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Login-CAU","of":"Synchrony - HYSA (1999)","imp":3163448,"clk":483,"conv":1,"c2c":0.0021,"rev":400,"rpm":0.13},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Open-Folder","of":"Axos Bank - AXOS ONE (1908)","imp":2007560,"clk":1141,"conv":6,"c2c":0.0053,"rev":1800,"rpm":0.9},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Sent-Folder","of":"Axos Bank - AXOS ONE (1908)","imp":7221273,"clk":8155,"conv":29,"c2c":0.0036,"rev":8700,"rpm":1.2},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Sent-Folder","of":"Synchrony - 13 Month CD (321)","imp":6423853,"clk":5586,"conv":10,"c2c":0.0018,"rev":3950,"rpm":0.61},{"pub":"NAF-Digital","pl":"NAF-Digital_AOL-Sent-Folder","of":"Synchrony - HYSA (1999)","imp":4324709,"clk":3323,"conv":8,"c2c":0.0024,"rev":3200,"rpm":0.74},{"pub":"NAF-Digital","pl":"NAF-Digital_CNN-ROS-300x600","of":"Synchrony - 13 Month CD (321)","imp":10869525,"clk":595,"conv":1,"c2c":0.0017,"rev":400,"rpm":0.04},{"pub":"NAF-Digital","pl":"NAF-Digital_MSN-Money-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":19910584,"clk":2602,"conv":11,"c2c":0.0042,"rev":3300,"rpm":0.17},{"pub":"NAF-Digital","pl":"NAF-Digital_MSN-Money-300x600","of":"Synchrony - 13 Month CD (321)","imp":5718807,"clk":342,"conv":1,"c2c":0.0029,"rev":400,"rpm":0.07},{"pub":"NAF-Digital","pl":"NAF-Digital_MSN-News-300x600","of":"Synchrony - 13 Month CD (321)","imp":3287262,"clk":172,"conv":2,"c2c":0.0116,"rev":800,"rpm":0.24},{"pub":"NAF-Digital","pl":"NAF-Digital_MSN-HP-970x250","of":"Axos Bank - AXOS ONE (1908)","imp":190708,"clk":106,"conv":1,"c2c":0.0094,"rev":300,"rpm":1.57},{"pub":"NAF-Digital","pl":"NAF-Digital_USA-Today-300x600","of":"Synchrony - HYSA (1999)","imp":11152942,"clk":714,"conv":2,"c2c":0.0028,"rev":800,"rpm":0.07},{"pub":"NAF-Digital","pl":"NAF-Digital_Yahoo-Finance-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":4620807,"clk":385,"conv":3,"c2c":0.0078,"rev":900,"rpm":0.19},{"pub":"NAF-Digital","pl":"NAF-Digital_Yahoo-Webmail","of":"Axos Bank - AXOS ONE (1908)","imp":3546219,"clk":127,"conv":1,"c2c":0.0079,"rev":300,"rpm":0.08},{"pub":"NAF-Digital","pl":"NAF-Digital_Yahoo-Webmail","of":"Synchrony - 13 Month CD (321)","imp":3506046,"clk":45,"conv":1,"c2c":0.0222,"rev":400,"rpm":0.11},{"pub":"OneSmartDollar","pl":"OneSmartDollar_300x600","of":"SoFi - Active Invest (1989)","imp":10560,"clk":23,"conv":1,"c2c":0.0435,"rev":250,"rpm":23.67},{"pub":"OneSmartDollar","pl":"OneSmartDollar_Text-Ad","of":"Discover - Cashback Debit (1598)","imp":53,"clk":135,"conv":4,"c2c":0.0296,"rev":1400,"rpm":26415.09},{"pub":"ThePennyHoarder","pl":"ThePennyHoarder_Text-Ad","of":"Synchrony - 13 Month CD (321)","imp":0,"clk":514,"conv":5,"c2c":0.0097,"rev":2000,"rpm":0.0},{"pub":"Xandr","pl":"Xandr_MSN-Money-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":12936151,"clk":2186,"conv":15,"c2c":0.0069,"rev":4500,"rpm":0.35},{"pub":"Xandr","pl":"Xandr_MSN-Money-300x600","of":"Raisin - Western Alliance Bank 3M CD (2008)","imp":3349915,"clk":5,"conv":1,"c2c":0.2,"rev":350,"rpm":0.1},{"pub":"Xandr","pl":"Xandr_MSN-News-300x600","of":"Axos Bank - AXOS ONE (1908)","imp":739135,"clk":87,"conv":1,"c2c":0.0115,"rev":300,"rpm":0.41},{"pub":"Young-and-The-Invested","pl":"Young-and-The-Invested_In-Content-300x600","of":"SoFi - Active Invest (1989)","imp":738567,"clk":171,"conv":1,"c2c":0.0058,"rev":250,"rpm":0.34},{"pub":"Young-and-The-Invested","pl":"Young-and-The-Invested_In-Content-300x600","of":"Synchrony - 13 Month CD (321)","imp":750501,"clk":217,"conv":3,"c2c":0.0138,"rev":1200,"rpm":1.6}];

// Only rows with conversions > 0 for the main analysis
const DATA = RAW.filter(r => r.conv > 0);

const COLORS = ['#4F46E5','#0EA5E9','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1'];
const OFFER_COLORS = {'Axos Bank - AXOS ONE (1908)':'#4F46E5','Discover - Cashback Debit (1598)':'#0EA5E9','Raisin - Western Alliance Bank 3M CD (2008)':'#10B981','SoFi - Active Invest (1989)':'#F59E0B','Synchrony - 13 Month CD (321)':'#EF4444','Synchrony - HYSA (1999)':'#8B5CF6'};

const fmt = (n) => n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toFixed(0);
const fmtUSD = (n) => '$' + fmt(n);

function generateInsights(data) {
  const insights = [];
  // Top RPM combos
  const highRPM = [...data].filter(r => r.rpm > 0 && r.conv > 0).sort((a,b) => b.rpm - a.rpm).slice(0, 5);
  highRPM.forEach(r => {
    insights.push({type:'high_rpm', severity:'success', title:`High RPM: ${r.pl.split('_').slice(1).join('_')} × ${r.of.split(' - ')[0]}`, desc:`RPM $${r.rpm.toFixed(2)} with ${r.conv} conversions and $${fmt(r.rev)} revenue. Prioritize in lineup.`, rpm: r.rpm, data: r});
  });

  // High C2C but low impressions = scale opportunity
  const scaleOps = data.filter(r => r.c2c > 0.01 && r.imp < 200000 && r.conv > 0).sort((a,b) => b.c2c - a.c2c).slice(0, 3);
  scaleOps.forEach(r => {
    insights.push({type:'scale', severity:'info', title:`Scale opportunity: ${r.pl.split('_').slice(1).join('_')} × ${r.of.split(' - ')[0]}`, desc:`C2C ${(r.c2c*100).toFixed(2)}% on only ${fmt(r.imp)} impressions. Increase traffic to this combo.`, data: r});
  });

  // High impressions but 0 RPM = cut or deprioritize (from full RAW data)
  const waste = RAW.filter(r => r.imp > 1000000 && r.conv === 0 && r.rev === 0).sort((a,b) => b.imp - a.imp).slice(0, 3);
  waste.forEach(r => {
    insights.push({type:'waste', severity:'warning', title:`Underperformer: ${r.pl.split('_').slice(1).join('_')} × ${r.of.split(' - ')[0]}`, desc:`${fmt(r.imp)} impressions with 0 conversions and $0 revenue. Consider deprioritizing or pausing.`, data: r});
  });

  return insights;
}

function LineupChart({ data }) {
  const grouped = {};
  data.forEach(r => {
    const key = r.pl;
    if (!grouped[key]) grouped[key] = { pl: key, offers: [] };
    grouped[key].offers.push(r);
  });
  const placements = Object.values(grouped).sort((a,b) => {
    const aMax = Math.max(...a.offers.map(o => o.rpm));
    const bMax = Math.max(...b.offers.map(o => o.rpm));
    return bMax - aMax;
  }).slice(0, 12);

  const chartData = placements.map(p => {
    const row = { name: p.pl.split('_').slice(1).join('_').substring(0, 25) };
    p.offers.sort((a,b) => b.rpm - a.rpm).forEach(o => {
      const ofKey = o.of.split(' - ')[0];
      row[ofKey] = o.rpm;
    });
    return row;
  });

  const allOffers = [...new Set(data.map(r => r.of.split(' - ')[0]))];

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={chartData} layout="vertical" margin={{left: 10, right: 20, top: 5, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis type="number" tick={{fill:'#94a3b8', fontSize: 11}} label={{value:'RPM ($)', position:'insideBottom', offset: -2, fill:'#64748b', fontSize: 11}} />
        <YAxis type="category" dataKey="name" width={160} tick={{fill:'#cbd5e1', fontSize: 10}} />
        <Tooltip contentStyle={{background:'#0f172a', border:'1px solid #334155', borderRadius: 8, color:'#e2e8f0', fontSize: 12}} formatter={(v) => ['$'+v.toFixed(2), '']} />
        <Legend wrapperStyle={{fontSize: 11, color:'#94a3b8'}} />
        {allOffers.map((of, i) => (
          <Bar key={of} dataKey={of} stackId="a" fill={Object.values(OFFER_COLORS)[i % 6]} radius={i === allOffers.length-1 ? [0,4,4,0] : 0} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

function RevByPublisher({ data }) {
  const byPub = {};
  data.forEach(r => {
    byPub[r.pub] = (byPub[r.pub] || 0) + r.rev;
  });
  const chartData = Object.entries(byPub).filter(([,v]) => v > 0).sort((a,b) => b[1]-a[1]).slice(0,10).map(([k,v]) => ({name: k, value: v}));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{left:0, right:20, top:5, bottom:5}}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" tick={{fill:'#94a3b8', fontSize: 10}} angle={-35} textAnchor="end" height={70} />
        <YAxis tick={{fill:'#94a3b8', fontSize: 11}} tickFormatter={v => '$'+fmt(v)} />
        <Tooltip contentStyle={{background:'#0f172a', border:'1px solid #334155', borderRadius:8, color:'#e2e8f0', fontSize:12}} formatter={v => ['$'+v.toLocaleString(), 'Revenue']} />
        <Bar dataKey="value" radius={[4,4,0,0]}>
          {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function OfferMix({ data }) {
  const byOffer = {};
  data.forEach(r => {
    const k = r.of.split(' - ')[0];
    byOffer[k] = (byOffer[k] || 0) + r.rev;
  });
  const pieData = Object.entries(byOffer).filter(([,v]) => v > 0).map(([k,v]) => ({name: k, value: v}));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="value" label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} >
          {pieData.map((_, i) => <Cell key={i} fill={Object.values(OFFER_COLORS)[i % 6]} />)}
        </Pie>
        <Tooltip contentStyle={{background:'#0f172a', border:'1px solid #334155', borderRadius:8, color:'#e2e8f0'}} formatter={v => '$'+v.toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function CpaLineupDashboard() {
  const [pubFilter, setPubFilter] = useState('All');
  const [plFilter, setPlFilter] = useState('All');
  const [ofFilter, setOfFilter] = useState('All');
  const [sortCol, setSortCol] = useState('rpm');
  const [sortDir, setSortDir] = useState('desc');
  const [tab, setTab] = useState('dashboard');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const publishers = useMemo(() => ['All', ...new Set(RAW.map(r => r.pub))].sort(), []);
  const placements = useMemo(() => {
    const base = pubFilter === 'All' ? RAW : RAW.filter(r => r.pub === pubFilter);
    return ['All', ...new Set(base.map(r => r.pl))].sort();
  }, [pubFilter]);
  const offers = useMemo(() => ['All', ...new Set(RAW.map(r => r.of))].sort(), []);

  const filtered = useMemo(() => {
    return RAW.filter(r =>
      (pubFilter === 'All' || r.pub === pubFilter) &&
      (plFilter === 'All' || r.pl === plFilter) &&
      (ofFilter === 'All' || r.of === ofFilter)
    );
  }, [pubFilter, plFilter, ofFilter]);

  const convertingRows = useMemo(() => filtered.filter(r => r.conv > 0), [filtered]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const m = sortDir === 'desc' ? -1 : 1;
      return (a[sortCol] - b[sortCol]) * m;
    });
  }, [filtered, sortCol, sortDir]);

  const totals = useMemo(() => {
    const t = { imp: 0, clk: 0, conv: 0, rev: 0 };
    filtered.forEach(r => { t.imp += r.imp; t.clk += r.clk; t.conv += r.conv; t.rev += r.rev; });
    t.rpm = t.imp > 0 ? (t.rev / t.imp) * 1000 : 0;
    t.c2c = t.clk > 0 ? t.conv / t.clk : 0;
    return t;
  }, [filtered]);

  const insights = useMemo(() => generateInsights(convertingRows), [convertingRows]);

  const handleSort = useCallback((col) => {
    if (sortCol === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortCol(col); setSortDir('desc'); }
  }, [sortCol]);

  const askAI = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    try {
      const summaryData = convertingRows.map(r => `${r.pub}|${r.pl}|${r.of}|imp:${r.imp}|clk:${r.clk}|conv:${r.conv}|rev:$${r.rev}|rpm:$${r.rpm}|c2c:${(r.c2c*100).toFixed(2)}%`).join('\n');
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: `You are a CPA/performance marketing analyst AI. You have data on publisher placements and offers. Analyze the data and give actionable lineup recommendations. Be concise and use bullet points. Data columns: Publisher|Placement|Offer|Impressions|Clicks|Conversions|Revenue|RPM|C2C\n\nCONVERTING PLACEMENT DATA:\n${summaryData}`,
          messages: [{role:'user', content: aiQuery}]
        })
      });
      const data = await resp.json();
      const text = data.content?.map(c => c.text || '').join('\n') || 'No response';
      setAiResponse(text);
    } catch (e) {
      setAiResponse('Error connecting to AI: ' + e.message);
    }
    setAiLoading(false);
  };

  const sevColor = {success:'#10B981', info:'#0EA5E9', warning:'#F59E0B'};
  const sevBg = {success:'rgba(16,185,129,0.08)', info:'rgba(14,165,233,0.08)', warning:'rgba(245,158,11,0.08)'};

  return (
    <div style={{minHeight:'100vh', background:'#020617', color:'#e2e8f0', fontFamily:'"DM Sans", system-ui, sans-serif'}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        select, input { font-family: inherit; }
      `}</style>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', borderBottom:'1px solid #1e293b', padding:'20px 28px'}}>
        <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:8}}>
          <div style={{width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,#4F46E5,#7C3AED)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>⚡</div>
          <div>
            <h1 style={{fontSize:22, fontWeight:700, color:'#f1f5f9', letterSpacing:'-0.02em'}}>CPA Lineup Intelligence Agent</h1>
            <p style={{fontSize:12, color:'#64748b', marginTop:2}}>AI-powered publisher & offer performance analysis • 3-Month Historicals</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap:4, marginTop:16, background:'#0f172a', borderRadius:8, padding:3, width:'fit-content'}}>
          {['dashboard','lineup','ask_ai'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{padding:'7px 18px', borderRadius:6, border:'none', cursor:'pointer', fontSize:13, fontWeight:500, fontFamily:'inherit',
              background: tab === t ? '#4F46E5' : 'transparent', color: tab === t ? '#fff' : '#94a3b8', transition:'all .2s'}}>
              {t === 'dashboard' ? '📊 Dashboard' : t === 'lineup' ? '🎯 Lineup View' : '🤖 Ask AI'}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'20px 28px'}}>
        {/* Filters */}
        <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:20}}>
          <FilterSelect label="Publisher" value={pubFilter} onChange={v => {setPubFilter(v); setPlFilter('All');}} options={publishers} />
          <FilterSelect label="Placement" value={plFilter} onChange={setPlFilter} options={placements} />
          <FilterSelect label="Offer" value={ofFilter} onChange={setOfFilter} options={offers} />
          <button onClick={() => {setPubFilter('All'); setPlFilter('All'); setOfFilter('All');}} style={{alignSelf:'flex-end', padding:'8px 16px', borderRadius:6, border:'1px solid #334155', background:'#0f172a', color:'#94a3b8', cursor:'pointer', fontSize:12, fontFamily:'inherit'}}>
            ✕ Clear
          </button>
        </div>

        {tab === 'dashboard' && (
          <>
            {/* KPI Cards */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:12, marginBottom:24}}>
              <KPI label="Impressions" value={fmt(totals.imp)} icon="👁" />
              <KPI label="Clicks" value={fmt(totals.clk)} icon="🖱" />
              <KPI label="Conversions" value={totals.conv.toLocaleString()} icon="✅" />
              <KPI label="Revenue" value={fmtUSD(totals.rev)} icon="💰" />
              <KPI label="Avg RPM" value={'$'+totals.rpm.toFixed(2)} icon="📈" />
              <KPI label="Avg C2C" value={(totals.c2c*100).toFixed(2)+'%'} icon="🔄" />
            </div>

            {/* Charts Row */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24}}>
              <Card title="Revenue by Publisher (Top 10)">
                <RevByPublisher data={filtered} />
              </Card>
              <Card title="Revenue Split by Offer">
                <OfferMix data={filtered} />
              </Card>
            </div>

            {/* AI Insights */}
            <Card title="🤖 AI Lineup Suggestions" style={{marginBottom:24}}>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {insights.slice(0, 8).map((ins, i) => (
                  <div key={i} style={{padding:'12px 16px', borderRadius:8, background:sevBg[ins.severity], borderLeft:`3px solid ${sevColor[ins.severity]}`}}>
                    <div style={{fontSize:13, fontWeight:600, color:sevColor[ins.severity], marginBottom:4}}>
                      {ins.type === 'high_rpm' ? '🚀' : ins.type === 'scale' ? '📈' : '⚠️'} {ins.title}
                    </div>
                    <div style={{fontSize:12, color:'#94a3b8', lineHeight:1.5}}>{ins.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Data Table */}
            <Card title={`Performance Data (${sorted.length} rows)`}>
              <div style={{overflowX:'auto', maxHeight:450}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:12}}>
                  <thead>
                    <tr style={{position:'sticky', top:0, background:'#0f172a', zIndex:1}}>
                      {[{k:'pub',l:'Publisher'},{k:'pl',l:'Placement'},{k:'of',l:'Offer'},{k:'imp',l:'Impr'},{k:'clk',l:'Clicks'},{k:'conv',l:'Conv'},{k:'c2c',l:'C2C'},{k:'rev',l:'Rev'},{k:'rpm',l:'RPM'}].map(c => (
                        <th key={c.k} onClick={() => handleSort(c.k)} style={{padding:'10px 8px', textAlign:c.k==='pub'||c.k==='pl'||c.k==='of'?'left':'right', color:'#64748b', fontWeight:600, cursor:'pointer', borderBottom:'1px solid #1e293b', whiteSpace:'nowrap', userSelect:'none', fontSize:11}}>
                          {c.l} {sortCol === c.k ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.slice(0, 80).map((r, i) => (
                      <tr key={i} style={{borderBottom:'1px solid #0f172a', background: i%2===0?'transparent':'rgba(15,23,42,0.5)'}}>
                        <td style={{padding:'8px', color:'#cbd5e1', maxWidth:100, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r.pub}</td>
                        <td style={{padding:'8px', color:'#94a3b8', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:11}}>{r.pl.split('_').slice(1).join('_')}</td>
                        <td style={{padding:'8px', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                          <span style={{display:'inline-block', width:8, height:8, borderRadius:2, background:OFFER_COLORS[r.of]||'#666', marginRight:6, verticalAlign:'middle'}}></span>
                          <span style={{color:'#cbd5e1', fontSize:11}}>{r.of.split(' - ')[0]}</span>
                        </td>
                        <td style={{padding:'8px', textAlign:'right', color:'#94a3b8', fontFamily:'JetBrains Mono, monospace', fontSize:11}}>{fmt(r.imp)}</td>
                        <td style={{padding:'8px', textAlign:'right', color:'#94a3b8', fontFamily:'JetBrains Mono, monospace', fontSize:11}}>{fmt(r.clk)}</td>
                        <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:11, fontWeight: r.conv > 0 ? 600 : 400, color: r.conv > 0 ? '#10B981' : '#475569'}}>{r.conv}</td>
                        <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:11, color: r.c2c > 0.01 ? '#10B981' : '#94a3b8'}}>{(r.c2c*100).toFixed(2)}%</td>
                        <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:11, color: r.rev > 0 ? '#F59E0B' : '#475569'}}>${fmt(r.rev)}</td>
                        <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:11, fontWeight:600, color: r.rpm > 10 ? '#10B981' : r.rpm > 1 ? '#0EA5E9' : r.rpm > 0 ? '#94a3b8' : '#475569'}}>${r.rpm.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === 'lineup' && (
          <>
            <Card title="Traffic Lineup by RPM — Top Placements × Offers" style={{marginBottom:24}}>
              <LineupChart data={convertingRows.length > 0 ? convertingRows : DATA} />
            </Card>

            {/* Lineup recommendation table */}
            <Card title="🎯 Recommended Lineup Order (by RPM)">
              <div style={{overflowX:'auto', maxHeight: 500}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:12}}>
                  <thead>
                    <tr style={{position:'sticky', top:0, background:'#0f172a'}}>
                      <th style={thStyle}>Rank</th>
                      <th style={{...thStyle, textAlign:'left'}}>Placement</th>
                      <th style={{...thStyle, textAlign:'left'}}>Offer</th>
                      <th style={thStyle}>RPM</th>
                      <th style={thStyle}>Conv</th>
                      <th style={thStyle}>Revenue</th>
                      <th style={thStyle}>C2C</th>
                      <th style={{...thStyle, textAlign:'left'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(convertingRows.length > 0 ? convertingRows : DATA)
                      .sort((a,b) => b.rpm - a.rpm)
                      .slice(0, 30)
                      .map((r, i) => {
                        const action = r.rpm > 50 ? 'MAX PRIORITY' : r.rpm > 10 ? 'PRIORITIZE' : r.rpm > 1 ? 'MAINTAIN' : 'TEST MORE';
                        const ac = r.rpm > 50 ? '#10B981' : r.rpm > 10 ? '#0EA5E9' : r.rpm > 1 ? '#F59E0B' : '#94a3b8';
                        return (
                          <tr key={i} style={{borderBottom:'1px solid #0f172a', background: i%2===0?'transparent':'rgba(15,23,42,0.5)'}}>
                            <td style={{padding:'8px 10px', textAlign:'center', fontFamily:'JetBrains Mono', fontWeight:700, color:ac, fontSize:13}}>#{i+1}</td>
                            <td style={{padding:'8px', color:'#cbd5e1', fontSize:11}}>{r.pl.split('_').slice(1).join('_')}</td>
                            <td style={{padding:'8px'}}>
                              <span style={{display:'inline-block', width:8, height:8, borderRadius:2, background:OFFER_COLORS[r.of]||'#666', marginRight:6, verticalAlign:'middle'}}></span>
                              <span style={{color:'#cbd5e1', fontSize:11}}>{r.of.split(' - ')[0]}</span>
                            </td>
                            <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono', fontWeight:700, color:ac, fontSize:12}}>${r.rpm.toFixed(2)}</td>
                            <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono', fontSize:11, color:'#10B981'}}>{r.conv}</td>
                            <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono', fontSize:11, color:'#F59E0B'}}>${fmt(r.rev)}</td>
                            <td style={{padding:'8px', textAlign:'right', fontFamily:'JetBrains Mono', fontSize:11}}>{(r.c2c*100).toFixed(2)}%</td>
                            <td style={{padding:'8px'}}>
                              <span style={{padding:'3px 8px', borderRadius:4, background:`${ac}22`, color:ac, fontSize:10, fontWeight:600, letterSpacing:'0.03em'}}>{action}</span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === 'ask_ai' && (
          <Card title="🤖 Ask the AI Agent">
            <p style={{fontSize:13, color:'#64748b', marginBottom:16, lineHeight:1.6}}>
              Ask questions about your CPA data — which placements to prioritize, where to shift budget, which offers convert best on which publishers, and more.
            </p>
            <div style={{display:'flex', gap:8, marginBottom:16}}>
              <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAI()}
                placeholder="e.g. Which publisher should I scale for Synchrony HYSA?"
                style={{flex:1, padding:'10px 14px', borderRadius:8, border:'1px solid #334155', background:'#0f172a', color:'#e2e8f0', fontSize:13, outline:'none'}} />
              <button onClick={askAI} disabled={aiLoading} style={{padding:'10px 20px', borderRadius:8, border:'none', background: aiLoading ? '#334155' : '#4F46E5', color:'#fff', fontSize:13, fontWeight:600, cursor: aiLoading ? 'wait' : 'pointer', fontFamily:'inherit'}}>
                {aiLoading ? '⏳ Thinking...' : '🚀 Ask'}
              </button>
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:16}}>
              {['Which placements have the highest RPM for Axos Bank?','Top 5 publisher-offer combos I should prioritize?','Where should I cut spend due to low conversions?','Best offers for Business-Insider placements?'].map((q, i) => (
                <button key={i} onClick={() => {setAiQuery(q); }} style={{padding:'6px 12px', borderRadius:6, border:'1px solid #1e293b', background:'#0f172a', color:'#94a3b8', fontSize:11, cursor:'pointer', fontFamily:'inherit'}}>
                  {q}
                </button>
              ))}
            </div>
            {aiResponse && (
              <div style={{padding:20, borderRadius:10, background:'#0f172a', border:'1px solid #1e293b', whiteSpace:'pre-wrap', fontSize:13, color:'#cbd5e1', lineHeight:1.7, maxHeight:500, overflow:'auto'}}>
                {aiResponse}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

const thStyle = {padding:'10px 8px', textAlign:'right', color:'#64748b', fontWeight:600, borderBottom:'1px solid #1e293b', fontSize:11};

function KPI({ label, value, icon }) {
  return (
    <div style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:10, padding:'16px 18px'}}>
      <div style={{fontSize:12, color:'#64748b', marginBottom:6, display:'flex', alignItems:'center', gap:6}}>
        <span>{icon}</span> {label}
      </div>
      <div style={{fontSize:20, fontWeight:700, color:'#f1f5f9', fontFamily:'JetBrains Mono, monospace', letterSpacing:'-0.02em'}}>{value}</div>
    </div>
  );
}

function Card({ title, children, style }) {
  return (
    <div style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:12, padding:20, marginBottom:16, ...style}}>
      {title && <h3 style={{fontSize:15, fontWeight:600, color:'#e2e8f0', marginBottom:16, letterSpacing:'-0.01em'}}>{title}</h3>}
      {children}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:4}}>
      <label style={{fontSize:11, color:'#64748b', fontWeight:500}}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{padding:'8px 12px', borderRadius:6, border:'1px solid #334155', background:'#0f172a', color:'#e2e8f0', fontSize:12, minWidth:180, cursor:'pointer', outline:'none'}}>
        {options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label}s` : o.length > 40 ? o.substring(0,40)+'...' : o}</option>)}
      </select>
    </div>
  );
}
