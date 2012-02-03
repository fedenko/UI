/**
 * @fileOverview This file is the config which be used to create a calendar
 * @author <a href="mailto:fogtower1979@gmail.com">Fog Tower</a>
 * @version 1.3
 */

Calender_Config = {
    language : "en",  //The language of calendar message.
                      //If language not be set, the message's language is 
                      //according to browser.

    css : "black",

    topPanel: [  //The top panel's layout and text, Not change id.
                {text : "<<", id : "preYear", backgroundImage : "",width:"12.5%"},
                {text : "<", id : "preMonth", backgroundImage : "",width:"12.5%"},
                {text : "", id : "thisMonth", backgroundImage : "",width:"30%"},
                {text : "", id : "thisYear", backgroundImage : "",width:"20%"},
                {text : ">", id : "nextMonth", backgroundImage : "",width:"12.5%"},
                {text : ">>", id : "nextYear", backgroundImage : "",width:"12.5%"}
     ],

    firstDayInWeek : 6,
    	
    printFormat : "YYYY-MM-DD",
    
    dates : { //The image and text of slide panel, you can break line by "\n",
              //but only the first "\n" is effective.

        ///"2009-07-01" : {
        ///    image : "img/dates/2009-07-01.jpg",
        ///    text  : "Diana Frances Spencer was borned in Sandringham England on July 1, 1961. She married to Prince Charles in July, 1981."
       /// },
       
    }
};


