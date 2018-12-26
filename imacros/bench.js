
var i, name_p, name_p1, name_p2
var flag_end;
var kvo_tovar=2010, kvo_col=2;
var imagepath="D:\\5\\CAPTCHA";

 

  for (j =1; j <= kvo_tovar; j++) {
 
    	iimPlay('CODE: SET !DATASOURCE_DELIMITER ; \n CMDLINE !DATASOURCE '+imagepath+'\\bench.csv \n SET !DATASOURCE_COLUMNS '+kvo_col+' \n SET !LOOP '+j+ '\n SET !DATASOURCE_LINE {{!LOOP}} \n SET !EXTRACT NULL \n ADD !EXTRACT {{!COL1}} \n ADD !EXTRACT {{!COL2}}' );
	        name_image = iimGetLastExtract (1);
        	name_predict = iimGetLastExtract (2);
         
	iimPlay("CODE: SET !TIMEOUT_PAGE 120 \n SET !TIMEOUT_STEP 0 \n TAG POS=1 TYPE=INPUT:FILE ATTR=ID:inputfile CONTENT="+imagepath+"\\"+name_image);
        iimPlay("CODE: WAIT SECONDS=5");  

        flag_end=true;
	for (i=0;i<5;i++) {
       	  iimPlayCode('SET !TIMEOUT_STEP 0 \n TAG POS=1 TYPE=DIV ATTR=ID:predictprocess  EXTRACT=TXT'); 
          name_p=iimGetLastExtract ().replace(/[\n\r]/g, '').trim();
          if (name_p=='Распознавание завершено') {flag_end=false; break;}         	
	}	
        if (flag_end) {break;}

      	iimPlayCode('SET !TIMEOUT_STEP 0 \n TAG POS=1 TYPE=DIV ATTR=ID:pr  EXTRACT=HTM'); 
        name_p=iimGetLastExtract ().replace(/[\n\r]/g, '').replace(/<br.*?>/g, ';').replace(/.*\:/, '').replace(/<.*?>/g, '').replace(/^;/,'').trim();

      	iimPlayCode('SET !TIMEOUT_STEP 0 \n TAG POS=1 TYPE=DIV ATTR=ID:variants  EXTRACT=HTM'); 
        name_p2=iimGetLastExtract ().replace(/[\n\r]/g, '').replace(/<br.*?>/g, ';').replace(/.*\:/, '').replace(/<.*?>/g, '').replace(/^;/,'').trim();

      	iimPlayCode('SET !TIMEOUT_STEP 0 \n TAG POS=1 TYPE=DIV ATTR=ID:levenstain  EXTRACT=HTM'); 
        name_p3=iimGetLastExtract ().replace(/[\n\r]/g, '').replace(/<br.*?>/g, ';').replace(/.*\:/, '').replace(/<.*?>/g, '').replace(/^;/,'').trim();
            
       
        iimSet("TXT_ID", name_image); 
        iimSet("TXT_PREDICT", name_predict); 
        iimSet("TXT_P1", name_p);                         
        iimSet("TXT_P2", name_p2);                         
        iimSet("TXT_P3", name_p3);                                 
        iimPlay("CODE: SET !DATASOURCE_DELIMITER ; \n SET !EXTRACT NULL \n   ADD !EXTRACT {{TXT_ID}} \n ADD !EXTRACT {{TXT_PREDICT}} \n  ADD !EXTRACT {{TXT_P1}} \n ADD !EXTRACT {{TXT_P2}} \n ADD !EXTRACT {{TXT_P3}} \n  SAVEAS TYPE=EXTRACT FOLDER="+imagepath+" FILE=bench_predict.csv");
        name_p="";          
        name_p2="";          
        name_p3="";          
              
 }
         
    
   

